@echo off

SET iconPath=%~dp0src\assets\namma.ico
:: Change to the directory of the batch file
cd /d %~dp0

:: Create the shortcut using PowerShell
powershell -Command "$s=(New-Object -COM WScript.Shell).CreateShortcut('%desktopPath%'); $s.TargetPath='%appPath%'; $s.IconLocation='%iconPath%'; $s.Save()"

:: Start Node server in background
start "" cmd /c "node server.js"

:: Give the server a second to start (optional)
timeout /t 2 /nobreak >nul

:: Open default browser at localhost
start "" "http://localhost:3000"

exit
