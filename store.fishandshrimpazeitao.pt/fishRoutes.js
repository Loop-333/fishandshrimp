// backend/fishRoutes.js
const express = require('express');
const router = express.Router();
const db = require('./db');

// GET all fish
router.get('/fish', (req, res) => {
  db.all('SELECT * FROM fish', [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

module.exports = router;
