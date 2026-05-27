# Testplan Version 0.2

## Ziel

Prüfen, ob die Familienzentrale stabil als zentrales Wanddisplay läuft.

## Test 1: Backend Start

```bash
cd backend
node server.v02.js
```

Erwartung:

```text
Familienzentrale v0.2 läuft auf Port 3000
```

## Test 2: API Healthcheck

Browser öffnen:

```text
http://localhost:3000/api/health
```

Erwartung:

```json
{
  "status": "ok"
}
```

## Test 3: Displayansicht

Browser öffnen:

```text
http://localhost:3000
```

Prüfen:

- Dashboard sichtbar
- Touchbedienung funktioniert
- Profile sichtbar
- Kalender sichtbar

## Test 4: Synchronisierung

API prüfen:

```text
http://localhost:3000/api/sync
```

Erwartung:

- JSON Antwort
- Familienmitglieder
- Aufgaben
- Termine

## Test 5: Kioskmodus

```bash
start-kiosk.bat
```

Prüfen:

- Vollbild
- keine Browserleisten
- Touchbedienung

## Test 6: Backup

```bash
scripts\backup.bat
```

Prüfen:

- Datei in backups/

## Test 7: Update

```bash
scripts\update.bat
```

Prüfen:

- neue Version geladen
- Datenbank erhalten

## Test 8: Rollback

```bash
scripts\rollback.bat
```

Prüfen:

- vorherige Version wiederhergestellt
