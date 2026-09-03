"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { studioNav } from "@/lib/routes";
import { cn } from "@/utils/cn";

export function StudioNav() {
  const pathname = usePathname();

  return (
    <div className="mx-auto flex max-w-5xl gap-1 overflow-x-auto px-4 py-2 sm:px-6">
      {studioNav.map((link) => {
        const active = pathname === link.href;

        return (
          <Link
            key={link.href}
            href={link.href}
            aria-current={active ? "page" : undefined}
            className={cn(
              "rounded-md px-3 py-2 text-sm whitespace-nowrap",
              active
                ? "text-ink"
                : "text-muted hover:bg-rule/40 hover:text-ink",
            )}
          >
            {link.label}
          </Link>
        );
      })}
    </div>
  );
}
