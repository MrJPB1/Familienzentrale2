const express = require('express');
const crypto = require('crypto');
const { all, run } = require('../database');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const rows = await all('SELECT * FROM family_members ORDER BY name');
    res.json(rows.map(r => ({
      ...r,
      permissions: JSON.parse(r.permissions || '[]')
    })));
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/', async (req, res) => {
  try {
    const member = req.body;

    const id = member.id || crypto.randomUUID();

    await run(
      `INSERT INTO family_members
      (id, name, role, color, emoji, photo, pin, permissions)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        id,
        member.name,
        member.role || 'Kind',
        member.color || '#94c9ff',
        member.emoji || '😊',
        member.photo || '',
        member.pin || '',
        JSON.stringify(member.permissions || [])
      ]
    );

    res.json({ success: true, id });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
