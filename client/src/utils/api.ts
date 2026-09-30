import type { EnquiryPayload } from '../types';

export interface SubmitEnquiryResult {
  success: boolean;
  message?: string;
  error?: string;
  simulated?: boolean;
}

/**
 * Submit travel enquiry to the backend Resend-powered API endpoint.
 */
export async function submitEnquiry(payload: EnquiryPayload): Promise<SubmitEnquiryResult> {
  try {
    const response = await fetch('/api/enquiries', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    const data = await response.json().catch(() => null);

    if (!response.ok) {
      return {
        success: false,
        error:
          data?.error ||
          `Submission failed (${response.status}). Please email us directly at contact.outdoorvacationz@gmail.com`,
      };
    }

    return {
      success: true,
      message: data?.message || 'Enquiry submitted successfully! Our team will contact you within 24 hours.',
      simulated: data?.data?.simulated,
    };
  } catch (err: unknown) {
    console.error('[Enquiry API Error]', err);
    // If backend server is unreachable (e.g. only frontend is running)
    return {
      success: false,
      error:
        'Unable to connect to the enquiry service. Please email your trip details directly to contact.outdoorvacationz@gmail.com or call +91 76699 31399.',
    };
  }
}
