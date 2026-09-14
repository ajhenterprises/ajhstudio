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
      <div className="mx-auto flex w-full max-w-[1240px] items-center justify-between px-6 py-4 sm:px-8 lg:px-10">
        <Link href="/" className="rounded-xl" aria-label={`${siteConfig.name} home`}>
          <Logo />
        </Link>

        <nav className="hidden items-center gap-1 xl:flex" aria-label="Primary">
          {siteConfig.nav.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "rounded-lg px-3.5 py-2 text-[0.92rem] font-medium transition-colors duration-150",
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

        <div className="hidden items-center gap-3 xl:flex">
          <Button href="/contact" size="md">
            Start Your Project
          </Button>
        </div>

        <MobileNav pathname={pathname} />
      </div>
    </header>
  );
}
