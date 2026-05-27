# Windows 10 IoT Installation & Betrieb

## Ziel

Die Familienzentrale soll dauerhaft auf einem zentralen Touchdisplay mit Windows 10 IoT laufen.

## Hardware-Empfehlung

### Empfohlen

- Intel NUC oder Mini-PC
- 8 GB RAM
- SSD
- Touchdisplay 21-27 Zoll
- dauerhaft eingeschaltetes Netzteil

### Alternativ

- Surface Tablet
- All-in-One PC
- Industriepanel-PC

## Software-Voraussetzungen

Installieren:

- Windows 10 IoT
- Google Chrome
- Node.js 20+
- Git

## Repository klonen

```bash
git clone https://github.com/MrJPB1/Familienzentrale2.git
```

## Backend installieren

```bash
cd Familienzentrale2/backend
npm install
```

## Server starten

```bash
npm start
```

## Kioskmodus starten

```bash
chrome.exe --kiosk http://localhost:3000
```

## Empfohlene Windows-Einstellungen

### Energie

- niemals Standby
- Bildschirm dauerhaft aktiv
- keine automatische Sperre

### Anmeldung

- automatische Benutzeranmeldung
- dediziertes Familienkonto

### Chrome

- Vollbild
- keine Tabs
- keine Browserleiste
- Zoom 125-150%

## Autostart

### Server

`start-server.bat` in:

```text
shell:startup
```

### Kioskmodus

`start-kiosk.bat` ebenfalls in:

```text
shell:startup
```

## Updates

### Repository aktualisieren

```bash
git pull
```

### Node Module aktualisieren

```bash
cd backend
npm install
```

## Backup

Wichtig:

```text
/data/familienzentrale.sqlite
```

regelmäßig sichern.

## Wartung

### Empfohlen

- monatliche Updates
- Datenbankbackup
- Browsercache leeren
- Neustart des Geräts

## Fehlerdiagnose

### API prüfen

```text
http://localhost:3000/api/health
```

### Logs

Im Terminal des Node.js Servers.

## Wichtiger Hinweis

Diese Dokumentation muss bei Architektur- oder Deploymentänderungen aktualisiert werden.
