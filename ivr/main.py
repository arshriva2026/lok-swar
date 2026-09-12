"""
Lok Swar — IVR Customer Care System
======================================
FastAPI + Motor (async MongoDB) IVR webhook engine.
TwiML-compatible with Twilio, Exotel, and Knowlarity.

Run:  uvicorn ivr.main:app --reload --port 8001
      (from the project root: c:/Hackathon/ARSHRIVA/)
"""

from __future__ import annotations

import os
import re
import base64
import httpx
from datetime import datetime, timezone
from typing import Annotated, Optional
from pathlib import Path

from fastapi import Depends, FastAPI, Form, HTTPException, Request, Query
from fastapi.responses import HTMLResponse, JSONResponse, Response
from fastapi.templating import Jinja2Templates
from motor.motor_asyncio import AsyncIOMotorCollection
from bson import ObjectId

from ivr.db import get_db, ping_db
from ivr.models import (
    IVRTicket,
    NotesUpdate,
    StatusUpdate,
    LANGUAGE_LABELS,
    CATEGORY_LABELS,
    STATUS_LABELS,
    PROMPTS,
)

# ---------------------------------------------------------------------------
# App bootstrap
# ---------------------------------------------------------------------------
app = FastAPI(
    title="Lok Swar IVR",
    description="Zero-cost IVR Customer Care — TwiML Webhook Engine",
    version="1.0.0",
)

_templates_dir = Path(__file__).parent / "templates"
templates = Jinja2Templates(directory=str(_templates_dir))

# Twilio credentials from env (used for proxying audio)
TWILIO_ACCOUNT_SID: str = os.getenv("TWILIO_ACCOUNT_SID", "")
TWILIO_AUTH_TOKEN: str = os.getenv("TWILIO_AUTH_TOKEN", "")

# ---------------------------------------------------------------------------
# Helpers
# ---------------------------------------------------------------------------

def xml_response(body: str) -> Response:
    """Return a TwiML XML response."""
    return Response(
        content=f'<?xml version="1.0" encoding="UTF-8"?>\n<Response>\n{body}\n</Response>',
        media_type="application/xml",
    )


def twiml_say(text: str, language: str = "en") -> str:
    """Build a <Say> TwiML verb with the correct language/voice."""
    lang_map = {
        "hi": ("hi-IN", "Polly.Aditi"),
        "te": ("te-IN", "Polly.Aditi"),      # Telugu fallback to Aditi
        "en": ("en-IN", "Polly.Raveena"),
    }
    twiml_lang, voice = lang_map.get(language, ("en-IN", "Polly.Raveena"))
    # Escape XML special chars
    safe = text.replace("&", "&amp;").replace("<", "&lt;").replace(">", "&gt;")
    return f'<Say language="{twiml_lang}" voice="{voice}">{safe}</Say>'


def twiml_gather(action: str, num_digits: int = 1, timeout: int = 5, body: str = "") -> str:
    """Build a <Gather> TwiML verb wrapping optional <Say> children."""
    return (
        f'<Gather action="{action}" method="POST" numDigits="{num_digits}" '
        f'timeout="{timeout}">\n  {body}\n</Gather>'
    )


def ticket_to_dict(doc: dict) -> dict:
    """Serialize MongoDB document for JSON API responses."""
    doc["id"] = str(doc.pop("_id", ""))
    doc["created_at"] = doc.get("created_at", datetime.utcnow()).isoformat()
    doc["updated_at"] = doc.get("updated_at", datetime.utcnow()).isoformat()
    return doc


# ---------------------------------------------------------------------------
# Startup / Shutdown
# ---------------------------------------------------------------------------

@app.on_event("startup")
async def _startup():
    ok = await ping_db()
    if ok:
        print("[IVR] MongoDB Atlas connected.")
    else:
        print("[IVR] WARNING: MongoDB unavailable -- tickets will fail to save.")


# ---------------------------------------------------------------------------
# Health
# ---------------------------------------------------------------------------

