const express = require('express');
const router = express.Router();
const db = require('../db');

// GET all issues
router.get('/', (req, res) => {
  const stmt = db.prepare('SELECT * FROM issues ORDER BY created_at DESC');
  const issues = stmt.all();
  res.json(issues);
});

// POST a new issue
router.post('/', (req, res) => {
  const { title, description } = req.body;
  if (!title || !description) {
    return res.status(400).json({ error: 'Title and description are required.' });
  }

  const stmt = db.prepare('INSERT INTO issues (title, description) VALUES (?, ?)');
  const result = stmt.run(title, description);

  const newIssue = db.prepare('SELECT * FROM issues WHERE id = ?').get(result.lastInsertRowid);
  res.status(201).json(newIssue);
});

module.exports = router;