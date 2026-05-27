const express = require('express');
const { all } = require('../database');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const [family, events, chores, shopping, meals, settingsRows] = await Promise.all([
      all('SELECT * FROM family_members ORDER BY name'),
      all('SELECT * FROM events ORDER BY day, row'),
      all('SELECT * FROM chores ORDER BY created_at DESC'),
      all('SELECT * FROM shopping_items ORDER BY created_at DESC'),
      all('SELECT * FROM meals ORDER BY day'),
      all('SELECT key, value FROM settings')
    ]);

    const settings = {};
    for (const row of settingsRows) {
      try {
        settings[row.key] = JSON.parse(row.value);
      } catch {
        settings[row.key] = row.value;
      }
    }

    res.json({
      family: family.map(item => ({
        ...item,
        permissions: JSON.parse(item.permissions || '[]')
      })),
      events,
      chores: chores.map(item => ({ ...item, done: !!item.done })),
      shopping: shopping.map(item => ({ ...item, done: !!item.done })),
      meals,
      settings
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
