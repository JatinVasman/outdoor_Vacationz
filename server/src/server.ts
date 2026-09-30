import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import { enquiryRouter } from './routes/enquiries';

const app = express();
const PORT = process.env.PORT || 3001;

// CORS configuration
const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:3000',
  'http://localhost:4173',
  process.env.CLIENT_URL,
].filter(Boolean) as string[];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin) || process.env.NODE_ENV !== 'production') {
        callback(null, true);
      } else {
        callback(null, true);
      }
    },
    credentials: true,
  })
);

app.use(express.json());

// Routes
app.use('/api/enquiries', enquiryRouter);

// Health check
app.get('/api/health', (_req, res) => {
  res.json({
    status: 'ok',
    service: 'Outdoor Vacationz API',
    resend: {
      recipient: process.env.RESEND_TO_EMAIL || 'contact.outdoorvacationz@gmail.com',
      configured: Boolean(process.env.RESEND_API_KEY && !process.env.RESEND_API_KEY.includes('placeholder')),
    },
    timestamp: new Date().toISOString(),
  });
});

// Start
app.listen(PORT, () => {
  console.log(`🌍 Outdoor Vacationz API running on http://localhost:${PORT}`);
  console.log(`✉️  Resend Mail System active (Target: ${process.env.RESEND_TO_EMAIL || 'contact.outdoorvacationz@gmail.com'})`);
  if (!process.env.RESEND_API_KEY || process.env.RESEND_API_KEY.includes('placeholder')) {
    console.log(`⚠️  RESEND_API_KEY not configured. Enquiries will be simulated and logged in console.`);
  } else {
    console.log(`🔑 Resend API Key detected.`);
  }
});

export default app;
