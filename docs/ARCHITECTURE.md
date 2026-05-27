# Architektur

## Überblick

Die Familienzentrale besteht aus:

- HTML5 Frontend
- Node.js Backend
- SQLite Datenbank
- REST API
- PWA-Unterstützung
- Windows-IoT Kioskmodus

## Komponenten

### Frontend

```text
frontend/
```

Verantwortlich für:
- Touch UI
- Kalenderansicht
- Aufgaben
- Einkaufsliste
- Elternmenü
- Bilderrahmenmodus

### Backend

```text
backend/
```

Verantwortlich für:
- REST API
- Authentifizierung
- Datenbankzugriff
- Synchronisierung
- Rollen & Berechtigungen

### Datenbank

```text
data/familienzentrale.sqlite
```

Tabellen:
- family_members
- events
- chores
- shopping_items
- meals
- points
- settings

## API

### Family

```text
GET  /api/family
POST /api/family
```

### Events

```text
GET  /api/events
POST /api/events
```

### Chores

```text
GET  /api/chores
POST /api/chores
```

### Shopping

```text
GET  /api/shopping
POST /api/shopping
```

### Meals

```text
GET  /api/meals
POST /api/meals
```

## Deployment

Windows 10 IoT:

```text
Node.js + Chrome Kiosk
```

## Zukunft

- Google Kalender Sync
- Outlook Sync
- Mobile App
- MQTT Smart Home
- Push Notifications
- Sprachsteuerung
- NFC Login
