/**
 * Server-only: reads delivery credentials at request time. Enquiries are only
 * accepted when every value is present; otherwise the form says so plainly.
 */
export function getEnquiryConfig() {
  const apiKey = process.env.RESEND_API_KEY?.trim();
  const to = process.env.ENQUIRY_TO_EMAIL?.trim();
  const from = process.env.ENQUIRY_FROM_EMAIL?.trim();

  if (!apiKey || !to || !from) return null;
  return { apiKey, to, from };
}
