const express = require('express');
const crypto = require('crypto');
const { all, run } = require('../database');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const rows = await all('SELECT * FROM shopping_items ORDER BY created_at DESC');
    res.json(rows.map(r => ({ ...r, done: !!r.done })));
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/', async (req, res) => {
  try {
    const item = req.body;
    const id = item.id || crypto.randomUUID();

    await run(
      `INSERT INTO shopping_items (id, title, done)
       VALUES (?, ?, ?)`,
      [id, item.title, item.done ? 1 : 0]
    );

    res.json({ success: true, id });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
