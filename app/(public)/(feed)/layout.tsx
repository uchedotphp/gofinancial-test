import type { ReactNode } from "react";

import { PageShell } from "@/components/page-shell";
import { PageDescription, PageTitle } from "@/components/typography";

export default function FeedLayout({ children }: { children: ReactNode }) {
  return (
    <PageShell>
      <PageTitle>Articles</PageTitle>
      <PageDescription className="max-w-xl">
        Search and browse pieces from the catalog.
      </PageDescription>
      {children}
    </PageShell>
  );
}
