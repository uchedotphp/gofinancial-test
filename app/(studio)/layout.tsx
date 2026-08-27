import Link from "next/link";
import type { ReactNode } from "react";

import { studioNav } from "@/lib/routes";

export default function StudioLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-1 flex-col">
      <div className="border-rule/70 bg-surface/50 border-b">
        <div className="mx-auto flex max-w-5xl gap-1 overflow-x-auto px-4 py-2 sm:px-6">
          {studioNav.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-muted hover:bg-rule/40 hover:text-ink rounded-md px-3 py-2 text-sm whitespace-nowrap"
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
      {children}
    </div>
  );
}
