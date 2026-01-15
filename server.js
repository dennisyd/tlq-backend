const express = require("express");
const cors = require("cors");
const { subjects, tutors, testimonials } = require("./data");

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

app.get("/api/health", (req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

app.get("/api/subjects", (req, res) => {
  res.json({ subjects });
});

app.get("/api/tutors", (req, res) => {
  res.json({ tutors });
});

app.get("/api/testimonials", (req, res) => {
  res.json({ testimonials });
});

app.post("/api/consultations", (req, res) => {
  const { name, email, phone, studentGrade, subject, message } = req.body || {};
  const missing = [];

  if (!name) missing.push("name");
  if (!email) missing.push("email");
  if (!phone) missing.push("phone");
  if (!studentGrade) missing.push("studentGrade");
  if (!subject) missing.push("subject");

  if (missing.length > 0) {
    return res.status(400).json({
      error: "Missing required fields",
      fields: missing
    });
  }

  return res.status(201).json({
    status: "received",
    consultation: {
      name,
      email,
      phone,
      studentGrade,
      subject,
      message: message || ""
    }
  });
});

app.listen(PORT, () => {
  console.log(`TLQ API listening on http://localhost:${PORT}`);
});

