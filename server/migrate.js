const db = require('./db');

try {
  db.prepare('ALTER TABLE issues ADD COLUMN tag TEXT').run();
  console.log("✅ Tag column added!");
} catch (err) {
  if (err.message.includes('duplicate column name')) {
    console.log("✅ Tag column already exists, no action needed.");
  } else {
    console.error("⚠️ Migration error:", err.message);
  }
}
process.exit();