const express = require('express');
const cors = require('cors');
const path = require('path');
const sqlite3 = require('sqlite3').verbose();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

const dbPath = path.join(__dirname, '..', 'data', 'familienzentrale.sqlite');
const db = new sqlite3.Database(dbPath);

function initDatabase() {
  db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS family (
      id TEXT PRIMARY KEY,
      name TEXT,
      role TEXT,
      color TEXT,
      emoji TEXT,
      photo TEXT,
      pin TEXT
    )`);

    db.run(`CREATE TABLE IF NOT EXISTS events (
      id TEXT PRIMARY KEY,
      title TEXT,
      time TEXT,
      day INTEGER,
      row INTEGER,
      span REAL,
      person TEXT,
      color TEXT
    )`);

    db.run(`CREATE TABLE IF NOT EXISTS chores (
      id TEXT PRIMARY KEY,
      title TEXT,
      person TEXT,
      points INTEGER,
      done INTEGER
    )`);
  });
}

initDatabase();

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', service: 'familienzentrale-backend' });
});

app.get('/api/family', (req, res) => {
  db.all('SELECT * FROM family', [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

app.post('/api/family', (req, res) => {
  const member = req.body;

  db.run(
    'INSERT INTO family (id, name, role, color, emoji, photo, pin) VALUES (?, ?, ?, ?, ?, ?, ?)',
    [member.id, member.name, member.role, member.color, member.emoji, member.photo, member.pin],
    function(err) {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ success: true, id: member.id });
    }
  );
});

app.get('/api/events', (req, res) => {
  db.all('SELECT * FROM events', [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

app.post('/api/events', (req, res) => {
  const event = req.body;

  db.run(
    'INSERT INTO events (id, title, time, day, row, span, person, color) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
    [event.id, event.title, event.time, event.day, event.row, event.span, event.person, event.color],
    function(err) {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ success: true, id: event.id });
    }
  );
});

app.get('/api/chores', (req, res) => {
  db.all('SELECT * FROM chores', [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

app.post('/api/chores', (req, res) => {
  const chore = req.body;

  db.run(
    'INSERT INTO chores (id, title, person, points, done) VALUES (?, ?, ?, ?, ?)',
    [chore.id, chore.title, chore.person, chore.points, chore.done ? 1 : 0],
    function(err) {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ success: true, id: chore.id });
    }
  );
});

app.use('/', express.static(path.join(__dirname, '..')));

app.listen(PORT, () => {
  console.log(`Familienzentrale Backend läuft auf Port ${PORT}`);
});
