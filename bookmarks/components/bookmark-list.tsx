"use client";

import { useQueries } from "@tanstack/react-query";

import {
  ArticleListEmpty,
  ArticleListSkeleton,
  ArticleListView,
} from "@/articles/components/article-list-view";
import { articleQueryOptions } from "@/articles/queries";
import { useSessionStore } from "@/auth/store";
import {
  useBookmarkIds,
  useBookmarksHydrated,
  useBookmarksStore,
} from "@/bookmarks/store";
import { Button } from "@/components/ui/button";
import { routes } from "@/lib/routes";

export function BookmarkList() {
  const session = useSessionStore((state) => state.session);
  const status = useSessionStore((state) => state.status);
  const hydrated = useBookmarksHydrated();
  const ids = useBookmarkIds(session?.authorId);
  const toggle = useBookmarksStore((state) => state.toggle);

  const queries = useQueries({
    queries: ids.map((id) => articleQueryOptions(id)),
  });

  if (status === "pending" || !hydrated) {
    return <ArticleListSkeleton />;
  }

  if (!session) {
    return null;
  }

  if (ids.length === 0) {
    return <ArticleListEmpty message="No bookmarks yet." />;
  }

  if (queries.some((query) => query.isPending)) {
    return <ArticleListSkeleton />;
  }

  const items = queries
    .map((query) => query.data)
    .filter(
      (article): article is NonNullable<typeof article> => article != null,
    )
    .map((article) => ({
      id: article.id,
      title: article.title,
      body: article.body,
      href: routes.article(article.id),
    }));

  if (items.length === 0) {
    return <ArticleListEmpty message="No bookmarks yet." />;
  }

  return (
    <ArticleListView
      items={items}
      renderAction={(article) => (
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => {
            toggle(session.authorId, article.id);
          }}
        >
          Remove
        </Button>
      )}
    />
  );
}
