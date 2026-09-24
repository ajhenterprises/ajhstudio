"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { siteConfig } from "@/lib/site-config";
import { cn } from "@/lib/utils";
import Button from "@/components/ui/Button";
import MobileNav from "./MobileNav";
import Logo from "@/components/ui/Logo";

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
        "sticky top-0 z-50 w-full border-b transition-all duration-300",
        scrolled
          ? "border-border/80 bg-background/95 shadow-card backdrop-blur-md"
          : "border-transparent bg-background"
      )}
    >
      <div className="mx-auto flex w-full max-w-[1600px] flex-wrap items-center justify-between gap-x-2 gap-y-3 px-4 py-4 sm:px-8 lg:px-10">
        <Link href="/" className="w-24 shrink-0 rounded-xl min-[360px]:w-32 sm:w-[235px]" aria-label={`${siteConfig.name} home`}>
          <Logo />
        </Link>

        <nav className="order-3 hidden w-full flex-wrap items-center justify-center gap-1 border-t border-border/60 pt-3 md:flex 2xl:order-none 2xl:w-auto 2xl:border-0 2xl:pt-0" aria-label="Primary">
          {siteConfig.nav.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "flex min-h-11 items-center rounded-lg px-2 py-2 text-[0.86rem] font-medium transition-colors duration-150",
                  active
                    ? "bg-surface-alt text-ink"
                    : "text-muted hover:bg-surface-alt/70 hover:text-ink"
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="ml-auto flex shrink-0 items-center gap-3 2xl:ml-0">
          <Button href="/contact" size="md" showArrow={false} className="max-sm:px-3 max-sm:text-xs">
            Start Your Project
          </Button>
        </div>

        <MobileNav pathname={pathname} />
      </div>
    </header>
  );
}
