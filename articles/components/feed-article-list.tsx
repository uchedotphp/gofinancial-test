"use client";

import { useQuery } from "@tanstack/react-query";

import {
  ArticleListEmpty,
  ArticleListError,
  ArticleListSkeleton,
  ArticleListView,
} from "@/articles/components/article-list-view";
import { articleListQueryOptions } from "@/articles/queries";
import type { ArticleListParams } from "@/articles/types";
import { routes } from "@/lib/routes";

type FeedArticleListProps = {
  params: ArticleListParams;
};

function toListItems(
  items: Array<{
    id: number;
    title: string;
    body: string;
    authorId: number;
  }>,
) {
  return items.map((article) => ({
    id: article.id,
    title: article.title,
    body: article.body,
    href: routes.article(article.id),
    authorHref: routes.author(article.authorId),
    authorLabel: `Author #${article.authorId}`,
  }));
}

export function FeedArticleList({ params }: FeedArticleListProps) {
  const { data, isError, isPending, isFetching, isPlaceholderData, refetch } =
    useQuery(articleListQueryOptions(params));

  if (isPending && !data) {
    return <ArticleListSkeleton />;
  }

  if (isError && !data) {
    return <ArticleListError onRetry={refetch} />;
  }

  if (!data || data.items.length === 0) {
    return <ArticleListEmpty />;
  }

  const items = toListItems(data.items);

  return (
    <ArticleListView
      items={items}
      isUpdating={isFetching || isPlaceholderData}
    />
  );
}
