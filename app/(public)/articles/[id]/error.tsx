"use client";

import { RouteError } from "@/components/route-error";

type ArticleErrorProps = {
  error: Error & { digest?: string };
  retry: () => void;
};

export default function ArticleError({ error, retry }: ArticleErrorProps) {
  return (
    <RouteError
      error={error}
      retry={retry}
      narrow
      description="This article could not be loaded. You can try again."
    />
  );
}
