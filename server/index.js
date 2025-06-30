const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const { OpenAI } = require("openai");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());


dotenv.config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

app.locals.openai = openai;

// ✅ Routes
const issuesRouter = require('./routes/issues');
app.use('/api/issues', issuesRouter);

// Test route
app.get('/', (req, res) => {
  res.send("Civic Engagement API is running.");
});


//////////Openai
app.post("/api/chat", async (req, res) => {
  const { message } = req.body;
  if (!message) return res.status(400).json({ error: "Missing message" });

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
      {
        role: "system",
        content: "You will read the message and summarize the message with a tag if relevant. These tags should be civil issues such as 'potholes', 'police', or 'traffic'. answer with one word only"
      },
      {
        role: "user",
        content: message,
      },
    ],
      max_tokens: 300,
    });

    const reply = completion.choices[0].message.content.trim();
    res.json({ reply });
  } catch (error) {
    console.error("OpenAI error:", error);
    res.status(500).json({ error: "Failed to get reply" });
  }
});


////////// Legislation summary
app.post('/api/legislation', async (req, res) => {
  const { tag } = req.body;
  if (!tag) return res.status(400).json({ error: 'Missing tag' });

  try {
    const prompt = `
You are a civic assistant.  
Given the tag "${tag}", find one key piece of recent or pending legislation in Austin, Texas related to this issue.  
Respond *only* with valid JSON in this exact format:

{
  "title": "<the official name of the legislation here>",
  "summary": "<a very short summary of it and HOW to support (or argue against when relevant) it. be very consice>"
}
`;
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "user", content: prompt }
      ],
      max_tokens: 200,
    });

    // Parse the JSON response
    const json = completion.choices[0].message.content.trim();
    const result = JSON.parse(json);

    res.json(result);
  } catch (error) {
    console.error("Legislation summary error:", error);
    res.status(500).json({ error: "Failed to get legislation summary" });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});