"use client";

import { RouteError } from "@/components/route-error";

type LoginErrorProps = {
  error: Error & { digest?: string };
  retry: () => void;
};

export default function LoginError({ error, retry }: LoginErrorProps) {
  return (
    <RouteError
      error={error}
      retry={retry}
      narrow
      description="Sign in could not be loaded. You can try again."
    />
  );
}
