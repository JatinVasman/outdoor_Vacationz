export interface EnquiryPayload {
  name: string;
  email: string;
  phone?: string;
  destination?: string;
  travelDates?: string;
  travellers?: string;
  budget?: string;
  travelStyle?: string;
  accommodation?: string;
  activities?: string[];
  additionalRequirements?: string;
  message?: string;
  source?: string;
}

export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}
