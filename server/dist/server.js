"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const dotenv_1 = __importDefault(require("dotenv"));
// Load environment variables from server/.env, parent root .env, or cwd
dotenv_1.default.config({ path: path_1.default.resolve(process.cwd(), 'server/.env') });
dotenv_1.default.config({ path: path_1.default.resolve(__dirname, '../.env') });
dotenv_1.default.config();
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const enquiries_1 = require("./routes/enquiries");
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3001;
// CORS configuration
const allowedOrigins = [
    'http://localhost:5173',
    'http://localhost:3000',
    'http://localhost:4173',
    process.env.CLIENT_URL,
].filter(Boolean);
app.use((0, cors_1.default)({
    origin: (origin, callback) => {
        if (!origin || allowedOrigins.includes(origin) || process.env.NODE_ENV !== 'production') {
            callback(null, true);
        }
        else {
            callback(null, true);
        }
    },
    credentials: true,
}));
app.use(express_1.default.json());
// Routes - support both /api prefix and root prefix
app.use('/api/enquiries', enquiries_1.enquiryRouter);
app.use('/enquiries', enquiries_1.enquiryRouter);
// Health check
const healthCheck = (_req, res) => {
    res.json({
        status: 'ok',
        service: 'Outdoor Vacationz API',
        resend: {
            recipient: process.env.RESEND_TO_EMAIL || 'contact.outdoorvacationz@gmail.com',
            configured: Boolean(process.env.RESEND_API_KEY && !process.env.RESEND_API_KEY.includes('placeholder')),
        },
        timestamp: new Date().toISOString(),
    });
};
app.get('/api/health', healthCheck);
app.get('/health', healthCheck);
// Start local server when not in Vercel serverless environment
if (!process.env.VERCEL) {
    app.listen(PORT, () => {
        console.log(`🌍 Outdoor Vacationz API running on http://localhost:${PORT}`);
        console.log(`✉️  Resend Mail System active (Target: ${process.env.RESEND_TO_EMAIL || 'contact.outdoorvacationz@gmail.com'})`);
        if (!process.env.RESEND_API_KEY || process.env.RESEND_API_KEY.includes('placeholder')) {
            console.log(`⚠️  RESEND_API_KEY not configured. Enquiries will be simulated and logged in console.`);
        }
        else {
            console.log(`🔑 Resend API Key detected.`);
        }
    });
}
// Export app instance for Vercel Services Express runtime
// @ts-ignore
module.exports = app;
exports.default = app;
