const express = require('express');
const pool = require('./database');

const router = express.Router();

// Example route
router.get('/', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT 1 + 1 AS result');
    res.json({ result: rows[0].result });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