@app.get("/health")
async def health():
    db_ok = await ping_db()
    return {"status": "ok", "mongodb": db_ok}


# ---------------------------------------------------------------------------
# IVR Webhook — Step 1: Language Selection
# ---------------------------------------------------------------------------

@app.api_route("/ivr/welcome", methods=["GET", "POST"])
async def ivr_welcome():
    """
    Entry-point webhook. Twilio/Exotel calls this when the phone is answered.
    Returns TwiML that plays a trilingual greeting and gathers 1 DTMF digit.
    """
    # Build a combined welcome message
    welcome_text = (
        PROMPTS["welcome"]["en"] + " ... " +
        PROMPTS["welcome"]["hi"] + " ... " +
        PROMPTS["welcome"]["te"]
    )
    say_block = twiml_say(welcome_text, "en")
    gather = twiml_gather(
        action="/ivr/category",
        num_digits=1,
        timeout=7,
        body=say_block,
    )
    # Fallback if caller doesn't press anything
    fallback_say = twiml_say(PROMPTS["welcome"]["en"], "en")
    fallback_gather = twiml_gather(
        action="/ivr/category",
        num_digits=1,
        timeout=5,
        body=fallback_say,
    )
    return xml_response(f"{gather}\n{fallback_gather}")


# ---------------------------------------------------------------------------
# IVR Webhook — Step 2: Category Selection
# ---------------------------------------------------------------------------

@app.api_route("/ivr/category", methods=["GET", "POST"])
async def ivr_category(
    Digits: Optional[str] = Form(default=None),
    digit: Optional[str] = Query(default=None),   # GET fallback
):
    """
    Receives language digit (1=hi, 2=te, 3=en).
    Returns category menu TwiML.
    """
    pressed = Digits or digit or ""
    lang_map = {"1": "hi", "2": "te", "3": "en"}
    lang = lang_map.get(pressed.strip(), "en")

    category_prompt_key = f"category_{lang}"
    prompt_text = PROMPTS.get(category_prompt_key, PROMPTS["category_en"])

    say_block = twiml_say(prompt_text, lang)
    gather = twiml_gather(
        action=f"/ivr/record-prompt?lang={lang}",
        num_digits=1,
        timeout=7,
        body=say_block,
    )
    # Fallback
    fallback_say = twiml_say(PROMPTS["invalid"][lang], lang)
    fallback_gather = twiml_gather(
        action=f"/ivr/record-prompt?lang={lang}",
        num_digits=1,
        timeout=5,
        body=fallback_say,
    )
    return xml_response(f"{gather}\n{fallback_gather}")


# ---------------------------------------------------------------------------
# IVR Webhook — Step 3: Recording Prompt
# ---------------------------------------------------------------------------

@app.api_route("/ivr/record-prompt", methods=["GET", "POST"])
async def ivr_record_prompt(
    lang: str = Query(default="en"),
    Digits: Optional[str] = Form(default=None),
    digit: Optional[str] = Query(default=None),
):
    """
    Receives category digit (1=electricity, 2=water, 3=other).
    Returns TwiML that plays recording prompt and starts <Record>.
    """
    pressed = Digits or digit or ""
    cat_map = {"1": "electricity", "2": "water", "3": "other"}
    cat = cat_map.get(pressed.strip(), "other")

    record_prompt_key = f"record_{lang}"
    prompt_text = PROMPTS.get(record_prompt_key, PROMPTS["record_en"])

    say_block = twiml_say(prompt_text, lang)
    # <Record> verb — maxLength=120s, finish on #, action → save-recording
    record = (
        f'<Record action="/ivr/save-recording?lang={lang}&amp;cat={cat}" '
        f'method="POST" maxLength="120" finishOnKey="#" '
        f'playBeep="true" trim="trim-silence"/>'
    )
    return xml_response(f"{say_block}\n{record}")


# ---------------------------------------------------------------------------
# IVR Webhook — Step 4: Save Recording & Confirm
# ---------------------------------------------------------------------------

