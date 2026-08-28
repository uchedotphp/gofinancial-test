"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

import { HeaderAuth } from "@/components/header/header-auth";
import { MobileMenu } from "@/components/header/mobile-menu";
import { ThemeToggle } from "@/components/header/theme-toggle";
import { primaryNav, routes } from "@/lib/routes";
import { useSessionHydration } from "@/components/header/use-session-hydration";
import { cn } from "@/utils/cn";

export function SiteHeader() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  useSessionHydration();

  function handleMenuOpenChange(open: boolean) {
    setMenuOpen(open);
  }

  function handleNavigate() {
    setMenuOpen(false);
  }

  return (
    <header className="border-rule/80 bg-paper/80 sticky top-0 z-50 border-b backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-5xl items-center justify-between gap-4 px-4 sm:px-6">
        <Link
          href={routes.home}
          className="text-ink font-serif text-xl tracking-tight sm:text-2xl"
        >
          uchedotphp
        </Link>

        <nav className="hidden items-center gap-1 md:flex" aria-label="Primary">
          {primaryNav.map((link) => {
            const active =
              link.href === routes.home
                ? pathname === routes.home
                : pathname.startsWith(link.href);

            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "rounded-md px-3 py-2 text-sm transition-colors",
                  active
                    ? "bg-rule/50 text-ink"
                    : "text-muted hover:bg-rule/30 hover:text-ink",
                )}
              >
                {link.label}
              </Link>
            );
          })}
          <HeaderAuth />
          <ThemeToggle />
        </nav>

        <div className="flex items-center gap-1 md:hidden">
          <ThemeToggle />
          <MobileMenu.Toggle
            open={menuOpen}
            onOpenChange={handleMenuOpenChange}
          />
        </div>
      </div>

      <MobileMenu.Panel open={menuOpen} onNavigate={handleNavigate} />
    </header>
  );
}
