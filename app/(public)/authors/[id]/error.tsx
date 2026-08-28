"use client";

import { RouteError } from "@/components/route-error";

type AuthorErrorProps = {
  error: Error & { digest?: string };
  retry: () => void;
};

export default function AuthorError({ error, retry }: AuthorErrorProps) {
  return (
    <RouteError
      error={error}
      retry={retry}
      description="This author page could not be loaded. You can try again."
    />
  );
}
