"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { siteConfig } from "@/lib/site-config";
import { cn } from "@/lib/utils";
import Button from "@/components/ui/Button";
import MobileNav from "./MobileNav";

export default function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full border-b transition-colors duration-300",
        scrolled
          ? "border-border bg-background/90 backdrop-blur-md"
          : "border-transparent bg-background/0"
      )}
    >
      <div className="mx-auto flex w-full max-w-[1240px] items-center justify-between px-6 py-4 sm:px-8 lg:px-10">
        <Link href="/" className="flex items-center gap-2.5" aria-label={`${siteConfig.name} home`}>
          <span
            className="flex size-9 items-center justify-center rounded-full bg-ink font-display text-base font-semibold text-background"
            aria-hidden="true"
          >
            A
          </span>
          <span className="font-display text-lg font-semibold tracking-tight text-ink">
            {siteConfig.name}
          </span>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary">
          {siteConfig.nav.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "rounded-full px-4 py-2 text-[0.95rem] font-medium transition-colors duration-150",
                  active
                    ? "text-ink"
                    : "text-muted hover:text-ink"
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden lg:block">
          <Button href={siteConfig.navCta.href} size="md">
            {siteConfig.navCta.label}
          </Button>
        </div>

        <MobileNav pathname={pathname} />
      </div>
    </header>
  );
}
