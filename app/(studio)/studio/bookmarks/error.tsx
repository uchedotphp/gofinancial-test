"use client";

import { RouteError } from "@/components/route-error";

type BookmarksErrorProps = {
  error: Error & { digest?: string };
  retry: () => void;
};

export default function BookmarksError({ error, retry }: BookmarksErrorProps) {
  return (
    <RouteError
      error={error}
      retry={retry}
      description="Bookmarks could not be loaded. You can try again."
    />
  );
}