@app.api_route("/ivr/save-recording", methods=["GET", "POST"])
async def ivr_save_recording(
    request: Request,
    lang: str = Query(default="en"),
    cat: str = Query(default="other"),
    collection: AsyncIOMotorCollection = Depends(get_db),
):
    """
    Receives Twilio/Exotel recording callback.
    Saves ticket to MongoDB and plays thank-you message.
    """
    # Accept both form-encoded (Twilio POST) and query-params (GET testing)
    form_data: dict = {}
    try:
        form_data = dict(await request.form())
    except Exception:
        pass
    params = dict(request.query_params)

    def _get(key: str, default: str = "") -> str:
        return str(form_data.get(key) or params.get(key) or default)

    call_sid       = _get("CallSid")
    caller_phone   = _get("From", _get("Caller", "unknown"))
    recording_url  = _get("RecordingUrl")
    recording_sid  = _get("RecordingSid")
    duration_raw   = _get("RecordingDuration", "0")

    # Sanitize
    try:
        duration = int(float(duration_raw))
    except ValueError:
        duration = 0

    # Validate lang + cat
    if lang not in ("hi", "te", "en"):
        lang = "en"
    if cat not in ("electricity", "water", "other"):
        cat = "other"

    now = datetime.now(timezone.utc)
    ticket = {
        "call_sid": call_sid,
        "caller_phone": caller_phone,
        "language": lang,
        "category": cat,
        "recording_url": recording_url,
        "recording_sid": recording_sid,
        "duration": duration,
        "status": "new",
        "admin_notes": "",
        "created_at": now,
        "updated_at": now,
    }

    try:
        result = await collection.insert_one(ticket)
        ticket_id = str(result.inserted_id)
    except Exception as exc:
        # Don't fail the call — just log and respond
        print(f"[IVR] DB insert error: {exc}")
        ticket_id = "UNKNOWN"

    thanks_key = f"thanks_{lang}"
    thanks_text = PROMPTS.get(thanks_key, PROMPTS["thanks_en"])
    say_block = twiml_say(thanks_text, lang)
    return xml_response(f"{say_block}\n<Hangup/>")


# ---------------------------------------------------------------------------
# Audio Proxy — streams Twilio recordings with auth header
# ---------------------------------------------------------------------------

@app.get("/ivr/audio/{recording_sid}")
async def proxy_audio(recording_sid: str):
    """
    Proxies Twilio recording audio with HTTP Basic Auth so the admin
    dashboard's <audio> tag can play it without CORS / auth issues.
    """
    if not TWILIO_ACCOUNT_SID or not TWILIO_AUTH_TOKEN:
        raise HTTPException(status_code=503, detail="Twilio credentials not configured")

    url = f"https://api.twilio.com/2010-04-01/Accounts/{TWILIO_ACCOUNT_SID}/Recordings/{recording_sid}.mp3"
    auth = base64.b64encode(
        f"{TWILIO_ACCOUNT_SID}:{TWILIO_AUTH_TOKEN}".encode()
    ).decode()

    try:
        async with httpx.AsyncClient(timeout=20) as client:
            resp = await client.get(url, headers={"Authorization": f"Basic {auth}"})
        if resp.status_code == 200:
            return Response(
                content=resp.content,
                media_type="audio/mpeg",
                headers={"Cache-Control": "max-age=3600"},
            )
        raise HTTPException(status_code=resp.status_code, detail="Audio fetch failed")
    except httpx.RequestError as exc:
        raise HTTPException(status_code=502, detail=str(exc))


# ---------------------------------------------------------------------------
# Test endpoint — insert a mock ticket (for local demo without real calls)
# ---------------------------------------------------------------------------

