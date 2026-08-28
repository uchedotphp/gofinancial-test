"use client";

import { useSyncExternalStore } from "react";
import { create } from "zustand";
import { persist } from "zustand/middleware";

import type { ArticleId } from "@/articles/types";
import type { AuthorId } from "@/authors/types";

type BookmarksStore = {
  byAuthor: Record<number, number[]>;
  toggle: (authorId: AuthorId, articleId: ArticleId) => void;
};

export const useBookmarksStore = create<BookmarksStore>()(
  persist(
    (set, get) => ({
      byAuthor: {},
      toggle: (authorId, articleId) => {
        const current = get().byAuthor[authorId] ?? [];
        const next = current.includes(articleId)
          ? current.filter((id) => id !== articleId)
          : [articleId, ...current];
        set({ byAuthor: { ...get().byAuthor, [authorId]: next } });
      },
    }),
    {
      name: "uchedotphp-bookmarks",
      partialize: (state) => ({ byAuthor: state.byAuthor }),
    },
  ),
);

export function useBookmarkIds(authorId: AuthorId | undefined) {
  return useBookmarksStore((state) =>
    authorId == null ? [] : (state.byAuthor[authorId] ?? []),
  );
}

export function useIsBookmarked(
  authorId: AuthorId | undefined,
  articleId: ArticleId,
) {
  return useBookmarksStore((state) =>
    authorId == null
      ? false
      : (state.byAuthor[authorId]?.includes(articleId) ?? false),
  );
}

function subscribeHydration(onStoreChange: () => void) {
  return useBookmarksStore.persist.onFinishHydration(onStoreChange);
}

export function useBookmarksHydrated() {
  return useSyncExternalStore(
    subscribeHydration,
    () => useBookmarksStore.persist.hasHydrated(),
    () => false,
  );
}
