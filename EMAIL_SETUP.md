# Email Setup Instructions

To enable email notifications for consultation requests and SAT registrations, you need to configure environment variables on Render.

## Required Environment Variables

Go to your Render dashboard > your backend service > Environment tab and add:

1. **EMAIL_USER** - Your Gmail address (e.g., `martine@thelearningquarters.com` or a Gmail account)
2. **EMAIL_PASS** - Your Gmail app-specific password (NOT your regular password)
3. **NOTIFICATION_EMAIL** - Email address where you want to receive notifications (e.g., `martine@thelearningquarters.com`)

## How to Get a Gmail App-Specific Password

If using Gmail:

1. Go to your Google Account settings
2. Enable 2-Factor Authentication (if not already enabled)
3. Go to Security > 2-Step Verification > App passwords
4. Generate a new app password for "Mail"
5. Copy the 16-character password (no spaces)
6. Use this as your `EMAIL_PASS` value in Render

## Alternative: Using a Different Email Service

If you want to use a different email service, edit `backend/server.js` line 11:

- For Outlook: `service: 'outlook'`
- For Yahoo: `service: 'yahoo'`
- For custom SMTP: Replace the entire transporter config with custom SMTP settings

## Testing

After setting environment variables:

1. Redeploy your backend on Render
2. Test by submitting a consultation request or SAT registration
3. Check the Render logs for "Email notification sent successfully" or any errors
4. Check your NOTIFICATION_EMAIL inbox

## Current Email Features

- **Consultation Requests** (from homepage) → sends email to NOTIFICATION_EMAIL
- **SAT Registration** (from /sat-registration page) → sends email to NOTIFICATION_EMAIL with full registration details including location and payment info
