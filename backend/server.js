import cors from "cors";

app.use(cors({
  origin: "*"
}));

const express = require("express");
const cors = require("cors");
const { createClient } = require("@supabase/supabase-js");
require("dotenv").config({ path: __dirname + "/.env" });

const app = express();
app.use(cors());
app.use(express.json());

// 🔑 Supabase client (BACKEND ONLY)
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

// Test route (optional but useful)
app.get("/", (req, res) => {
  res.send("Backend is running ✅");
});

// Get all items
app.get("/api/items", async (req, res) => {
  const { data, error } = await supabase
    .from("items")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    return res.status(500).json({ error: error.message });
  }

  res.json(data);
});

// Add item
app.post("/api/items", async (req, res) => {
  const { question, answer } = req.body;

  if (!question || !answer) {
    return res.status(400).json({ error: "Question and answer are required" });
  }

  const { data, error } = await supabase
    .from("items")
    .insert([{ question, answer }])
    .select()
    .single();

  if (error) {
    return res.status(500).json({ error: error.message });
  }

  res.json(data);
});

app.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});
