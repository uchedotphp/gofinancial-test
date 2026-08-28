"use client";

import { Menu, X } from "lucide-react";
import Link from "next/link";

import { HeaderAuth } from "@/components/header/header-auth";
import { Button } from "@/components/ui/button";
import { primaryNav } from "@/lib/routes";
import { cn } from "@/utils/cn";

type ToggleProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

function Toggle({ open, onOpenChange }: ToggleProps) {
  function handleClick() {
    onOpenChange(!open);
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      aria-expanded={open}
      aria-controls="mobile-nav"
      aria-label={open ? "Close menu" : "Open menu"}
      onClick={handleClick}
    >
      <span className="relative size-5">
        <Menu
          className={cn(
            "absolute inset-0 size-5 transition-all duration-200 ease-out",
            open
              ? "scale-75 rotate-90 opacity-0"
              : "scale-100 rotate-0 opacity-100",
          )}
        />
        <X
          className={cn(
            "absolute inset-0 size-5 transition-all duration-200 ease-out",
            open
              ? "scale-100 rotate-0 opacity-100"
              : "scale-75 -rotate-90 opacity-0",
          )}
        />
      </span>
    </Button>
  );
}

type PanelProps = {
  open: boolean;
  onNavigate: () => void;
};

function Panel({ open, onNavigate }: PanelProps) {
  return (
    <div
      className={cn(
        "grid transition-[grid-template-rows] duration-300 ease-out md:hidden",
        open ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
      )}
    >
      <div className="overflow-hidden">
        <nav
          id="mobile-nav"
          className={cn(
            "border-rule border-t px-4 py-3 transition-opacity duration-300 ease-out",
            open ? "opacity-100" : "opacity-0",
          )}
          aria-label="Mobile"
          aria-hidden={!open}
          inert={!open ? true : undefined}
        >
          <ul className="flex flex-col gap-1">
            {primaryNav.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  tabIndex={open ? undefined : -1}
                  className="text-ink hover:bg-rule/40 block rounded-md px-3 py-3 text-base"
                  onClick={onNavigate}
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <li className="px-3 py-2">
              <HeaderAuth
                className="flex-col items-start gap-1"
                linkClassName="px-0"
                onNavigate={onNavigate}
              />
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}

export const MobileMenu = {
  Toggle,
  Panel,
};
