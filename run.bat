@echo off
title KisanSetu-AI Prototype (SIH 26033 - DoCA)
echo =========================================================================
echo   KisanSetu-AI: Direct Farmer-to-Buyer Platform with AI Logistics
echo   SIH Problem Statement 26033 - Department of Consumer Affairs (DoCA)
echo =========================================================================
echo.

cd /d "%~dp0"
echo [1/3] Checking Python dependencies...
python -c "import fastapi, uvicorn" >nul 2>&1
if %errorlevel% neq 0 (
    echo Installing required packages...
    pip install -r requirements.txt
)

echo [2/3] Seeding Initial Indian Mandi & FPO Database...
python backend/seed_data.py

echo [3/3] Starting KisanSetu-AI Fast Server on http://localhost:8000 ...
echo Press Ctrl+C to stop the server.
echo.
python -m uvicorn backend.app:app --host 0.0.0.0 --port 8000 --reload
pause
