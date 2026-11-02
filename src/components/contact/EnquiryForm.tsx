"use client";

import { useEffect, useRef, useState } from "react";
import { useForm, type FieldError } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight, Check, CircleAlert, Info, LoaderCircle } from "lucide-react";
import {
  enquirySchema,
  HONEYPOT_FIELD,
  projectTypes,
  type EnquiryInput,
  type EnquiryResponse,
} from "@/lib/enquiry";
import { cn } from "@/lib/cn";

type Status =
  | { kind: "idle" }
  | { kind: "submitting" }
  | { kind: "sent" }
  | { kind: "not_configured"; message: string }
  | { kind: "error"; message: string };

const fieldClass =
  "mt-2 block w-full border-0 border-b border-ink/25 bg-transparent px-0 py-3 text-[1rem] text-ink placeholder:text-stone/70 transition-colors duration-300 focus:border-ink focus:ring-0 focus:outline-none aria-[invalid=true]:border-error";

function FieldMessage({ id, error }: { id: string; error?: FieldError }) {
  if (!error?.message) return null;
  return (
    <p id={id} className="mt-2 flex items-start gap-2 text-[0.8125rem] text-error">
      <CircleAlert aria-hidden="true" className="mt-0.5 size-3.5 shrink-0" strokeWidth={1.75} />
      {error.message}
    </p>
  );
}

/**
 * `configured` comes from the server at request time:
 * true → delivery is set up; false → it is not; null → still being checked.
 */
