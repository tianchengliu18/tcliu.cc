"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { useTranslations } from "next-intl";

const STORAGE_KEY = "tcliu-newsletter-preference-v1";
const SUBSCRIBED_EVENT = "tcliu:newsletter-subscribed";
const DAY = 24 * 60 * 60 * 1000;

type Preference =
  | { status: "subscribed" }
  | { status: "snoozed"; showAfter: number };

function readPreference(): Preference | null {
  try {
    const value = window.localStorage.getItem(STORAGE_KEY);
    return value ? (JSON.parse(value) as Preference) : null;
  } catch {
    return null;
  }
}

function writePreference(preference: Preference) {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(preference));
  } catch {
    // The form still works when storage is blocked or unavailable.
  }
}

function markSubscribed() {
  writePreference({ status: "subscribed" });
  window.dispatchEvent(new Event(SUBSCRIBED_EVENT));
}

function snooze(days: number) {
  writePreference({ status: "snoozed", showAfter: Date.now() + days * DAY });
}

function shouldShowPrompt() {
  const preference = readPreference();
  if (!preference) return true;
  if (preference.status === "subscribed") return false;
  return Date.now() >= preference.showAfter;
}

function SubscribeForm({
  action,
  source,
  onSubmit,
}: {
  action: string;
  source: "home-modal" | "news-page";
  onSubmit?: () => void;
}) {
  const t = useTranslations("subscribe");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    if (!event.currentTarget.checkValidity()) return;
    markSubscribed();
    onSubmit?.();
  }

  return (
    <form
      action={action}
      method="post"
      target="_blank"
      acceptCharset="utf-8"
      onSubmit={handleSubmit}
      className="flex flex-col sm:flex-row gap-3"
    >
      <label htmlFor={`subscribe-email-${source}`} className="sr-only">
        {t("emailLabel")}
      </label>
      <input
        id={`subscribe-email-${source}`}
        name="email"
        type="email"
        required
        autoComplete="email"
        inputMode="email"
        placeholder={t("emailPlaceholder")}
        className="min-w-0 flex-1 rounded-md border border-border bg-bg-primary px-4 py-2 text-base text-text-primary outline-none transition-colors placeholder:text-text-tertiary focus:border-accent focus:ring-2 focus:ring-accent/15"
      />
      <input type="hidden" name="embed" value="1" />
      <button
        type="submit"
        className="shrink-0 rounded-md bg-accent px-5 py-2 text-base font-medium text-white transition-colors hover:bg-accent-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg-card"
      >
        {t("button")}
      </button>
    </form>
  );
}

export function SubscribeCard({ action }: { action: string }) {
  const t = useTranslations("subscribe");

  return (
    <section
      aria-labelledby="news-subscribe-title"
      className="mb-12 rounded-lg border border-border-light bg-bg-card p-6 md:p-8"
    >
      <div className="max-w-2xl">
        <h2 id="news-subscribe-title" className="text-text-primary">
          {t("title")}
        </h2>
        <p className="mb-5 mt-2 text-base leading-relaxed text-text-secondary">
          {t("description")}
        </p>
        <SubscribeForm action={action} source="news-page" />
        <p className="mt-3 text-[13px] leading-relaxed text-text-tertiary">
          {t("privacy")}
        </p>
      </div>
    </section>
  );
}

export function HomeSubscribeModal({ action }: { action: string }) {
  const t = useTranslations("subscribe");
  const [open, setOpen] = useState(false);
  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      setOpen(shouldShowPrompt());
    });
    return () => window.cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    dialogRef.current?.focus();

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        snooze(30);
        setOpen(false);
      }
    }

    function handleSubscribed() {
      setOpen(false);
    }

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener(SUBSCRIBED_EVENT, handleSubscribed);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener(SUBSCRIBED_EVENT, handleSubscribed);
    };
  }, [open]);

  function dismiss(days: number) {
    snooze(days);
    setOpen(false);
  }

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[10000] flex items-center justify-center bg-black/45 p-4 backdrop-blur-[2px]"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) dismiss(30);
      }}
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="subscribe-dialog-title"
        aria-describedby="subscribe-dialog-description"
        tabIndex={-1}
        className="relative w-full max-w-lg rounded-xl border border-border bg-bg-card p-7 shadow-2xl outline-none md:p-9"
      >
        <button
          type="button"
          onClick={() => dismiss(30)}
          aria-label={t("close")}
          className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full text-text-tertiary transition-colors hover:bg-bg-secondary hover:text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            aria-hidden="true"
          >
            <path d="M18 6 6 18M6 6l12 12" />
          </svg>
        </button>

        <p className="mb-2 text-[13px] font-medium uppercase tracking-[0.16em] text-accent">
          {t("eyebrow")}
        </p>
        <h2 id="subscribe-dialog-title" className="pr-8 text-text-primary">
          {t("title")}
        </h2>
        <p
          id="subscribe-dialog-description"
          className="mb-6 mt-3 text-base leading-relaxed text-text-secondary"
        >
          {t("description")}
        </p>

        <SubscribeForm
          action={action}
          source="home-modal"
          onSubmit={() => setOpen(false)}
        />
        <p className="mt-3 text-[13px] leading-relaxed text-text-tertiary">
          {t("privacy")}
        </p>
        <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2">
          <button
            type="button"
            onClick={() => dismiss(3)}
            className="text-sm text-text-tertiary underline decoration-border underline-offset-4 transition-colors hover:text-text-primary"
          >
            {t("skip")}
          </button>
          <button
            type="button"
            onClick={markSubscribed}
            className="text-sm text-text-tertiary underline decoration-border underline-offset-4 transition-colors hover:text-text-primary"
          >
            {t("alreadySubscribed")}
          </button>
        </div>
      </div>
    </div>
  );
}
