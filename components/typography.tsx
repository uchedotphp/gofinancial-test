import type { HTMLAttributes } from "react";

import { cn } from "@/utils/cn";

export function PageTitle({
  className,
  ...props
}: HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h1
      className={cn("text-ink font-serif text-3xl sm:text-4xl", className)}
      {...props}
    />
  );
}

export function PageDescription({
  className,
  ...props
}: HTMLAttributes<HTMLParagraphElement>) {
  return <p className={cn("text-muted mt-3", className)} {...props} />;
}
