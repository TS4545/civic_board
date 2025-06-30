const express = require('express');
const router = express.Router();
const db = require('../db');

// GET all issues
router.get('/', (req, res) => {
  const stmt = db.prepare('SELECT * FROM issues ORDER BY created_at DESC');
  const issues = stmt.all();
  res.json(issues);
});

// POST a new issue with GPT tagging
router.post('/', async (req, res) => {
  const { title, description } = req.body;
  if (!title || !description) {
    return res.status(400).json({ error: 'Title and description are required.' });
  }

  const openai = req.app.locals.openai;
  let tag = '';

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: "You are a civic issue tagger. Return only one lowercase keyword summarizing the issue (e.g. potholes, police, traffic)."
        },
        {
          role: "user",
          content: `${title}\n\n${description}`
        }
      ],
      max_tokens: 10,
    });

    tag = completion.choices[0].message.content.trim().toLowerCase();
  } catch (error) {
    console.error("GPT tagging error:", error);
    tag = 'general'; // fallback
  }

  const stmt = db.prepare('INSERT INTO issues (title, description, tag) VALUES (?, ?, ?)');
  const result = stmt.run(title, description, tag);

  const newIssue = db.prepare('SELECT * FROM issues WHERE id = ?').get(result.lastInsertRowid);
  res.status(201).json(newIssue);
});

module.exports = router;