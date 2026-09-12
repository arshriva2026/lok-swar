# Lok Swar IVR — Setup & Testing Guide

Zero-cost IVR customer care for rural keypad phones. FastAPI + Motor + TwiML.

---

## Quick Start (Local)

```bash
# 1. Install IVR dependencies
pip install -r ivr/requirements.txt

# 2. Start the IVR server (from project root)
uvicorn ivr.main:app --reload --port 8001

# 3. Open admin dashboard
open http://localhost:8001/admin

# 4. Create a mock ticket for testing
curl -X POST http://localhost:8001/ivr/test/create-mock
```

Or double-click `START_IVR.bat` on Windows.

---

## Environment Variables (.env)

| Variable | Description | Default |
|---|---|---|
| `MONGODB_URI` | MongoDB Atlas connection string | `mongodb://localhost:27017` |
| `IVR_DB_NAME` | Database name | `lok_swar_db` |
| `TWILIO_ACCOUNT_SID` | Your Twilio Account SID | *(empty)* |
| `TWILIO_AUTH_TOKEN` | Your Twilio Auth Token | *(empty)* |

Add to your `.env`:
```
TWILIO_ACCOUNT_SID=ACxxxxxxxxxxxxxxxxxxxxxxxxxxxx
TWILIO_AUTH_TOKEN=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

---

## Testing with ngrok + Twilio (Zero Cost)

### Step 1 — Get a Free Twilio Sandbox Number
1. Sign up at [twilio.com](https://twilio.com) (free trial includes ~$15 credit)
2. Go to **Phone Numbers → Manage → Active Numbers** and note your number (e.g. `+12345678900`)

### Step 2 — Expose Local Server via ngrok
```bash
# Install ngrok (free): https://ngrok.com/download
ngrok http 8001
```

Copy the HTTPS URL, e.g.: `https://abc123.ngrok-free.app`

### Step 3 — Configure Twilio Webhook
1. Go to your Twilio number settings
2. Under **Voice → A Call Comes In**, set:
   - **Webhook URL:** `https://abc123.ngrok-free.app/ivr/welcome`
   - **Method:** `HTTP POST`
3. Save.

### Step 4 — Make a Test Call
Call your Twilio number from any phone. You'll hear the IVR greeting!

---

## IVR Call Flow

```
Incoming Call → /ivr/welcome
  Press 1 (Hindi) / Press 2 (Telugu) / Press 3 (English)
    ↓
/ivr/category?lang=hi|te|en
  Press 1 (Electricity) / Press 2 (Water) / Press 3 (Other)
    ↓
/ivr/record-prompt?lang=XX&cat=YY
  [Beep] → Caller speaks complaint → Press # to end
    ↓
/ivr/save-recording → Saves ticket to MongoDB
  → "Thank you, your complaint is registered." → Hangup
```

---

## Indian Cloud Telephony (Production)

### Exotel
1. Create account at [exotel.com](https://exotel.com)
2. Get a virtual DID number (₹500-2000/mo)
3. Set Passthru App URL: `https://yourserver.com/ivr/welcome`
4. Exotel sends same TwiML-compatible form params

### Knowlarity
- Set "Action URL" to `https://yourserver.com/ivr/welcome`
- Method: POST
- Compatible with standard TwiML `<Say>`, `<Gather>`, `<Record>`

---

## API Reference

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET/POST` | `/ivr/welcome` | Language selection menu |
| `GET/POST` | `/ivr/category` | Category selection menu |
| `GET/POST` | `/ivr/record-prompt` | Recording instruction |
| `GET/POST` | `/ivr/save-recording` | Saves ticket to MongoDB |
| `GET` | `/ivr/audio/{recording_sid}` | Proxy Twilio audio with auth |
| `POST` | `/ivr/test/create-mock` | Insert a mock ticket for demo |
| `GET` | `/admin` | Admin dashboard UI |
| `GET` | `/admin/tickets` | Paginated ticket list (JSON) |
| `PATCH` | `/admin/tickets/{id}/status` | Update status |
| `PATCH` | `/admin/tickets/{id}/notes` | Save admin notes |
| `DELETE` | `/admin/tickets/{id}` | Delete ticket |
| `GET` | `/health` | DB health check |
| `GET` | `/docs` | Swagger auto-docs |

---

## MongoDB Collection: `ivr_tickets`

```json
{
  "_id": "ObjectId",
  "call_sid": "CAxxxxxxx",
  "caller_phone": "+919876543210",
  "language": "hi",
  "category": "electricity",
  "recording_url": "https://api.twilio.com/.../Recordings/RExxxx.mp3",
  "recording_sid": "RExxxxxxx",
  "duration": 45,
  "status": "new",
  "admin_notes": "",
  "created_at": "2024-01-15T10:30:00Z",
  "updated_at": "2024-01-15T10:30:00Z"
}
```

---

## Deployment (Render / Railway / Fly.io)

```yaml
# render.yaml addition
- type: web
  name: lok-swar-ivr
  runtime: python
  buildCommand: pip install -r ivr/requirements.txt
  startCommand: uvicorn ivr.main:app --host 0.0.0.0 --port 8001
  envVars:
    - key: MONGODB_URI
      sync: false
    - key: TWILIO_ACCOUNT_SID
      sync: false
    - key: TWILIO_AUTH_TOKEN
      sync: false
```

---

## Architecture

```
Keypad Phone → Twilio → ngrok → FastAPI (port 8001)
                                    ↓
                               Motor (async)
                                    ↓
                          MongoDB Atlas (ivr_tickets)
                                    ↑
                         Admin Dashboard (/admin)
```
