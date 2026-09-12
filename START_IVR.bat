@echo off
echo ================================================
echo   Lok Swar IVR Server — Starting on port 8001
echo ================================================
echo.

:: Install IVR dependencies if not already installed
py -m pip install -r ivr\requirements.txt --quiet

echo.
echo [IVR] Starting FastAPI server...
echo [IVR] Admin Dashboard: http://localhost:8001/admin
echo [IVR] Health Check:    http://localhost:8001/health
echo [IVR] API Docs:        http://localhost:8001/docs
echo.
echo [IVR] For ngrok tunnel: ngrok http 8001
echo.

py -m uvicorn ivr.main:app --reload --port 8001 --host 0.0.0.0

pause
