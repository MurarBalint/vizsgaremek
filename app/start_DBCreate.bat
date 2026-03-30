@echo off
start "" cmd /c "cd /d %~dp0Backend && npm i && npm run db:setup"
exit