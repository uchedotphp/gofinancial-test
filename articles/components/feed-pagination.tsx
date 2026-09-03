import Link from "next/link";
import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react";

import { PageSizeSelect } from "@/articles/components/page-size-select";
import type { FeedPageLink } from "@/articles/feed-url";
import { cn } from "@/utils/cn";

type FeedPaginationProps = {
  page: number;
  pageCount: number;
  pageSize: number;
  pageLinks: FeedPageLink[];
  prevHref?: string;
  nextHref?: string;
  pageSizeOptions: number[];
  pageSizeHrefs: Record<string, string>;
};

const navLinkClass =
  "text-muted hover:text-ink inline-flex items-center gap-1.5 py-4 text-sm transition-colors";
const disabledNavClass =
  "text-muted/50 inline-flex cursor-not-allowed items-center gap-1.5 py-4 text-sm";
const pageLinkClass =
  "relative flex h-10 min-w-7 items-end justify-center px-2 pb-3.5 text-sm transition-colors sm:min-w-8";

export function FeedPagination({
  page,
  pageCount,
  pageSize,
  pageLinks,
  prevHref,
  nextHref,
  pageSizeOptions,
  pageSizeHrefs,
}: FeedPaginationProps) {
  if (pageCount <= 1) {
    return (
      <div className="mt-10 flex justify-end">
        <PageSizeSelect
          pageSize={pageSize}
          sizes={pageSizeOptions}
          hrefBySize={pageSizeHrefs}
        />
      </div>
    );
  }

  return (
    <div className="mt-10 space-y-4">
      <nav aria-label="Pagination">
        <div className="border-rule grid grid-cols-[auto_1fr_auto] items-end gap-2 border-t sm:gap-4">
          {prevHref ? (
            <Link href={prevHref} className={navLinkClass}>
              <ChevronLeft className="size-4" aria-hidden />
              <span className="hidden sm:inline">Previous</span>
            </Link>
          ) : (
            <span aria-disabled="true" className={disabledNavClass}>
              <ChevronLeft className="size-4" aria-hidden />
              <span className="hidden sm:inline">Previous</span>
            </span>
          )}

          <ol className="flex justify-center gap-0.5 sm:gap-1">
            {pageLinks.map((item, index) =>
              item.type === "ellipsis" ? (
                <li
                  key={`ellipsis-${index}`}
                  className="text-muted flex h-10 items-end px-1.5 pb-3.5"
                  aria-hidden
                >
                  <MoreHorizontal className="size-4" />
                </li>
              ) : (
                <li key={item.page}>
                  <Link
                    href={item.href}
                    aria-current={item.page === page ? "page" : undefined}
                    className={cn(
                      pageLinkClass,
                      item.page === page
                        ? "text-accent border-accent -mb-px border-t-2 pt-3 font-medium"
                        : "text-muted hover:text-ink border-t-2 border-transparent",
                    )}
                  >
                    {item.page}
                  </Link>
                </li>
              ),
            )}
          </ol>

          {nextHref ? (
            <Link
              href={nextHref}
              className={cn(navLinkClass, "justify-self-end")}
            >
              <span className="hidden sm:inline">Next</span>
              <ChevronRight className="size-4" aria-hidden />
            </Link>
          ) : (
            <span
              aria-disabled="true"
              className={cn(disabledNavClass, "justify-self-end")}
            >
              <span className="hidden sm:inline">Next</span>
              <ChevronRight className="size-4" aria-hidden />
            </span>
          )}
        </div>
      </nav>

      <div className="flex justify-end">
        <PageSizeSelect
          pageSize={pageSize}
          sizes={pageSizeOptions}
          hrefBySize={pageSizeHrefs}
        />
      </div>
    </div>
  );
}