export function EnquiryForm({ configured }: { configured: boolean | null }) {
  const [status, setStatus] = useState<Status>({ kind: "idle" });
  const honeypotRef = useRef<HTMLInputElement>(null);
  const mountedAt = useRef<number | null>(null);
  const statusRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    mountedAt.current = performance.now();
  }, []);

  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors },
  } = useForm<EnquiryInput>({
    resolver: zodResolver(enquirySchema),
    mode: "onTouched",
    defaultValues: { name: "", email: "", phone: "", message: "", consent: false },
  });

  const submitting = status.kind === "submitting";

  async function onSubmit(values: EnquiryInput) {
    setStatus({ kind: "submitting" });
    const fillTimeMs =
      mountedAt.current === null ? 0 : Math.round(performance.now() - mountedAt.current);

    let next: Status;
    try {
      const response = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...values,
          [HONEYPOT_FIELD]: honeypotRef.current?.value ?? "",
          fillTimeMs,
        }),
      });
      const data = (await response.json().catch(() => null)) as EnquiryResponse | null;

      if (response.ok && data?.ok === true) {
        next = { kind: "sent" };
        reset();
      } else if (data && !data.ok && data.code === "not_configured") {
        next = { kind: "not_configured", message: data.message };
      } else {
        if (data && !data.ok && data.fieldErrors) {
          for (const [field, messages] of Object.entries(data.fieldErrors)) {
            if (messages?.[0]) {
              setError(field as keyof EnquiryInput, { type: "server", message: messages[0] });
            }
          }
        }
        next = {
          kind: "error",
          message:
            data && !data.ok
              ? data.message
              : "Your enquiry could not be sent. Please try again in a moment.",
        };
      }
    } catch {
      next = {
        kind: "error",
        message: "We couldn't reach the server. Please check your connection and try again.",
      };
    }

    setStatus(next);
    requestAnimationFrame(() => statusRef.current?.focus());
  }

  if (status.kind === "sent") {
    return (
      <div
        ref={statusRef}
        tabIndex={-1}
        role="status"
        className="border border-line bg-sand/60 p-8 outline-none sm:p-12"
      >
        <span className="inline-flex size-11 items-center justify-center rounded-full border border-olive-deep text-olive-deep">
          <Check aria-hidden="true" className="size-5" strokeWidth={1.5} />
        </span>
        <h2 className="mt-8 font-serif text-display-sm font-light">Thank you — your enquiry has been sent.</h2>
        <p className="mt-4 max-w-md leading-relaxed text-stone">
          Your message was delivered successfully. A reply will come to the email address you
          provided.
        </p>
        <button
          type="button"
          onClick={() => setStatus({ kind: "idle" })}
          className="mt-8 text-[0.9375rem] font-medium link-underline-static"
        >
          Send another enquiry
        </button>
      </div>
    );
  }

  return (
    <form
      noValidate
      onSubmit={(event) => handleSubmit(onSubmit)(event)}
      aria-describedby="enquiry-form-note"
    >
      {configured === false && (
        <div
          role="note"
          className="mb-10 flex gap-4 border border-line bg-sand/70 p-5 text-[0.9375rem] leading-relaxed"
        >
          <Info aria-hidden="true" className="mt-0.5 size-5 shrink-0 text-olive-deep" strokeWidth={1.5} />
          <p>
            <strong className="font-medium">Online enquiries are not configured for this demonstration.</strong>{" "}
            You can try the form to see how it validates, but messages cannot be delivered and nothing
            will be sent.
          </p>
        </div>
      )}

      <p id="enquiry-form-note" className="text-[0.875rem] text-stone">
        All fields are required unless marked optional.
      </p>

      <div className="mt-8 grid gap-x-8 gap-y-8 sm:grid-cols-2">
        <div>
          <label htmlFor="enquiry-name" className="label text-ink">
            Name
          </label>
          <input
            id="enquiry-name"
            type="text"
            autoComplete="name"
            aria-invalid={errors.name ? true : undefined}
            aria-describedby={errors.name ? "enquiry-name-error" : undefined}
            className={fieldClass}
            {...register("name")}
          />
          <FieldMessage id="enquiry-name-error" error={errors.name} />
        </div>

        <div>
          <label htmlFor="enquiry-email" className="label text-ink">
            Email
          </label>
          <input
            id="enquiry-email"
            type="email"
            inputMode="email"
            autoComplete="email"
            aria-invalid={errors.email ? true : undefined}
            aria-describedby={errors.email ? "enquiry-email-error" : undefined}
            className={fieldClass}
            {...register("email")}
          />
          <FieldMessage id="enquiry-email-error" error={errors.email} />
        </div>

        <div>
          <label htmlFor="enquiry-phone" className="label text-ink">
            Phone <span className="text-stone normal-case tracking-normal">(optional)</span>
          </label>
          <input
            id="enquiry-phone"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            aria-invalid={errors.phone ? true : undefined}
            aria-describedby={errors.phone ? "enquiry-phone-error" : undefined}
            className={fieldClass}
            {...register("phone")}
          />
          <FieldMessage id="enquiry-phone-error" error={errors.phone} />
        </div>

        <div>
          <label htmlFor="enquiry-type" className="label text-ink">
            Project type
          </label>
          <div className="relative">
            <select
              id="enquiry-type"
              defaultValue=""
              aria-invalid={errors.projectType ? true : undefined}
              aria-describedby={errors.projectType ? "enquiry-type-error" : undefined}
              className={cn(fieldClass, "appearance-none pr-8")}
              {...register("projectType")}
            >
              <option value="" disabled>
                Select a project type
              </option>
              {projectTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
            <span
              aria-hidden="true"
              className="pointer-events-none absolute right-1 bottom-4 size-2 rotate-45 border-r border-b border-ink"
            />
          </div>
          <FieldMessage id="enquiry-type-error" error={errors.projectType} />
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="enquiry-message" className="label text-ink">
            Message
          </label>
          <textarea
            id="enquiry-message"
            rows={6}
            aria-invalid={errors.message ? true : undefined}
            aria-describedby={
              errors.message ? "enquiry-message-hint enquiry-message-error" : "enquiry-message-hint"
            }
            className={cn(fieldClass, "resize-y")}
            {...register("message")}
          />
          <p id="enquiry-message-hint" className="mt-2 text-[0.8125rem] text-stone">
            A few lines about the space, its location type and what you hope to change.
          </p>
          <FieldMessage id="enquiry-message-error" error={errors.message} />
        </div>
      </div>

      {/* Honeypot: hidden from people and assistive tech; bots tend to fill it. */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label htmlFor={HONEYPOT_FIELD}>Company website</label>
        <input
          ref={honeypotRef}
          id={HONEYPOT_FIELD}
          name={HONEYPOT_FIELD}
          type="text"
          tabIndex={-1}
          autoComplete="off"
          defaultValue=""
        />
      </div>

      <div className="mt-10">
        <div className="flex items-start gap-4">
          <input
            id="enquiry-consent"
            type="checkbox"
            aria-invalid={errors.consent ? true : undefined}
            aria-describedby={errors.consent ? "enquiry-consent-error" : undefined}
            className="mt-1 size-5 shrink-0 cursor-pointer accent-ink"
            {...register("consent")}
          />
          <label htmlFor="enquiry-consent" className="text-[0.9375rem] leading-relaxed text-stone">
            I agree that the details in this form may be used to reply to my enquiry. They are sent
            by email and are not stored on this website or used for marketing.
          </label>
        </div>
        <FieldMessage id="enquiry-consent-error" error={errors.consent} />
      </div>

      <div className="mt-10 flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
        <button
          type="submit"
          disabled={submitting}
          aria-busy={submitting}
          className="group inline-flex min-h-12 items-center justify-center gap-3 bg-ink px-7 text-[0.8125rem] font-medium tracking-[0.12em] text-ivory uppercase transition-colors duration-500 hover:bg-olive-deep disabled:cursor-wait disabled:opacity-70"
        >
          {submitting ? (
            <>
              <LoaderCircle aria-hidden="true" className="size-4 animate-spin" strokeWidth={1.5} />
              Sending…
            </>
          ) : (
            <>
              Send enquiry
              <ArrowRight
                aria-hidden="true"
                className="size-4 transition-transform duration-500 ease-quiet group-hover:translate-x-1"
                strokeWidth={1.5}
              />
            </>
          )}
        </button>
        {configured === false && (
          <p className="text-[0.8125rem] text-stone">Delivery is not configured — nothing will be sent.</p>
        )}
      </div>

      <div ref={statusRef} tabIndex={-1} className="mt-8 outline-none" aria-live="polite">
        {status.kind === "not_configured" && (
          <div className="flex gap-4 border border-line bg-sand/70 p-5 text-[0.9375rem]">
            <Info aria-hidden="true" className="mt-0.5 size-5 shrink-0 text-olive-deep" strokeWidth={1.5} />
            <p>
              <strong className="font-medium">Not sent.</strong> {status.message}
            </p>
          </div>
        )}
        {status.kind === "error" && (
          <div className="flex gap-4 border border-error/40 p-5 text-[0.9375rem] text-error">
            <CircleAlert aria-hidden="true" className="mt-0.5 size-5 shrink-0" strokeWidth={1.5} />
            <p>{status.message}</p>
          </div>
        )}
      </div>
    </form>
  );
}
