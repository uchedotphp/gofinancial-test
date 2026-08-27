"use client";

import type { ReactNode } from "react";
import { useState } from "react";

import { MobileMenu } from "@/components/header/mobile-menu";
import { PrimaryNav } from "@/components/header/primary-nav";
import { ThemeToggle } from "@/components/header/theme-toggle";

type HeaderShellProps = {
  brand: ReactNode;
};

export function HeaderShell({ brand }: HeaderShellProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="mx-auto flex h-16 max-w-5xl items-center justify-between gap-4 px-4 sm:px-6">
        {brand}
        <PrimaryNav />
        <div className="flex items-center gap-1 md:hidden">
          <ThemeToggle />
          <MobileMenu.Toggle open={open} onOpenChange={setOpen} />
        </div>
      </div>
      <MobileMenu.Panel open={open} onNavigate={() => setOpen(false)} />
    </>
  );
}
