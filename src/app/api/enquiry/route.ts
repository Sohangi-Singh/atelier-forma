import { NextResponse } from "next/server";
import { z } from "zod";
import { site } from "@/content/site";
import {
  enquirySchema,
  HONEYPOT_FIELD,
  MIN_FILL_TIME_MS,
  type Enquiry,
  type EnquiryResponse,
} from "@/lib/enquiry";
import { getEnquiryConfig } from "@/lib/enquiry-config";

const MAX_BODY_BYTES = 16_000;
const RATE_WINDOW_MS = 10 * 60_000;
const RATE_LIMIT = 5;

// Best-effort, per-instance limiter. Counts only; no personal data is kept.
const recentRequests = new Map<string, number[]>();

function respond(status: number, body: EnquiryResponse) {
  return NextResponse.json(body, { status, headers: { "Cache-Control": "no-store" } });
}

function isRateLimited(key: string, now: number) {
  const recent = (recentRequests.get(key) ?? []).filter((time) => now - time < RATE_WINDOW_MS);
  recent.push(now);
  recentRequests.set(key, recent);
  if (recentRequests.size > 5_000) recentRequests.clear();
  return recent.length > RATE_LIMIT;
}

function emailText(enquiry: Enquiry) {
  return [
    `New enquiry via the ${site.name} website`,
    "",
    `Name: ${enquiry.name}`,
    `Email: ${enquiry.email}`,
    `Phone: ${enquiry.phone || "Not provided"}`,
    `Project type: ${enquiry.projectType}`,
    "",
    "Message:",
    enquiry.message,
    "",
    "The sender agreed to be contacted about this enquiry.",
  ].join("\n");
}

export async function POST(request: Request) {
  const origin = request.headers.get("origin");
  const host = request.headers.get("x-forwarded-host") ?? request.headers.get("host");
  if (origin && host) {
    let originHost: string | null = null;
    try {
      originHost = new URL(origin).host;
    } catch {}
    if (originHost !== host) {
      return respond(403, {
        ok: false,
        code: "bad_request",
        message: "Enquiries can only be sent from this website.",
      });
    }
  }

  if (!request.headers.get("content-type")?.includes("application/json")) {
    return respond(415, { ok: false, code: "bad_request", message: "Unsupported request format." });
  }

  const raw = await request.text();
  if (raw.length > MAX_BODY_BYTES) {
    return respond(413, { ok: false, code: "bad_request", message: "This enquiry is too long to send." });
  }

  let payload: Record<string, unknown>;
  try {
    const parsed: unknown = JSON.parse(raw);
    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) throw new Error();
    payload = parsed as Record<string, unknown>;
  } catch {
    return respond(400, { ok: false, code: "bad_request", message: "The enquiry could not be read." });
  }

  const { [HONEYPOT_FIELD]: honeypot, fillTimeMs, ...fields } = payload;

  if (typeof honeypot === "string" && honeypot.trim() !== "") {
    return respond(400, {
      ok: false,
      code: "rejected",
      message: "This submission could not be accepted.",
    });
  }

  if (typeof fillTimeMs !== "number" || fillTimeMs < MIN_FILL_TIME_MS) {
    return respond(400, {
      ok: false,
      code: "too_fast",
      message: "That was quicker than expected. Please review your message and send it again.",
    });
  }

  const forwardedFor = request.headers.get("x-forwarded-for");
  const clientKey = forwardedFor?.split(",")[0]?.trim() || request.headers.get("x-real-ip") || "anonymous";
  if (isRateLimited(clientKey, Date.now())) {
    return respond(429, {
      ok: false,
      code: "rate_limited",
      message: "Too many enquiries have been sent recently. Please wait a few minutes and try again.",
    });
  }

  const result = enquirySchema.safeParse(fields);
  if (!result.success) {
    return respond(422, {
      ok: false,
      code: "invalid",
      message: "Some details need attention. Please check the highlighted fields.",
      fieldErrors: z.flattenError(result.error).fieldErrors,
    });
  }

  const config = getEnquiryConfig();
  if (!config) {
    return respond(503, {
      ok: false,
      code: "not_configured",
      message:
        "Online enquiries are not configured for this demonstration, so your message has not been delivered.",
    });
  }

  const enquiry = result.data;
  const subject = `New enquiry — ${enquiry.projectType} — ${enquiry.name}`.replace(/\s+/g, " ");

  try {
    const delivery = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${config.apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: config.from,
        to: [config.to],
        reply_to: enquiry.email,
        subject,
        text: emailText(enquiry),
      }),
      signal: AbortSignal.timeout(10_000),
    });

    if (!delivery.ok) {
      // Log the provider status only — never the enquiry contents.
      console.error(`[enquiry] Email provider responded with status ${delivery.status}`);
      return respond(502, {
        ok: false,
        code: "delivery_failed",
        message: "Your enquiry could not be delivered just now. Please try again later.",
      });
    }
  } catch {
    console.error("[enquiry] Email provider request failed or timed out");
    return respond(502, {
      ok: false,
      code: "delivery_failed",
      message: "Your enquiry could not be delivered just now. Please try again later.",
    });
  }

  return respond(200, { ok: true });
}
