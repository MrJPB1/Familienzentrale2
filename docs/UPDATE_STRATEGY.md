# Update-Strategie

## Ziel

Updates sollen:

- einfach installierbar
- sicher
- rollbackfähig
- familienfreundlich
- mit minimaler Unterbrechung

sein.

## Architektur

```text
current/   aktive Version
next/      neue Version
previous/  letzte funktionierende Version
backups/   Datenbankbackups
```

## Update-Ablauf

1. Backup erstellen
2. Neue Version herunterladen
3. npm install
4. Healthcheck durchführen
5. Wechsel auf neue Version
6. Bei Fehler → Rollback

## Datenbank

Die SQLite-Datenbank liegt außerhalb des App-Codes:

```text
C:\Familienzentrale\data\familienzentrale.sqlite
```

Dadurch bleiben Daten bei Updates erhalten.

## Minimale Unterbrechung

Das zentrale Wanddisplay soll nur kurz neu laden müssen.

Ziel:

```text
Unterbrechung < 10 Sekunden
```

## Rollback

Im Fehlerfall:

```bash
scripts\rollback.bat
```

## Zukunft

- automatische Nachtupdates
- GitHub Releases
- Signaturprüfung
- WebSocket-Reconnect
- Canary Updates
