# Sicherheit

## Grundprinzipien

Die Familienzentrale soll:

- einfach wartbar
- lokal kontrollierbar
- updatefähig
- ausfallsicher

sein.

## Sicherheitsmaßnahmen

### Updates

- Updates nur aus eigenem GitHub Repository
- Backup vor jedem Update
- Rollback möglich
- npm Dependencies kontrollieren

### Betrieb

- lokales Netzwerk bevorzugt
- keine unnötigen offenen Ports
- regelmäßige Windows Updates
- regelmäßige Node.js Updates

### Daten

- SQLite Backups
- lokale Speicherung
- keine Cloudpflicht

## Geplante Erweiterungen

- HTTPS lokal
- Rollen & Sessions
- Signierte Releases
- MFA für Elternbereich
- verschlüsselte Backups
