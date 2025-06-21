const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// ✅ Routes
const issuesRouter = require('./routes/issues');
app.use('/api/issues', issuesRouter);

// Test route
app.get('/', (req, res) => {
  res.send("Civic Engagement API is running.");
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});