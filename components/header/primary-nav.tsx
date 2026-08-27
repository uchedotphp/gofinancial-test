"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { ThemeToggle } from "@/components/header/theme-toggle";
import { primaryNav, routes } from "@/lib/routes";
import { cn } from "@/utils/cn";

export function PrimaryNav() {
  const pathname = usePathname();

  return (
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
      <ThemeToggle />
    </nav>
  );
}
