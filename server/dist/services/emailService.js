"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendEnquiryEmail = sendEnquiryEmail;
const resend_1 = require("resend");
const DEFAULT_TO_EMAIL = 'contact.outdoorvacationz@gmail.com';
const DEFAULT_FROM_EMAIL = 'Outdoor Vacationz <onboarding@resend.dev>';
/**
 * Build rich HTML email for travel enquiry notifications.
 */
function buildEnquiryEmailHtml(payload, formattedDate) {
    const sanitize = (str) => (str || '—')
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;');
    const activitiesHtml = payload.activities && payload.activities.length > 0
        ? payload.activities.map((a) => `<span style="display:inline-block;background:#f0fdf4;color:#166534;border:1px solid #bbf7d0;padding:4px 10px;border-radius:999px;font-size:12px;margin:2px 4px 2px 0;">${sanitize(a)}</span>`).join('')
        : '—';
    return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>New Travel Enquiry</title>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; margin: 0; padding: 0; background-color: #f8fafc; color: #1e293b; }
    .wrapper { max-width: 640px; margin: 24px auto; background: #ffffff; border-radius: 12px; overflow: hidden; border: 1px solid #e2e8f0; box-shadow: 0 4px 12px rgba(0,0,0,0.05); }
    .header { background: linear-gradient(135deg, #091e2b 0%, #0d3846 100%); padding: 32px 28px; text-align: left; color: #ffffff; }
    .logo-badge { display: inline-block; font-size: 11px; font-weight: 700; letter-spacing: 1px; text-transform: uppercase; color: #38bdf8; background: rgba(56,189,248,0.12); padding: 4px 10px; border-radius: 6px; margin-bottom: 8px; }
    .header h1 { margin: 0; font-size: 24px; font-weight: 700; color: #ffffff; }
    .header p { margin: 6px 0 0 0; color: #94a3b8; font-size: 14px; }
    .content { padding: 28px; }
    .section-title { font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.8px; color: #64748b; margin: 24px 0 12px 0; border-bottom: 1px solid #f1f5f9; padding-bottom: 6px; }
    .section-title:first-of-type { margin-top: 0; }
    .info-table { width: 100%; border-collapse: collapse; margin-bottom: 8px; }
    .info-table td { padding: 10px 12px; font-size: 14px; border-bottom: 1px solid #f8fafc; vertical-align: top; }
    .info-table td.label { width: 35%; color: #64748b; font-weight: 500; }
    .info-table td.value { width: 65%; color: #0f172a; font-weight: 600; }
    .highlight-card { background: #f0fdfa; border: 1px solid #ccfbf1; border-radius: 8px; padding: 14px 18px; margin: 16px 0; }
    .highlight-card b { color: #0f766e; }
    .message-box { background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 16px; font-size: 14px; line-height: 1.6; color: #334155; white-space: pre-wrap; }
    .actions { margin-top: 28px; padding-top: 20px; border-top: 1px solid #e2e8f0; display: flex; gap: 12px; }
    .btn { display: inline-block; padding: 12px 22px; font-size: 14px; font-weight: 600; text-decoration: none; border-radius: 6px; }
    .btn-primary { background: #0f766e; color: #ffffff !important; }
    .btn-secondary { background: #e2e8f0; color: #1e293b !important; margin-left: 8px; }
    .footer { background: #f8fafc; padding: 20px 28px; border-top: 1px solid #e2e8f0; font-size: 12px; color: #94a3b8; text-align: center; }
  </style>
</head>
<body>
  <div class="wrapper">
    <div class="header">
      <div class="logo-badge">Outdoor Vacationz Booking Desk</div>
      <h1>New Travel Enquiry</h1>
      <p>Received on ${formattedDate} via ${sanitize(payload.source || 'Website Form')}</p>
    </div>

    <div class="content">
      <div class="section-title">Customer Information</div>
      <table class="info-table">
        <tr>
          <td class="label">Full Name</td>
          <td class="value">${sanitize(payload.name)}</td>
        </tr>
        <tr>
          <td class="label">Email Address</td>
          <td class="value"><a href="mailto:${sanitize(payload.email)}" style="color:#0284c7;">${sanitize(payload.email)}</a></td>
        </tr>
        <tr>
          <td class="label">Phone / WhatsApp</td>
          <td class="value">${payload.phone ? `<a href="tel:${sanitize(payload.phone)}" style="color:#0284c7;">${sanitize(payload.phone)}</a>` : '—'}</td>
        </tr>
      </table>

      <div class="section-title">Trip Specifications</div>
      <table class="info-table">
        <tr>
          <td class="label">Destination</td>
          <td class="value" style="color:#0f766e; font-size: 15px;">${sanitize(payload.destination)}</td>
        </tr>
        <tr>
          <td class="label">Travel Dates</td>
          <td class="value">${sanitize(payload.travelDates)}</td>
        </tr>
        <tr>
          <td class="label">Travellers</td>
          <td class="value">${sanitize(payload.travellers)}</td>
        </tr>
        ${payload.budget ? `<tr><td class="label">Budget</td><td class="value">${sanitize(payload.budget)}</td></tr>` : ''}
        ${payload.travelStyle ? `<tr><td class="label">Travel Style</td><td class="value">${sanitize(payload.travelStyle)}</td></tr>` : ''}
        ${payload.accommodation ? `<tr><td class="label">Accommodation</td><td class="value">${sanitize(payload.accommodation)}</td></tr>` : ''}
        ${payload.activities && payload.activities.length ? `<tr><td class="label">Activities</td><td class="value">${activitiesHtml}</td></tr>` : ''}
      </table>

      ${payload.additionalRequirements
        ? `
          <div class="section-title">Special Requirements</div>
          <div class="message-box">${sanitize(payload.additionalRequirements)}</div>
          `
        : ''}

      ${payload.message
        ? `
          <div class="section-title">Message / Itinerary Notes</div>
          <div class="message-box">${sanitize(payload.message)}</div>
          `
        : ''}

      <div class="actions">
        <a href="mailto:${sanitize(payload.email)}?subject=Re:%20Outdoor%20Vacationz%20Trip%20to%20${encodeURIComponent(payload.destination || 'your destination')}" class="btn btn-primary">
          Reply to Customer
        </a>
        ${payload.phone ? `<a href="tel:${sanitize(payload.phone)}" class="btn btn-secondary">Call Customer</a>` : ''}
      </div>
    </div>

    <div class="footer">
      This email was delivered via Outdoor Vacationz Resend Mail Integration.<br/>
      Destination Inbox: <strong>${DEFAULT_TO_EMAIL}</strong>
    </div>
  </div>
</body>
</html>
  `.trim();
}
/**
 * Build plain text version for email clients.
 */
function buildEnquiryEmailText(payload, formattedDate) {
    return `
NEW TRAVEL ENQUIRY - OUTDOOR VACATIONZ
==================================================
Date: ${formattedDate}
Source: ${payload.source || 'Website Form'}

CUSTOMER DETAILS:
- Name: ${payload.name}
- Email: ${payload.email}
- Phone: ${payload.phone || 'N/A'}

TRIP SPECIFICATIONS:
- Destination: ${payload.destination || 'N/A'}
- Travel Dates: ${payload.travelDates || 'N/A'}
- Travellers: ${payload.travellers || 'N/A'}
${payload.budget ? `- Budget: ${payload.budget}\n` : ''}${payload.travelStyle ? `- Travel Style: ${payload.travelStyle}\n` : ''}${payload.accommodation ? `- Accommodation: ${payload.accommodation}\n` : ''}${payload.activities && payload.activities.length ? `- Activities: ${payload.activities.join(', ')}\n` : ''}
${payload.additionalRequirements ? `\nADDITIONAL REQUIREMENTS:\n${payload.additionalRequirements}\n` : ''}
${payload.message ? `\nCUSTOMER MESSAGE:\n${payload.message}\n` : ''}
==================================================
Outdoor Vacationz Travel Management
Sent to: ${process.env.RESEND_TO_EMAIL || DEFAULT_TO_EMAIL}
Reply to: ${payload.email}
  `.trim();
}
/**
 * Send enquiry notification email using Resend.
 */
async function sendEnquiryEmail(payload) {
    const apiKey = process.env.RESEND_API_KEY?.trim();
    const toEmail = process.env.RESEND_TO_EMAIL?.trim() || DEFAULT_TO_EMAIL;
    const fromEmail = process.env.RESEND_FROM_EMAIL?.trim() || DEFAULT_FROM_EMAIL;
    const now = new Date();
    const formattedDate = now.toLocaleString('en-IN', {
        timeZone: 'Asia/Kolkata',
        dateStyle: 'medium',
        timeStyle: 'short',
    });
    const subject = `✨ New Travel Enquiry from ${payload.name}${payload.destination ? ` [${payload.destination}]` : ''} - Outdoor Vacationz`;
    const html = buildEnquiryEmailHtml(payload, formattedDate);
    const text = buildEnquiryEmailText(payload, formattedDate);
    // If Resend API key is missing or default placeholder, log and simulate cleanly
    if (!apiKey || apiKey === 're_your_api_key_here' || apiKey.startsWith('re_placeholder')) {
        console.warn('\n[Resend Service] ℹ️ RESEND_API_KEY not configured or using placeholder.', '\n  To enable live email delivery, add your Resend API key to `server/.env`:' +
            '\n  RESEND_API_KEY=re_xxxxxxxxxxxx' +
            `\n  Recipient: ${toEmail}` +
            `\n  From: ${fromEmail}` +
            `\n  Enquiry from: ${payload.name} (${payload.email})` +
            `\n  Destination: ${payload.destination || 'Unspecified'}\n`);
        return {
            success: true,
            simulated: true,
            id: `simulated_${Date.now()}`,
            message: 'Simulated email delivery (RESEND_API_KEY pending).',
        };
    }
    try {
        const resend = new resend_1.Resend(apiKey);
        const { data, error } = await resend.emails.send({
            from: fromEmail,
            to: [toEmail],
            replyTo: payload.email,
            subject,
            html,
            text,
        });
        if (error) {
            console.error('[Resend Service Error]', error);
            return {
                success: false,
                error: error.message || 'Failed to send email via Resend.',
            };
        }
        console.log(`[Resend Service] ✅ Email delivered to ${toEmail}. Resend ID: ${data?.id}`);
        return {
            success: true,
            id: data?.id,
            message: `Enquiry email sent to ${toEmail}`,
        };
    }
    catch (err) {
        const errorMessage = err instanceof Error ? err.message : String(err);
        console.error('[Resend Service Exception]', errorMessage);
        return {
            success: false,
            error: errorMessage,
        };
    }
}
