"use client";

import { Bookmark } from "lucide-react";
import { toast } from "sonner";

import type { ArticleId } from "@/articles/types";
import {
  useBookmarksHydrated,
  useBookmarksStore,
  useIsBookmarked,
} from "@/bookmarks/store";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useSessionStore } from "@/session/store";
import { cn } from "@/utils/cn";

type BookmarkButtonProps = {
  articleId: ArticleId;
};

export function BookmarkButton({ articleId }: BookmarkButtonProps) {
  const session = useSessionStore((state) => state.session);
  const status = useSessionStore((state) => state.status);
  const hydrated = useBookmarksHydrated();
  const saved = useIsBookmarked(session?.authorId, articleId);
  const toggle = useBookmarksStore((state) => state.toggle);

  if (status === "pending" || !session) {
    return null;
  }

  if (!hydrated) {
    return <Skeleton className="size-8 shrink-0" aria-hidden />;
  }

  const authorId = session.authorId;

  function handleClick() {
    toggle(authorId, articleId);
    toast.success(saved ? "Removed from bookmarks" : "Saved to bookmarks");
  }

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          type="button"
          variant="ghost"
          size="icon-sm"
          aria-label="Bookmark"
          aria-pressed={saved}
          onClick={handleClick}
        >
          <Bookmark className={cn("size-4", saved && "fill-current")} />
        </Button>
      </TooltipTrigger>
      <TooltipContent>Bookmark</TooltipContent>
    </Tooltip>
  );
}
