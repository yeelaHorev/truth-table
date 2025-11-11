@echo off

SET iconPath=%~dp0src\assets\naama.ico
SET appPath=%~dp0start-app.bat

:: Change to the directory of the batch file
cd /d %~dp0

:: PowerShell script to get desktop path
powershell -Command ^
"$desktop=[Environment]::GetFolderPath('Desktop'); ^
$shortcut=Join-Path $desktop 'Truth Table.lnk'; ^
if (-not (Test-Path $shortcut)) { ^
    $s=(New-Object -COMObject WScript.Shell).CreateShortcut($shortcut); ^
    $s.TargetPath='%appPath%'; ^
    $s.IconLocation='%iconPath%'; ^
    $s.WorkingDirectory='%~dp0'; ^
    $s.Save(); ^
    Write-Output 'Desktop shortcut created!'; ^
} else { ^
    Write-Output 'Desktop shortcut already exists.' ^
}"

:: Start Node server in background
start "" cmd /c "node server.js"

:: Give the server a second to start
timeout /t 2 /nobreak >nul

:: Open default browser at localhost
start "" "http://localhost:3000"

exit
