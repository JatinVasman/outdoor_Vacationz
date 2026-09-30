module.exports = (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const hasKey = Boolean(
    process.env.RESEND_API_KEY && !process.env.RESEND_API_KEY.includes('placeholder')
  );

  return res.status(200).json({
    status: 'ok',
    service: 'Outdoor Vacationz API',
    resend: {
      recipient: process.env.RESEND_TO_EMAIL || 'contact.outdoorvacationz@gmail.com',
      configured: hasKey,
    },
    timestamp: new Date().toISOString(),
  });
};
