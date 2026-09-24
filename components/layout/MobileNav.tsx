"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { siteConfig } from "@/lib/site-config";
import { cn } from "@/lib/utils";
import Logo from "@/components/ui/Logo";

const subscribeToClient = () => () => {};

export default function MobileNav({ pathname }: { pathname: string }) {
  const [open, setOpen] = useState(false);
  const mounted = useSyncExternalStore(subscribeToClient, () => true, () => false);
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
    <div className="2xl:hidden">
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

      {mounted &&
        createPortal(
          <div
            id="mobile-nav-panel"
            role="dialog"
            aria-modal="true"
            aria-label="Mobile navigation"
            aria-hidden={!open}
            inert={!open}
            ref={panelRef}
            className={cn(
              "fixed inset-0 z-[100] flex h-[100dvh] flex-col overflow-y-auto overscroll-contain bg-ink text-background transition-opacity duration-300 2xl:hidden",
              open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
            )}
          >
            <div className="flex shrink-0 items-center justify-between border-b border-background/20 bg-ink px-6 py-4 sm:px-8">
              <Logo light />
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close menu"
                className="flex size-11 items-center justify-center rounded-full border border-background/20 transition-colors hover:bg-white/10"
              >
                <X className="size-5" aria-hidden="true" />
              </button>
            </div>

            <nav className="flex flex-1 flex-col px-6 py-4 sm:px-8" aria-label="Primary">
              {siteConfig.nav.map((item, i) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className={cn(
                    "flex min-h-16 shrink-0 items-center border-b border-background/15 py-4 font-display text-3xl leading-tight text-background transition-colors",
                    pathname === item.href ? "text-accent" : "hover:text-accent"
                  )}
                  style={{ transitionDelay: `${i * 20}ms` }}
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            <div className="sticky bottom-0 flex shrink-0 flex-col border-t border-background/20 bg-ink px-6 pb-[calc(1.5rem+env(safe-area-inset-bottom))] pt-5 sm:px-8">
              <Link
                href="/contact"
                onClick={() => setOpen(false)}
                className="flex w-full items-center justify-center rounded-xl bg-cta px-6 py-4 text-center font-medium text-cta-foreground transition-colors hover:bg-cta-hover"
              >
                Discuss Your Project
              </Link>
            </div>
          </div>,
          document.body
        )}
    </div>
  );
}
