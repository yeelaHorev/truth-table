@echo off
:: Change to the directory of the batch file
cd /d %~dp0

:: Start Node server in background
start "" cmd /c "node server.js"

:: Give the server a second to start (optional)
timeout /t 2 /nobreak >nul

:: Open default browser at localhost
start "" "http://localhost:3000"

exit
