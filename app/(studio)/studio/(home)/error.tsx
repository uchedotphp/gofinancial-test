"use client";

import { RouteError } from "@/components/route-error";

type StudioErrorProps = {
  error: Error & { digest?: string };
  retry: () => void;
};

export default function StudioError({ error, retry }: StudioErrorProps) {
  return (
    <RouteError
      error={error}
      retry={retry}
      description="Your articles could not be loaded. You can try again."
    />
  );
}
