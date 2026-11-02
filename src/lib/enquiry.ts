import { z } from "zod";

/** Shared by the client form and the API route so both validate identically. */
export const projectTypes = [
  "Residential interior",
  "Hospitality",
  "Commercial or workplace",
  "Renovation concept",
  "Something else",
] as const;

const noControlCharacters = /^[^\u0000-\u001f\u007f<>]*$/;

export const enquirySchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Please enter your name.")
    .max(100, "Please keep your name under 100 characters.")
    .regex(noControlCharacters, "Please remove any special characters from your name."),
  email: z
    .string()
    .trim()
    .min(1, "Please enter your email address.")
    .max(254, "Please enter a shorter email address.")
    .pipe(z.email("Please enter a valid email address.")),
  phone: z
    .string()
    .trim()
    .max(30, "Please keep the phone number under 30 characters.")
    .regex(/^[+()\d\s.-]*$/, "Please use digits, spaces and + ( ) - only.")
    .optional(),
  projectType: z.enum(projectTypes, { error: "Please choose a project type." }),
  message: z
    .string()
    .trim()
    .min(20, "Please share a little more detail — at least 20 characters.")
    .max(4000, "Please keep your message under 4,000 characters."),
  consent: z.boolean().refine((value) => value === true, {
    error: "Please confirm you are happy to be contacted about this enquiry.",
  }),
});

export type EnquiryInput = z.input<typeof enquirySchema>;
export type Enquiry = z.output<typeof enquirySchema>;

/** Anti-spam fields sent alongside the enquiry; never shown to people. */
export const HONEYPOT_FIELD = "company_website";
export const MIN_FILL_TIME_MS = 3000;

export type EnquiryResponse =
  | { ok: true }
  | {
      ok: false;
      code:
        | "not_configured"
        | "invalid"
        | "rejected"
        | "too_fast"
        | "rate_limited"
        | "delivery_failed"
        | "bad_request";
      message: string;
      fieldErrors?: Partial<Record<keyof EnquiryInput, string[]>>;
    };
