@echo off
setlocal

set ROOT=C:\Familienzentrale
set DATA=%ROOT%\data
set BACKUPS=%ROOT%\backups

if not exist "%BACKUPS%" mkdir "%BACKUPS%"

for /f "tokens=1-4 delims=/.- " %%a in ("%date%") do set DATESTAMP=%%d-%%b-%%c
for /f "tokens=1-3 delims=:,. " %%a in ("%time%") do set TIMESTAMP=%%a%%b%%c

set TARGET=%BACKUPS%\familienzentrale-%DATESTAMP%-%TIMESTAMP%.sqlite

if exist "%DATA%\familienzentrale.sqlite" (
  copy "%DATA%\familienzentrale.sqlite" "%TARGET%"
  echo Backup erstellt: %TARGET%
) else (
  echo Keine Datenbank gefunden: %DATA%\familienzentrale.sqlite
)

endlocal
