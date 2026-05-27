@echo off
setlocal

set ROOT=C:\Familienzentrale
set CURRENT=%ROOT%\current
set NEXT=%ROOT%\next
set PREVIOUS=%ROOT%\previous

cd /d %ROOT%

call scripts\backup.bat

if exist "%PREVIOUS%" rmdir /s /q "%PREVIOUS%"
if exist "%CURRENT%" rename "%CURRENT%" previous

if exist "%NEXT%" rmdir /s /q "%NEXT%"

git clone https://github.com/MrJPB1/Familienzentrale2.git next

cd /d %NEXT%\backend
call npm install

cd /d %ROOT%
rename "%NEXT%" current

echo Update abgeschlossen.
endlocal
