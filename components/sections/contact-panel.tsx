"use client";

import { FormEvent, useMemo, useState } from "react";

import { Button } from "@/components/ui/button";
import type { CTAFormBlock } from "@/lib/types";

interface ContactPanelProps {
  contact: CTAFormBlock;
}

interface FormState {
  fullName: string;
  email: string;
  role: string;
  topic: string;
  message: string;
  companyWebsite: string;
}

const initialState: FormState = {
  fullName: "",
  email: "",
  role: "",
  topic: "",
  message: "",
  companyWebsite: "",
};

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export function ContactPanel({ contact }: ContactPanelProps) {
  const [state, setState] = useState<FormState>(initialState);
  const [submitting, setSubmitting] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const endpoint = `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}/api/contact`;

  const inputClasses =
    "w-full rounded-xl border border-line bg-paper px-4 py-3 text-sm text-ink outline-none transition placeholder:text-ink/40 focus:border-ink";

  const canSubmit = useMemo(
    () => state.fullName.trim() && isValidEmail(state.email) && state.topic && state.message.trim().length > 20,
    [state],
  );

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setFeedback(null);
    setError(null);

    if (!canSubmit) {
      setError("Please complete all required fields. Message should be at least 20 characters.");
      return;
    }

    if (state.companyWebsite.trim()) {
      setFeedback("Thanks for your message.");
      setState(initialState);
      return;
    }

    setSubmitting(true);

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          name: state.fullName,
          email: state.email,
          role: state.role,
          topic: state.topic,
          message: state.message,
          website: state.companyWebsite,
        }),
      });

      if (!response.ok) {
        throw new Error("Request failed");
      }

      setFeedback("Thanks, your message has been sent. We will get back to you shortly.");
      setState(initialState);
    } catch {
      setError("Unable to submit right now. Please try again shortly or email us directly.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <section className="px-5 py-24 sm:px-8 lg:px-10" id="contact-form">
      <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[0.9fr_1.1fr]">
        <div>
          <p className="font-ui text-xs font-semibold uppercase tracking-[0.14em] text-clay">Get Started</p>
          <h2 className="mt-5 font-heading text-[clamp(2.3rem,4.8vw,4.4rem)] font-extrabold leading-[0.96] tracking-[-0.03em] text-ink">
            {contact.title}
          </h2>
          <p className="mt-5 max-w-md text-base leading-8 text-ink/75">{contact.subtitle}</p>

          <div className="mt-10 space-y-5">
            {contact.contactInfo.map((item) => (
              <div key={item.label}>
                <p className="font-ui text-xs font-semibold uppercase tracking-[0.13em] text-ink/55">{item.label}</p>
                {item.href ? (
                  <a className="mt-1 inline-block text-base text-ink hover:text-clay" href={item.href}>
                    {item.value}
                  </a>
                ) : (
                  <p className="mt-1 text-base text-ink">{item.value}</p>
                )}
              </div>
            ))}
          </div>
        </div>

        <form className="rounded-2xl border border-line bg-sand p-6 sm:p-8" onSubmit={onSubmit}>
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="space-y-2 sm:col-span-2">
              <span className="font-ui text-xs font-semibold uppercase tracking-[0.11em] text-ink/60">Full Name *</span>
              <input
                className={inputClasses}
                name="full_name"
                value={state.fullName}
                onChange={(event) => setState((prev) => ({ ...prev, fullName: event.target.value }))}
                required
              />
            </label>

            <label className="space-y-2">
              <span className="font-ui text-xs font-semibold uppercase tracking-[0.11em] text-ink/60">Email *</span>
              <input
                className={inputClasses}
                name="email"
                type="email"
                value={state.email}
                onChange={(event) => setState((prev) => ({ ...prev, email: event.target.value }))}
                required
              />
            </label>

            <label className="space-y-2">
              <span className="font-ui text-xs font-semibold uppercase tracking-[0.11em] text-ink/60">Who Are You?</span>
              <input
                className={inputClasses}
                name="role"
                value={state.role}
                onChange={(event) => setState((prev) => ({ ...prev, role: event.target.value }))}
              />
            </label>

            <label className="space-y-2 sm:col-span-2">
              <span className="font-ui text-xs font-semibold uppercase tracking-[0.11em] text-ink/60">Topic *</span>
              <select
                className={inputClasses}
                name="topic"
                value={state.topic}
                onChange={(event) => setState((prev) => ({ ...prev, topic: event.target.value }))}
                required
              >
                <option value="">Select a topic</option>
                {contact.topics.map((topic) => (
                  <option key={topic.value} value={topic.value}>
                    {topic.label}
                  </option>
                ))}
              </select>
            </label>

            <label className="hidden">
              Website
              <input
                name="website"
                value={state.companyWebsite}
                onChange={(event) => setState((prev) => ({ ...prev, companyWebsite: event.target.value }))}
                tabIndex={-1}
                autoComplete="off"
              />
            </label>

            <label className="space-y-2 sm:col-span-2">
              <span className="font-ui text-xs font-semibold uppercase tracking-[0.11em] text-ink/60">Message *</span>
              <textarea
                className={`${inputClasses} min-h-36 resize-y`}
                name="message"
                value={state.message}
                onChange={(event) => setState((prev) => ({ ...prev, message: event.target.value }))}
                required
              />
            </label>
          </div>

          <div className="mt-6 flex items-center justify-between gap-4">
            <Button disabled={!canSubmit || submitting} size="lg" type="submit" variant="primary">
              {submitting ? "Sending..." : contact.submitLabel}
            </Button>
            <p className="text-xs text-ink/55">We typically reply within one business day.</p>
          </div>

          {feedback ? <p className="mt-4 text-sm text-green-800">{feedback}</p> : null}
          {error ? <p className="mt-4 text-sm text-red-700">{error}</p> : null}
        </form>
      </div>
    </section>
  );
}
