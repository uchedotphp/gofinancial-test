"use client";

import { RouteError } from "@/components/route-error";

type FeedErrorProps = {
  error: Error & { digest?: string };
  retry: () => void;
};

export default function FeedError({ error, retry }: FeedErrorProps) {
  return (
    <RouteError
      error={error}
      retry={retry}
      embedded
      description="The article feed could not be loaded. You can try again."
    />
  );
}
