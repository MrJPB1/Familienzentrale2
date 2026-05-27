const express = require('express');
const crypto = require('crypto');
const { all, run } = require('../database');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const rows = await all('SELECT * FROM meals ORDER BY day');
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/', async (req, res) => {
  try {
    const meal = req.body;
    const id = meal.id || crypto.randomUUID();

    await run(
      `INSERT INTO meals (id, day, meal, icon)
       VALUES (?, ?, ?, ?)`,
      [id, meal.day, meal.meal, meal.icon || '🍽️']
    );

    res.json({ success: true, id });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
