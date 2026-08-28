"use client";

import { Loader2 } from "lucide-react";
import Link from "next/link";

import type { ArticleListItem } from "@/articles/types";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/utils/cn";

export type ArticleListViewProps = {
  items: ArticleListItem[];
  isUpdating?: boolean;
  updatingLabel?: string;
};

export function ArticleListView({
  items,
  isUpdating = false,
  updatingLabel = "Updating…",
}: ArticleListViewProps) {
  return (
    <div className="relative mt-10" aria-busy={isUpdating || undefined}>
      {isUpdating ? (
        <div className="text-muted absolute top-0 right-0 z-10 flex items-center gap-2 text-xs">
          <Loader2 className="size-3.5 animate-spin" aria-hidden />
          <span>{updatingLabel}</span>
        </div>
      ) : null}

      <ul
        className={cn(
          "space-y-4 transition-opacity duration-200",
          isUpdating && "opacity-50",
        )}
      >
        {items.map((article) => (
          <li key={article.id}>
            <Card className="border-rule bg-surface hover:border-accent/40 gap-0 rounded-lg py-0 shadow-none transition-colors">
              <CardHeader className="gap-0 px-5 pt-5 pb-0 sm:px-6 sm:pt-6">
                <CardTitle className="text-ink font-serif text-xl font-normal text-balance sm:text-2xl">
                  <Link href={article.href} className="hover:text-accent">
                    {article.title}
                  </Link>
                </CardTitle>
              </CardHeader>
              <CardContent className="text-muted px-5 pt-3 pb-0 sm:px-6">
                <p className="line-clamp-3 text-sm leading-relaxed sm:text-base">
                  {article.body}
                </p>
              </CardContent>
              <CardFooter className="text-muted px-5 pt-4 pb-5 text-xs sm:px-6 sm:pb-6">
                <Link
                  href={article.authorHref}
                  className="hover:text-accent hover:underline"
                >
                  {article.authorLabel}
                </Link>
              </CardFooter>
            </Card>
          </li>
        ))}
      </ul>
    </div>
  );
}

type ArticleListEmptyProps = {
  message?: string;
};

export function ArticleListEmpty({
  message = "No articles matched your search.",
}: ArticleListEmptyProps) {
  return <p className="text-muted mt-10 text-sm">{message}</p>;
}

type ArticleListErrorProps = {
  message?: string;
  retryLabel?: string;
  onRetry: () => void;
};

export function ArticleListError({
  message = "Could not load articles.",
  retryLabel = "Try again",
  onRetry,
}: ArticleListErrorProps) {
  function handleRetry() {
    onRetry();
  }

  return (
    <Card className="border-rule bg-surface mt-8 gap-4 rounded-lg py-5 shadow-none">
      <CardContent className="px-6">
        <p className="text-ink">{message}</p>
        <Button
          type="button"
          variant="link"
          className="mt-3 h-auto p-0"
          onClick={handleRetry}
        >
          {retryLabel}
        </Button>
      </CardContent>
    </Card>
  );
}

export function ArticleListSkeleton() {
  return (
    <ul className="mt-10 space-y-4" aria-hidden>
      {Array.from({ length: 4 }).map((_, index) => (
        <li key={index}>
          <Card className="border-rule bg-surface gap-4 rounded-lg py-5 shadow-none">
            <CardHeader className="gap-3 px-5 sm:px-6">
              <Skeleton className="bg-rule/70 h-7 w-3/4" />
            </CardHeader>
            <CardContent className="space-y-2 px-5 sm:px-6">
              <Skeleton className="bg-rule/50 h-4 w-full" />
              <Skeleton className="bg-rule/50 h-4 w-5/6" />
            </CardContent>
            <CardFooter className="px-5 sm:px-6">
              <Skeleton className="bg-rule/40 h-3 w-24" />
            </CardFooter>
          </Card>
        </li>
      ))}
    </ul>
  );
}
