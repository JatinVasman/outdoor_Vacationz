import type { Request, Response } from 'express';
import type { EnquiryPayload, ApiResponse } from '../types';

export function createEnquiry(req: Request, res: Response): void {
  const payload = req.body as EnquiryPayload;

  if (!payload.name || !payload.email) {
    const response: ApiResponse = {
      success: false,
      error: 'Name and email are required.',
    };
    res.status(400).json(response);
    return;
  }

  // TODO: Save to database / send email notification
  console.log('[Enquiry received]', {
    name: payload.name,
    email: payload.email,
    destination: payload.destination,
    timestamp: new Date().toISOString(),
  });

  const response: ApiResponse = {
    success: true,
    message: 'Enquiry received. Our team will contact you within 24 hours.',
  };
  res.status(201).json(response);
}
