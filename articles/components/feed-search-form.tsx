"use client";

import { DEFAULT_PAGE_SIZE } from "@/articles/feed-url";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type FeedSearchFormProps = {
  q?: string;
  author?: number;
  pageSize?: number;
  onSubmit: (query: string) => void;
  onClear: () => void;
};

export function FeedSearchForm({
  q = "",
  author,
  pageSize = DEFAULT_PAGE_SIZE,
  onSubmit,
  onClear,
}: FeedSearchFormProps) {
  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const value = String(
      new FormData(event.currentTarget).get("q") ?? "",
    ).trim();
    onSubmit(value);
  }

  function handleQueryChange(event: React.ChangeEvent<HTMLInputElement>) {
    if (event.target.value === "") {
      onClear();
    }
  }

  return (
    <form
      key={q}
      onSubmit={handleSubmit}
      className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center"
      role="search"
    >
      <Label htmlFor="feed-article-search" className="sr-only">
        Search articles
      </Label>
      <Input
        id="feed-article-search"
        name="q"
        type="search"
        defaultValue={q}
        placeholder="Search titles and body"
        className="sm:flex-1"
        onChange={handleQueryChange}
      />
      {author ? <input type="hidden" name="author" value={author} /> : null}
      {pageSize !== DEFAULT_PAGE_SIZE ? (
        <input type="hidden" name="pageSize" value={pageSize} />
      ) : null}
      <Button type="submit" className="h-10 w-full sm:w-auto">
        Search
      </Button>
    </form>
  );
}
