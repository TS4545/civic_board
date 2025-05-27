const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 5000;

// Enable CORS so the React app can call this backend
app.use(cors());
app.use(express.json());

// ✅ Route that the React frontend will fetch
app.get("/api/message", (req, res) => {
  res.json({ message: "👋 Hello from the Civic API!" });
});

// Optional root route (for testing)
app.get("/", (req, res) => {
  res.send("Civic Engagement API is running.");
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});