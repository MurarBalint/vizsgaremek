@echo off

REM Backend konzol
start "Backend" cmd /k "cd /d %~dp0Backend && npm i && npm run start:seed"

REM Frontend konzol
start "Frontend" cmd /k "cd /d %~dp0Frontend && npm i && npm run dev"

exit
