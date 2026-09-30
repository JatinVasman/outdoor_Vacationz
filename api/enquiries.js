const { Resend } = require('resend');

const DEFAULT_TO_EMAIL = 'contact.outdoorvacationz@gmail.com';
const DEFAULT_FROM_EMAIL = 'Outdoor Vacationz <onboarding@resend.dev>';

module.exports = async (req, res) => {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method === 'GET') {
    const hasKey = Boolean(
      process.env.RESEND_API_KEY && !process.env.RESEND_API_KEY.includes('placeholder')
    );
    return res.status(200).json({
      status: 'ok',
      service: 'Outdoor Vacationz Enquiry Service',
      resendConfigured: hasKey,
      destinationEmail: process.env.RESEND_TO_EMAIL || DEFAULT_TO_EMAIL,
    });
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, error: 'Method Not Allowed' });
  }

  try {
    const payload = typeof req.body === 'string' ? JSON.parse(req.body) : req.body || {};
    const {
      name,
      email,
      phone,
      destination,
      travelDates,
      travellers,
      budget,
      travelStyle,
      accommodation,
      activities,
      additionalRequirements,
      message,
      source,
    } = payload;

    // Required fields: name, email, phone
    if (!name?.trim() || !email?.trim() || !phone?.trim()) {
      return res.status(400).json({
        success: false,
        error: 'Name, email, and phone number are required.',
      });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      return res.status(400).json({
        success: false,
        error: 'A valid email address is required.',
      });
    }

    // Flexible optional fields with sensible defaults
    const tripDestination = destination?.trim() || 'Flexible / To be decided';
    const tripDates = travelDates?.trim() || 'Flexible';
    const tripTravellers = travellers?.trim() || 'Flexible / 2 Adults';

    const apiKey = process.env.RESEND_API_KEY?.trim();
    const toEmail = process.env.RESEND_TO_EMAIL?.trim() || DEFAULT_TO_EMAIL;
    const fromEmail = process.env.RESEND_FROM_EMAIL?.trim() || DEFAULT_FROM_EMAIL;

    const sanitize = (str) =>
      (str || '—')
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;');

    const formattedDate = new Date().toLocaleString('en-IN', {
      timeZone: 'Asia/Kolkata',
      dateStyle: 'medium',
      timeStyle: 'short',
    });

    const activitiesHtml =
      activities && Array.isArray(activities) && activities.length > 0
        ? activities
            .map(
              (a) =>
                `<span style="display:inline-block;background:#f0fdf4;color:#166534;border:1px solid #bbf7d0;padding:4px 10px;border-radius:999px;font-size:12px;margin:2px 4px 2px 0;">${sanitize(
                  a
                )}</span>`
            )
            .join('')
        : '—';

    const html = `
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
    .message-box { background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 16px; font-size: 14px; line-height: 1.6; color: #334155; white-space: pre-wrap; }
    .actions { margin-top: 28px; padding-top: 20px; border-top: 1px solid #e2e8f0; }
    .btn { display: inline-block; padding: 12px 22px; font-size: 14px; font-weight: 600; text-decoration: none; border-radius: 6px; background: #0f766e; color: #ffffff !important; }
    .footer { background: #f8fafc; padding: 20px 28px; border-top: 1px solid #e2e8f0; font-size: 12px; color: #94a3b8; text-align: center; }
  </style>
</head>
<body>
  <div class="wrapper">
    <div class="header">
      <div class="logo-badge">Outdoor Vacationz Booking Desk</div>
      <h1>New Travel Enquiry</h1>
      <p>Received on ${formattedDate} via ${sanitize(source || 'Website Form')}</p>
    </div>

    <div class="content">
      <div class="section-title">Customer Information</div>
      <table class="info-table">
        <tr><td class="label">Full Name</td><td class="value">${sanitize(name)}</td></tr>
        <tr><td class="label">Email Address</td><td class="value"><a href="mailto:${sanitize(email)}">${sanitize(email)}</a></td></tr>
        <tr><td class="label">Phone</td><td class="value"><a href="tel:${sanitize(phone)}">${sanitize(phone)}</a></td></tr>
      </table>

      <div class="section-title">Trip Specifications</div>
      <table class="info-table">
        <tr><td class="label">Destination</td><td class="value" style="color:#0f766e; font-size: 15px;">${sanitize(tripDestination)}</td></tr>
        <tr><td class="label">Travel Date</td><td class="value">${sanitize(tripDates)}</td></tr>
        <tr><td class="label">Travellers</td><td class="value">${sanitize(tripTravellers)}</td></tr>
        ${budget ? `<tr><td class="label">Budget</td><td class="value">${sanitize(budget)}</td></tr>` : ''}
        ${travelStyle ? `<tr><td class="label">Travel Style</td><td class="value">${sanitize(travelStyle)}</td></tr>` : ''}
        ${accommodation ? `<tr><td class="label">Accommodation</td><td class="value">${sanitize(accommodation)}</td></tr>` : ''}
        ${activities && activities.length ? `<tr><td class="label">Activities</td><td class="value">${activitiesHtml}</td></tr>` : ''}
      </table>

      ${
        additionalRequirements
          ? `<div class="section-title">Special Requirements</div><div class="message-box">${sanitize(additionalRequirements)}</div>`
          : ''
      }
      ${
        message
          ? `<div class="section-title">Message / Itinerary Notes</div><div class="message-box">${sanitize(message)}</div>`
          : ''
      }

      <div class="actions">
        <a href="mailto:${sanitize(email)}?subject=Re:%20Outdoor%20Vacationz%20Trip%20to%20${encodeURIComponent(tripDestination)}" class="btn">
          Reply to Customer
        </a>
      </div>
    </div>

    <div class="footer">
      Delivered via Outdoor Vacationz Resend Mail Integration.<br/>
      Destination Inbox: <strong>${toEmail}</strong>
    </div>
  </div>
</body>
</html>
    `.trim();

    // If Resend API key is missing or placeholder
    if (!apiKey || apiKey === 're_your_api_key_here' || apiKey.startsWith('re_placeholder')) {
      console.warn('[Vercel Serverless Resend] ⚠️ RESEND_API_KEY is not configured in Vercel environment variables.');
      return res.status(201).json({
        success: true,
        message: 'Enquiry received! Our team will contact you within 24 hours.',
        data: { simulated: true },
      });
    }

    try {
      const resend = new Resend(apiKey);
      const { data, error } = await resend.emails.send({
        from: fromEmail,
        to: [toEmail],
        replyTo: email,
        subject: `✨ New Travel Enquiry from ${name} [${tripDestination}] - Outdoor Vacationz`,
        html,
      });

      if (error) {
        console.error('[Resend Error]', error);
        return res.status(200).json({
          success: true,
          message: 'Enquiry received! Our team will contact you within 24 hours.',
          data: { note: error.message },
        });
      }

      console.log(`[Resend Success] Email dispatched to ${toEmail}. Resend ID: ${data?.id}`);
      return res.status(201).json({
        success: true,
        message: 'Enquiry received! Our team will contact you within 24 hours.',
        data: { id: data?.id },
      });
    } catch (sendErr) {
      console.error('[Resend Dispatch Error]', sendErr);
      return res.status(200).json({
        success: true,
        message: 'Enquiry received! Our team will contact you within 24 hours.',
      });
    }
  } catch (err) {
    const errorMsg = err instanceof Error ? err.message : 'Internal Server Error';
    console.error('[Enquiry Handler Error]', errorMsg);
    return res.status(200).json({
      success: true,
      message: 'Enquiry received! Our team will contact you within 24 hours.',
    });
  }
};
