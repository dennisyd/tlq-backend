# Email Notification Setup

Your backend is now configured to send email notifications when someone submits a consultation request!

## Environment Variables Needed

You need to add these environment variables to your Render backend:

### Required Variables:

1. **EMAIL_USER** - Your Gmail email address (e.g., `martine@thelearningquarters.com` or any Gmail account)
2. **EMAIL_PASS** - Your Gmail app-specific password (NOT your regular password)
3. **NOTIFICATION_EMAIL** (Optional) - Where to receive notifications (defaults to EMAIL_USER if not set)

---

## Step-by-Step Setup

### 1. Get a Gmail App Password

If using Gmail, you need an "App Password" (more secure than using your regular password):

1. Go to your Google Account: https://myaccount.google.com/
2. Click on **Security** in the left sidebar
3. Enable **2-Step Verification** (if not already enabled)
4. After enabling 2FA, go back to Security
5. Under "Signing in to Google", click **App passwords**
6. Select **Mail** and **Other (Custom name)**, name it "TLQ Backend"
7. Click **Generate**
8. Copy the 16-character password (e.g., `abcd efgh ijkl mnop`)

### 2. Add Environment Variables to Render

1. Go to your Render dashboard: https://dashboard.render.com/
2. Click on your `tlq-backend` service
3. Click on **Environment** in the left sidebar
4. Click **Add Environment Variable**
5. Add each variable:

   ```
   EMAIL_USER = your-email@gmail.com
   EMAIL_PASS = your-16-char-app-password
   NOTIFICATION_EMAIL = martine@thelearningquarters.com
   ```

6. Click **Save Changes**
7. Render will automatically redeploy your backend

---

## Alternative Email Services

If you don't want to use Gmail, you can use other services:

### Outlook/Hotmail
```javascript
service: 'outlook'
```

### Yahoo
```javascript
service: 'yahoo'
```

### Custom SMTP
If you have a custom email server:

```javascript
host: 'smtp.yourdomain.com',
port: 587,
secure: false,
auth: {
  user: process.env.EMAIL_USER,
  pass: process.env.EMAIL_PASS
}
```

---

## What Happens Now

When someone submits the consultation form:

1. ✅ Form data is validated
2. ✅ Email notification is sent to your inbox with:
   - Parent/Guardian Name
   - Email address (set as reply-to, so you can reply directly)
   - Phone number
   - Student Grade
   - Subject Focus
   - Optional message
   - Timestamp
3. ✅ Form submitter sees success message
4. ✅ Even if email fails, the form submission succeeds (error is logged but doesn't break the user experience)

---

## Testing

After adding the environment variables to Render:

1. Go to your website
2. Fill out the consultation form
3. Submit it
4. Check your email inbox
5. You should receive a notification email!

---

## Troubleshooting

- **Not receiving emails?** Check your spam/junk folder
- **Authentication error?** Make sure you're using an App Password, not your regular password
- **Still not working?** Check the Render logs for error messages

