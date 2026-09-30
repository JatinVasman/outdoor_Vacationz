# Outdoor Vacationz

Curated travel and tour booking platform with automated Resend email delivery.

## Official Contact Email
- **Email:** `contact.outdoorvacationz@gmail.com`
- **Phone:** `+91 76699 31399`

---

## Getting Started

### 1. Installation

```bash
# Install root dependencies
npm install

# Install client and server dependencies
npm --prefix client install
npm --prefix server install
```

### 2. Configure Resend Mail System

Create or edit `server/.env` (a template is provided in `server/.env.example`):

```env
PORT=3001
CLIENT_URL=http://localhost:5173

# Your Resend API key (get one from https://resend.com/api-keys)
RESEND_API_KEY=re_your_api_key_here

# Sender address (use onboarding@resend.dev for testing or your verified domain in production)
RESEND_FROM_EMAIL="Outdoor Vacationz <onboarding@resend.dev>"

# Destination where all enquiries from website forms are delivered
RESEND_TO_EMAIL=contact.outdoorvacationz@gmail.com
```

> **Note:** If `RESEND_API_KEY` is not provided, the system runs in safe simulation mode, logging enquiries cleanly to the console without interrupting user submissions.

### 3. Running the Application

```bash
# Run both Frontend (http://localhost:5173) and Backend API (http://localhost:3001) concurrently:
npm run dev

# Or run separately:
npm run dev:client   # Frontend only
npm run dev:server   # Backend only
```

### 4. Build

```bash
# Build frontend
npm run build

# Build both frontend and backend
npm run build:all
```

---

## Email & Enquiry Flow

1. Customer submits an enquiry from the **Home Page Contact Section**, **Contact Page (`/contact`)**, or **Plan Your Trip (`/plan-your-trip`)**.
2. Frontend submits via `submitEnquiry` (`/api/enquiries`).
3. Resend dispatches a styled HTML email with full customer specifications directly to `contact.outdoorvacationz@gmail.com`.
4. The email has `replyTo` configured to the customer's email, so clicking **Reply** in Gmail directly answers the traveller.

---

## Project Structure

- `client/` — React frontend (Vite, TypeScript, Vanilla CSS)
- `server/` — Express backend API with Resend integration (`src/services/emailService.ts`)
- `vercel.json` — Vercel multi-service configuration routing `/(.*)` to `client` and `/api/(.*)` to `server`
