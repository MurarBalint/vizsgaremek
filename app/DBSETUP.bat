@echo off

REM Backend konzol
start "Backend" cmd /k "cd /d %~dp0Backend && npm i && npm run db:setup"

exit
