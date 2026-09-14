"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { X } from "lucide-react";

const COOKIE_NOTICE_KEY = "ajh-cookie-notice-acknowledged";

export default function CookieNotice() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      try {
        setVisible(window.localStorage.getItem(COOKIE_NOTICE_KEY) !== "true");
      } catch {
        setVisible(true);
      }
    }, 0);

    return () => window.clearTimeout(timer);
  }, []);

  function acknowledge() {
    try {
      window.localStorage.setItem(COOKIE_NOTICE_KEY, "true");
    } catch {
      // The notice can still be dismissed for this page view when storage is unavailable.
    }
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <aside
      aria-label="Cookie notice"
      className="fixed inset-x-4 bottom-4 z-[90] mx-auto max-w-3xl rounded-2xl border border-background/15 bg-ink p-5 text-background shadow-2xl sm:bottom-6 sm:flex sm:items-center sm:gap-6 sm:p-6"
    >
      <div className="pr-8 sm:pr-0">
        <p className="font-display text-lg text-background">A quick note about cookies</p>
        <p className="mt-2 text-sm leading-relaxed text-background/75">
          This site uses essential browser storage to support functionality and remember that
          you&apos;ve seen this notice. It does not currently use advertising cookies.{" "}
          <Link href="/privacy" className="font-semibold text-accent underline underline-offset-4">
            Read the Privacy Policy
          </Link>
          .
        </p>
      </div>
      <button
        type="button"
        onClick={acknowledge}
        className="mt-4 inline-flex shrink-0 items-center justify-center rounded-full bg-cta px-6 py-3 text-sm font-semibold text-cta-foreground transition-colors hover:bg-cta-hover sm:mt-0"
      >
        Got it
      </button>
      <button
        type="button"
        onClick={acknowledge}
        aria-label="Dismiss cookie notice"
        className="absolute right-3 top-3 flex size-8 items-center justify-center rounded-full text-background/65 transition-colors hover:bg-background/10 hover:text-background sm:hidden"
      >
        <X className="size-4" aria-hidden="true" />
      </button>
    </aside>
  );
}
