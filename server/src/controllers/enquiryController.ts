import type { Request, Response } from 'express';
import type { EnquiryPayload, ApiResponse } from '../types';
import { sendEnquiryEmail } from '../services/emailService';

export async function createEnquiry(req: Request, res: Response): Promise<void> {
  try {
    const payload = req.body as EnquiryPayload;

    if (!payload || !payload.name?.trim() || !payload.email?.trim() || !payload.phone?.trim()) {
      const response: ApiResponse = {
        success: false,
        error: 'Name, email, and phone number are required.',
      };
      res.status(400).json(response);
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(payload.email.trim())) {
      const response: ApiResponse = {
        success: false,
        error: 'A valid email address is required.',
      };
      res.status(400).json(response);
      return;
    }

    const sanitizedPayload: EnquiryPayload = {
      ...payload,
      destination: payload.destination?.trim() || 'Flexible / To be decided',
      travelDates: payload.travelDates?.trim() || 'Flexible',
      travellers: payload.travellers?.trim() || 'Flexible / 2 Adults',
    };

    console.log('[Enquiry Received]', {
      name: sanitizedPayload.name,
      email: sanitizedPayload.email,
      phone: sanitizedPayload.phone,
      destination: sanitizedPayload.destination,
      source: sanitizedPayload.source || 'unspecified',
      timestamp: new Date().toISOString(),
    });

    const result = await sendEnquiryEmail(sanitizedPayload);

    if (!result.success) {
      console.error('[Enquiry Dispatch Failed]', result.error);
      const response: ApiResponse = {
        success: false,
        error:
          result.error ||
          'Failed to dispatch enquiry. Please email us directly at contact.outdoorvacationz@gmail.com',
      };
      res.status(500).json(response);
      return;
    }

    const response: ApiResponse<{ id?: string; simulated?: boolean }> = {
      success: true,
      message: 'Enquiry received! Our travel team will contact you within 24 hours.',
      data: {
        id: result.id,
        simulated: result.simulated,
      },
    };
    res.status(201).json(response);
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Unknown server error';
    console.error('[createEnquiry Controller Error]', message);
    res.status(500).json({
      success: false,
      error: 'An unexpected error occurred while processing your enquiry. Please reach out to contact.outdoorvacationz@gmail.com',
    });
  }
}

export function getResendStatus(_req: Request, res: Response): void {
  const hasKey = Boolean(process.env.RESEND_API_KEY && !process.env.RESEND_API_KEY.includes('placeholder'));
  res.json({
    status: 'ok',
    resendConfigured: hasKey,
    destinationEmail: process.env.RESEND_TO_EMAIL || 'contact.outdoorvacationz@gmail.com',
    fromEmail: process.env.RESEND_FROM_EMAIL || 'Outdoor Vacationz <onboarding@resend.dev>',
    timestamp: new Date().toISOString(),
  });
}
