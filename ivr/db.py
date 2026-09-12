"""
IVR System — Async MongoDB Client (Motor)
Shares the existing lok_swar_db MongoDB Atlas cluster.
Collection: ivr_tickets
"""
import os
from motor.motor_asyncio import AsyncIOMotorClient
from dotenv import load_dotenv
from pathlib import Path

# Load .env from project root (one level up from ivr/)
load_dotenv(dotenv_path=Path(__file__).parent.parent / ".env")

MONGO_URI: str = os.getenv("MONGODB_URI", "mongodb://localhost:27017")
DB_NAME: str = os.getenv("IVR_DB_NAME", "lok_swar_db")
COLLECTION_NAME: str = "ivr_tickets"

# Module-level client (singleton, reused across requests)
_client: AsyncIOMotorClient | None = None


def get_client() -> AsyncIOMotorClient:
    global _client
    if _client is None:
        _client = AsyncIOMotorClient(
            MONGO_URI,
            serverSelectionTimeoutMS=5000,
            connectTimeoutMS=5000,
        )
    return _client


def get_db():
    """FastAPI dependency — returns the ivr_tickets collection."""
    return get_client()[DB_NAME][COLLECTION_NAME]


async def ping_db() -> bool:
    """Health-check: returns True if Atlas responds."""
    try:
        await get_client().admin.command("ping")
        return True
    except Exception:
        return False
