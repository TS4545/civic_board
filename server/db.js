const Database = require('better-sqlite3');

// Creates (or opens) a file-based SQLite database
const db = new Database('issues.db');

// Ensure the issues table exists
db.prepare(`
  CREATE TABLE IF NOT EXISTS issues (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )
`).run();

module.exports = db;