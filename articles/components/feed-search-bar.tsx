"use client";

import { useRouter } from "next/navigation";

import { FeedSearchForm } from "@/articles/components/feed-search-form";
import { feedHref } from "@/articles/feed-url";
import type { ArticleListParams } from "@/articles/types";

type FeedSearchBarProps = Pick<ArticleListParams, "q" | "author" | "pageSize">;

export function FeedSearchBar({ q, author, pageSize }: FeedSearchBarProps) {
  const router = useRouter();

  function go(nextQ?: string) {
    router.push(feedHref({ q: nextQ, author, pageSize, page: 1 }));
  }

  function handleSubmit(query: string) {
    go(query || undefined);
  }

  function handleClear() {
    go(undefined);
  }

  return (
    <FeedSearchForm
      q={q}
      author={author}
      pageSize={pageSize}
      onSubmit={handleSubmit}
      onClear={handleClear}
    />
  );
}
