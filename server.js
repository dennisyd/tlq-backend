const express = require("express");
const cors = require("cors");
const { subjects, tutors, testimonials } = require("./data");

const app = express();
const PORT = process.env.PORT || 4000;

async function sendEmail({ from, to, subject, html, replyTo }) {
  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.RESEND_API_KEY}`
      },
      body: JSON.stringify({
        from,
        to: Array.isArray(to) ? to : [to],
        subject,
        html,
        reply_to: replyTo || undefined
      })
    });

    const data = await response.json();

    if (response.ok) {
      console.log("Email sent successfully:", data.id);
      return { success: true, id: data.id };
    } else {
      console.error("Email API error:", response.status, JSON.stringify(data));
      return { success: false, error: data };
    }
  } catch (error) {
    console.error("Email send error:", error.message);
    return { success: false, error: error.message };
  }
}

function sendEmailInBackground(options, label) {
  sendEmail(options)
    .then((result) => {
      if (result.success) {
        console.log(`${label} email sent:`, result.id);
      } else {
        console.error(`${label} email failed:`, JSON.stringify(result.error));
      }
    })
    .catch((err) => {
      console.error(`${label} email unexpected error:`, err.message);
    });
}

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

  const fromAddress = process.env.FROM_EMAIL || "onboarding@resend.dev";
  const notifyAddress = process.env.NOTIFICATION_EMAIL || "dennisyd@gmail.com";

  sendEmailInBackground({
    from: fromAddress,
    to: notifyAddress,
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
    replyTo: email
  }, "Consultation (Admin)");

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

app.post("/api/sat-registration", (req, res) => {
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

  const fromAddress = process.env.FROM_EMAIL || "onboarding@resend.dev";
  const notifyAddress = process.env.NOTIFICATION_EMAIL || "dennisyd@gmail.com";

  sendEmailInBackground({
    from: fromAddress,
    to: notifyAddress,
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
  }, "SAT Registration (Admin)");

  sendEmailInBackground({
    from: fromAddress,
    to: email,
    subject: "SAT Crash Course Registration Confirmation - The Learning Quarters",
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: linear-gradient(135deg, #1a2a5e, #2d4a9a); padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
          <h1 style="color: #ffffff; margin: 0;">The Learning Quarters</h1>
          <p style="color: #f4d03f; margin: 10px 0 0; font-size: 1.1rem;">SAT Crash Course Registration Confirmed</p>
        </div>
        <div style="padding: 30px; background: #ffffff; border: 1px solid #e0e0e0;">
          <p>Dear ${parentName},</p>
          <p>Thank you for registering <strong>${studentName}</strong> for our SAT Math Crash Course! We're excited to help your student boost their SAT score.</p>
          
          <div style="background: #f7f9fc; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #1a2a5e; margin-top: 0;">Event Details</h3>
            <p><strong>Date:</strong> Saturday, February 28, 2026</p>
            <p><strong>Time:</strong> 9:00 AM - 12:30 PM</p>
            <p><strong>Duration:</strong> 3.5 Hours</p>
            <p><strong>Location:</strong> Meeting Room B @ Owings Mills Library</p>
            <p><strong>Instructors:</strong> Martine & Dr. Dennis</p>
          </div>

          <div style="background: #e8f5e9; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #1a7a4f;">
            <h3 style="color: #1a7a4f; margin-top: 0;">Payment Information - $79</h3>
            <p>Please complete payment using one of the following methods:</p>
            <ul style="list-style: none; padding: 0;">
              <li style="padding: 5px 0;"><strong>Zelle:</strong> dennisyd@gmail.com</li>
              <li style="padding: 5px 0;"><strong>CashApp:</strong> $dennisyd</li>
              <li style="padding: 5px 0;"><strong>PayPal:</strong> dennisyd@alum.mit.edu</li>
            </ul>
          </div>

          <p>If you have any questions, feel free to reply to this email or call us at <strong>(443) 420-7198</strong>.</p>
          <p>We look forward to seeing ${studentName} there!</p>
          <p>Best regards,<br><strong>The Learning Quarters Team</strong></p>
        </div>
        <div style="background: #1a2a5e; padding: 15px; text-align: center; border-radius: 0 0 10px 10px;">
          <p style="color: #ffffff; margin: 0; font-size: 0.85rem;">&copy; 2026 The Learning Quarters. All rights reserved.</p>
          <p style="color: #8fb8e0; margin: 5px 0 0; font-size: 0.8rem;">martine@thelearningquarters.com | (443) 420-7198</p>
        </div>
      </div>
    `,
    replyTo: notifyAddress
  }, "SAT Registration (Confirmation)");

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
