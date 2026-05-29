@echo off
echo Starte Familienzentrale neu...
taskkill /IM node.exe /F >nul 2>&1
timeout /t 2 >nul
start cmd /k "cd /d %~dp0\..\backend && node server.v02.js"
