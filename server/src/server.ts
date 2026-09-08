import express from 'express';
import cors from 'cors';
import { enquiryRouter } from './routes/enquiries';

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors({ origin: 'http://localhost:5173' }));
app.use(express.json());

// Routes
app.use('/api/enquiries', enquiryRouter);

// Health check
app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', service: 'Outdoor Vacationz API', timestamp: new Date().toISOString() });
});

// Start
app.listen(PORT, () => {
  console.log(`🌍 Outdoor Vacationz API running on http://localhost:${PORT}`);
});

export default app;
