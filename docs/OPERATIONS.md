# Betriebshandbuch

## Ziel

Die Familienzentrale soll stabil im Dauerbetrieb laufen.

## Tagesbetrieb

Das zentrale Display läuft:

- dauerhaft eingeschaltet
- im Chrome Kioskmodus
- mit automatischer Synchronisierung

## Startreihenfolge

### 1. Backend starten

```bash
start-server.bat
```

### 2. Display starten

```bash
start-kiosk.bat
```

## Überwachung

### API Healthcheck

```text
http://localhost:3000/api/health
```

### Synchronisierung

```text
http://localhost:3000/api/sync
```

## Wartung

### Monatlich

- Windows Updates
- npm Updates
- Datenbankbackup
- Browsercache prüfen

### Vor jedem Update

```bash
scripts\backup.bat
```

## Fehlerfall

### Display reagiert nicht

- Chrome neu starten
- Backend prüfen
- Healthcheck aufrufen

### Backend startet nicht

```bash
cd backend
npm install
node server.v02.js
```

### Rollback

```bash
scripts\rollback.bat
```

## Zielsystem

Primärsystem:

```text
Zentrales Familien-Wanddisplay
```

Sekundär:

- Smartphone
- Tablet
- Browserzugriff
