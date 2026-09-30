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
      const errorMsg =
        data?.error ||
        (response.status === 500
          ? 'The enquiry server encountered an error. Please ensure the backend server is running and RESEND_API_KEY is set in server/.env, or email us at contact.outdoorvacationz@gmail.com'
          : `Submission failed (${response.status}). Please contact us directly at contact.outdoorvacationz@gmail.com`);

      return {
        success: false,
        error: errorMsg,
      };
    }

    return {
      success: true,
      message: data?.message || 'Enquiry submitted successfully! Our team will contact you within 24 hours.',
      simulated: data?.data?.simulated,
    };
  } catch (err: unknown) {
    console.error('[Enquiry API Error]', err);
    return {
      success: false,
      error:
        'Cannot connect to the enquiry service (Server unreachable). Please restart your development server with `npm run dev` or email us directly at contact.outdoorvacationz@gmail.com.',
    };
  }
}
