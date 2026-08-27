import type { ReactNode } from "react";

import { cn } from "@/utils/cn";

export function PageShell({
  children,
  className,
  narrow = false,
}: {
  children: ReactNode;
  className?: string;
  narrow?: boolean;
}) {
  return (
    <div
      className={cn(
        "mx-auto w-full flex-1 px-4 py-10 sm:px-6 sm:py-14",
        narrow ? "max-w-2xl" : "max-w-5xl",
        className,
      )}
    >
      {children}
    </div>
  );
}
