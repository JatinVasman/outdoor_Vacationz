export interface EnquiryPayload {
  name: string;
  email: string;
  phone?: string;
  destination?: string;
  travelDates?: string;
  travellers?: string;
  message?: string;
}

export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}