@app.post("/ivr/test/create-mock")
async def create_mock_ticket(
    collection: AsyncIOMotorCollection = Depends(get_db),
):
    """
    Inserts a dummy IVR ticket so the admin dashboard is populated
    even when no real phone calls have been made yet.
    """
    now = datetime.now(timezone.utc)
    mock = {
        "call_sid": f"CA_MOCK_{int(now.timestamp())}",
        "caller_phone": "+919876543210",
        "language": "hi",
        "category": "electricity",
        "recording_url": "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
        "recording_sid": "RE_MOCK",
        "duration": 37,
        "status": "new",
        "admin_notes": "",
        "created_at": now,
        "updated_at": now,
    }
    result = await collection.insert_one(mock)
    return {"inserted_id": str(result.inserted_id), "message": "Mock ticket created"}


# ---------------------------------------------------------------------------
# Admin REST API
# ---------------------------------------------------------------------------

@app.get("/admin/tickets")
async def list_tickets(
    status: Optional[str] = Query(default=None),
    category: Optional[str] = Query(default=None),
    lang: Optional[str] = Query(default=None),
    skip: int = Query(default=0, ge=0),
    limit: int = Query(default=50, ge=1, le=200),
    collection: AsyncIOMotorCollection = Depends(get_db),
):
    """Return paginated tickets as JSON."""
    query: dict = {}
    if status and status in ("new", "in_progress", "resolved"):
        query["status"] = status
    if category and category in ("electricity", "water", "other"):
        query["category"] = category
    if lang and lang in ("hi", "te", "en"):
        query["language"] = lang

    cursor = collection.find(query).sort("created_at", -1).skip(skip).limit(limit)
    docs = []
    async for doc in cursor:
        docs.append(ticket_to_dict(doc))
    total = await collection.count_documents(query)
    return {"total": total, "tickets": docs}


@app.patch("/admin/tickets/{ticket_id}/status")
async def update_status(
    ticket_id: str,
    body: StatusUpdate,
    collection: AsyncIOMotorCollection = Depends(get_db),
):
    """Update ticket resolution status."""
    try:
        oid = ObjectId(ticket_id)
    except Exception:
        raise HTTPException(status_code=422, detail="Invalid ticket ID")

    result = await collection.update_one(
        {"_id": oid},
        {"$set": {"status": body.status, "updated_at": datetime.now(timezone.utc)}},
    )
    if result.matched_count == 0:
        raise HTTPException(status_code=404, detail="Ticket not found")
    return {"ok": True, "status": body.status}


@app.patch("/admin/tickets/{ticket_id}/notes")
async def update_notes(
    ticket_id: str,
    body: NotesUpdate,
    collection: AsyncIOMotorCollection = Depends(get_db),
):
    """Save admin notes on a ticket."""
    try:
        oid = ObjectId(ticket_id)
    except Exception:
        raise HTTPException(status_code=422, detail="Invalid ticket ID")

    result = await collection.update_one(
        {"_id": oid},
        {"$set": {"admin_notes": body.admin_notes, "updated_at": datetime.now(timezone.utc)}},
    )
    if result.matched_count == 0:
        raise HTTPException(status_code=404, detail="Ticket not found")
    return {"ok": True}


@app.delete("/admin/tickets/{ticket_id}")
async def delete_ticket(
    ticket_id: str,
    collection: AsyncIOMotorCollection = Depends(get_db),
):
    """Hard-delete a ticket (admin only)."""
    try:
        oid = ObjectId(ticket_id)
    except Exception:
        raise HTTPException(status_code=422, detail="Invalid ticket ID")

    result = await collection.delete_one({"_id": oid})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Ticket not found")
    return {"ok": True}


# ---------------------------------------------------------------------------
# Admin Dashboard HTML
# ---------------------------------------------------------------------------

@app.get("/admin", response_class=HTMLResponse)
async def admin_dashboard(request: Request):
    """Render the admin dashboard."""
    return templates.TemplateResponse("admin.html", {"request": request})


# ---------------------------------------------------------------------------
# Root redirect
# ---------------------------------------------------------------------------

@app.get("/")
async def root():
    return JSONResponse({"service": "Lok Swar IVR", "admin": "/admin", "health": "/health"})
