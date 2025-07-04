@echo off
echo Starting StratIQ Platform...
echo.

echo [1/3] Starting Backend API Server...
start "StratIQ API" cmd /k "cd /d backend\api && npm run dev"

timeout /t 3 /nobreak > nul

echo [2/3] Starting Python AI Service...
start "StratIQ AI" cmd /k "cd /d backend\ai && python main.py"

timeout /t 3 /nobreak > nul

echo [3/3] Starting Frontend Development Server...
start "StratIQ Frontend" cmd /k "cd /d frontend && npm run dev"

echo.
echo StratIQ Platform starting up...
echo.
echo Frontend: http://localhost:3000
echo Backend API: http://localhost:3001
echo Python AI: http://localhost:8000
echo.
echo Press any key to exit...
pause > nul
