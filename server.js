const express = require("express");
const cors = require("cors");
const nodemailer = require("nodemailer");
const { subjects, tutors, testimonials } = require("./data");

const app = express();
const PORT = process.env.PORT || 4000;

// Email transporter configuration
const transporter = nodemailer.createTransport({
  service: 'gmail', // You can change this to other services like 'outlook', 'yahoo', etc.
  auth: {
    user: process.env.EMAIL_USER, // Your email address
    pass: process.env.EMAIL_PASS  // Your email password or app-specific password
  }
});

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

app.post("/api/consultations", async (req, res) => {
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

  // Send email notification
  try {
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.NOTIFICATION_EMAIL || process.env.EMAIL_USER, // Where to receive notifications
      subject: `New Consultation Request - ${subject}`,
      html: `
        <h2>New Consultation Request</h2>
        <p><strong>Parent/Guardian Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Student Grade:</strong> ${studentGrade}</p>
        <p><strong>Subject Focus:</strong> ${subject}</p>
        <p><strong>Message:</strong></p>
        <p>${message || "No additional message provided."}</p>
        <hr>
        <p><em>Submitted on ${new Date().toLocaleString()}</em></p>
      `,
      replyTo: email // Allows you to reply directly to the parent/guardian
    };

    await transporter.sendMail(mailOptions);
    console.log("Email notification sent successfully");
  } catch (error) {
    console.error("Error sending email:", error);
    // Don't fail the request if email fails - log it and continue
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

app.post("/api/sat-registration", async (req, res) => {
  const { studentName, parentName, email, phone, grade, currentScore, targetScore, testDate, message } = req.body || {};
  const missing = [];

  if (!studentName) missing.push("studentName");
  if (!parentName) missing.push("parentName");
  if (!email) missing.push("email");
  if (!phone) missing.push("phone");
  if (!grade) missing.push("grade");
  if (!targetScore) missing.push("targetScore");

  if (missing.length > 0) {
    return res.status(400).json({
      error: "Missing required fields",
      fields: missing
    });
  }

  // Send email notification
  try {
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.NOTIFICATION_EMAIL || process.env.EMAIL_USER,
      subject: `SAT Crash Course Registration - ${studentName}`,
      html: `
        <h2>New SAT Crash Course Registration</h2>
        <p><strong>Student Name:</strong> ${studentName}</p>
        <p><strong>Parent/Guardian Name:</strong> ${parentName}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Grade:</strong> ${grade}</p>
        <p><strong>Current SAT Score:</strong> ${currentScore || "Not taken yet"}</p>
        <p><strong>Target SAT Score:</strong> ${targetScore}</p>
        <p><strong>Test Date:</strong> ${testDate || "Not specified"}</p>
        <p><strong>Questions/Comments:</strong></p>
        <p>${message || "No additional comments."}</p>
        <hr>
        <p><strong>Event:</strong> SAT Crash Course - February 28, 2026</p>
        <p><strong>Location:</strong> Meeting Room B @ Owings Mills Library</p>
        <p><strong>Cost:</strong> $79</p>
        <p><strong>Payment Options:</strong> Zelle (dennisyd@gmail.com), CashApp ($dennisyd), PayPal (dennisyd@alum.mit.edu)</p>
        <hr>
        <p><em>Submitted on ${new Date().toLocaleString()}</em></p>
      `,
      replyTo: email
    };

    await transporter.sendMail(mailOptions);
    console.log("SAT registration email sent successfully");
  } catch (error) {
    console.error("Error sending SAT registration email:", error);
  }

  return res.status(201).json({
    status: "received",
    registration: {
      studentName,
      parentName,
      email,
      phone,
      grade,
      currentScore: currentScore || "",
      targetScore,
      testDate: testDate || "",
      message: message || ""
    }
  });
});

app.listen(PORT, () => {
  console.log(`TLQ API listening on http://localhost:${PORT}`);
});

