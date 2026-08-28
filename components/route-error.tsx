"use client";

import { useEffect } from "react";

import { PageShell } from "@/components/page-shell";
import { PageDescription, PageTitle } from "@/components/typography";
import { Button } from "@/components/ui/button";

type RouteErrorProps = {
  error: Error & { digest?: string };
  retry: () => void;
  title?: string;
  description?: string;
  narrow?: boolean;
  embedded?: boolean;
};

export function RouteError({
  error,
  retry,
  title = "Something went wrong",
  description = "This page could not be loaded. You can try again.",
  narrow = false,
  embedded = false,
}: RouteErrorProps) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  const body = (
    <>
      {embedded ? null : <PageTitle>{title}</PageTitle>}
      <PageDescription className={embedded ? "mt-8" : undefined}>
        {description}
      </PageDescription>
      <Button type="button" className="mt-8" onClick={retry}>
        Try again
      </Button>
    </>
  );

  if (embedded) {
    return body;
  }

  return <PageShell narrow={narrow}>{body}</PageShell>;
}
