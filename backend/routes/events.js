const express = require('express');
const crypto = require('crypto');
const { all, run } = require('../database');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const rows = await all('SELECT * FROM events ORDER BY day, row');
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/', async (req, res) => {
  try {
    const event = req.body;
    const id = event.id || crypto.randomUUID();

    await run(
      `INSERT INTO events
      (id, title, time, day, row, span, person, color, icon)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        id,
        event.title,
        event.time || '',
        event.day || 1,
        event.row || 1,
        event.span || 1,
        event.person || '',
        event.color || '#f8dfb8',
        event.icon || '📌'
      ]
    );

    res.json({ success: true, id });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
