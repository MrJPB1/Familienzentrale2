@echo off
setlocal

set ROOT=C:\Familienzentrale

if exist "%ROOT%\previous" (
  if exist "%ROOT%\current" rmdir /s /q "%ROOT%\current"
  rename "%ROOT%\previous" current
  echo Rollback erfolgreich.
) else (
  echo Keine vorherige Version gefunden.
)

endlocal
