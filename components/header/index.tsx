import Link from "next/link";

import { HeaderShell } from "@/components/header/header-shell";
import { routes } from "@/lib/routes";

export function SiteHeader() {
  return (
    <header className="border-rule/80 bg-paper/80 border-b backdrop-blur-md">
      <HeaderShell
        brand={
          <Link
            href={routes.home}
            className="text-ink font-serif text-xl tracking-tight sm:text-2xl"
          >
            uchedotphp
          </Link>
        }
      />
    </header>
  );
}
