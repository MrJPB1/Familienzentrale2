const express = require('express');
const crypto = require('crypto');
const { all, run } = require('../database');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const rows = await all('SELECT * FROM chores ORDER BY created_at DESC');
    res.json(rows.map(r => ({ ...r, done: !!r.done })));
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/', async (req, res) => {
  try {
    const chore = req.body;
    const id = chore.id || crypto.randomUUID();

    await run(
      `INSERT INTO chores
      (id, title, person, points, done, icon)
      VALUES (?, ?, ?, ?, ?, ?)`,
      [
        id,
        chore.title,
        chore.person || '',
        chore.points || 1,
        chore.done ? 1 : 0,
        chore.icon || '✅'
      ]
    );

    res.json({ success: true, id });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
