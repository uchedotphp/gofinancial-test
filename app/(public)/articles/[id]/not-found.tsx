import Link from "next/link";

import { PageShell } from "@/components/page-shell";
import { PageDescription, PageTitle } from "@/components/typography";
import { buttonVariants } from "@/components/ui/button";
import { routes } from "@/lib/routes";
import { cn } from "@/utils/cn";

export default function ArticleNotFound() {
  return (
    <PageShell narrow>
      <p className="text-muted text-sm">404</p>
      <PageTitle className="mt-2">Article not found</PageTitle>
      <PageDescription>
        That article does not exist or may have been removed. Head back to the
        feed to browse what is available.
      </PageDescription>
      <Link
        href={routes.home}
        className={cn(buttonVariants(), "mt-8 inline-flex")}
      >
        Back to articles
      </Link>
    </PageShell>
  );
}
