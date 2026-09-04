"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { siteConfig } from "@/lib/site-config";
import { cn } from "@/lib/utils";

export default function MobileNav({ pathname }: { pathname: string }) {
  const [open, setOpen] = useState(false);
  const [lastPathname, setLastPathname] = useState(pathname);
  const panelRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  if (pathname !== lastPathname) {
    setLastPathname(pathname);
    if (open) setOpen(false);
  }

  useEffect(() => {
    if (!open) return;

    const previouslyFocused = document.activeElement as HTMLElement | null;
    document.body.style.overflow = "hidden";

    const firstLink = panelRef.current?.querySelector<HTMLElement>("a, button");
    firstLink?.focus();

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        return;
      }
      if (e.key !== "Tab" || !panelRef.current) return;

      const focusable = panelRef.current.querySelectorAll<HTMLElement>(
        "a, button:not([disabled])"
      );
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
      previouslyFocused?.focus();
    };
  }, [open]);

  return (
    <div className="lg:hidden">
      <button
        ref={toggleRef}
        type="button"
        onClick={() => setOpen(true)}
        aria-expanded={open}
        aria-controls="mobile-nav-panel"
        aria-label="Open menu"
        className="flex size-10 items-center justify-center rounded-full text-ink transition-colors hover:bg-surface-alt"
      >
        <Menu className="size-5" aria-hidden="true" />
      </button>

      <div
        id="mobile-nav-panel"
        role="dialog"
        aria-modal="true"
        aria-label="Mobile navigation"
        ref={panelRef}
        className={cn(
          "fixed inset-0 z-[60] flex flex-col bg-ink text-background transition-opacity duration-300",
          open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        )}
      >
        <div className="flex items-center justify-between px-6 py-4 sm:px-8">
          <span className="font-display text-lg font-semibold">{siteConfig.name}</span>
          <button
            type="button"
            onClick={() => setOpen(false)}
            aria-label="Close menu"
            className="flex size-10 items-center justify-center rounded-full transition-colors hover:bg-white/10"
          >
            <X className="size-5" aria-hidden="true" />
          </button>
        </div>

        <nav className="flex flex-1 flex-col justify-center gap-2 px-6 sm:px-8" aria-label="Primary">
          {siteConfig.nav.map((item, i) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "border-b border-white/10 py-4 font-display text-3xl transition-colors",
                pathname === item.href ? "text-accent" : "text-background hover:text-accent"
              )}
              style={{ transitionDelay: `${i * 20}ms` }}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex flex-col gap-3 px-6 pb-10 sm:px-8">
          <a
            href={siteConfig.questionnaireUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex w-full items-center justify-center rounded-full bg-cta px-6 py-4 text-center font-medium text-cta-foreground transition-colors hover:bg-cta-hover"
          >
            Start Your Project
          </a>
          <Link
            href={siteConfig.navCta.href}
            className="flex w-full items-center justify-center rounded-full border border-background/25 px-6 py-4 text-center font-medium text-background transition-colors hover:border-background hover:bg-background/10"
          >
            {siteConfig.navCta.label}
          </Link>
        </div>
      </div>
    </div>
  );
}
