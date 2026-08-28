import type { ArticleListParams } from "@/articles/types";
import { routes } from "@/lib/routes";

export const DEFAULT_PAGE_SIZE = 10;

export const FEED_PAGE_SIZE_OPTIONS = [5, 10, 20, 50] as const;

export function normalizeArticleListParams(
  params: ArticleListParams,
): ArticleListParams {
  return {
    q: params.q?.trim() || undefined,
    page: Math.max(1, params.page),
    author: params.author,
    pageSize: params.pageSize ?? DEFAULT_PAGE_SIZE,
  };
}

export type FeedSearchParams = {
  q?: string;
  page?: string;
  author?: string;
  pageSize?: string;
};

export function parseFeedParams(raw: FeedSearchParams): ArticleListParams {
  const page = Math.max(1, Number(raw.page) || 1);
  const authorValue = Number(raw.author);
  const author =
    raw.author && Number.isFinite(authorValue) && authorValue > 0
      ? authorValue
      : undefined;

  const pageSizeValue = Number(raw.pageSize);
  const pageSize =
    pageSizeValue > 0 &&
    FEED_PAGE_SIZE_OPTIONS.includes(
      pageSizeValue as (typeof FEED_PAGE_SIZE_OPTIONS)[number],
    )
      ? pageSizeValue
      : DEFAULT_PAGE_SIZE;

  return normalizeArticleListParams({
    q: raw.q?.trim() || undefined,
    page,
    author,
    pageSize,
  });
}

export type FeedQuery = {
  q?: string;
  page?: number;
  author?: number;
  pageSize?: number;
};

export function feedHref({ q, page, author, pageSize }: FeedQuery) {
  const params = new URLSearchParams();

  if (q?.trim()) {
    params.set("q", q.trim());
  }

  if (author) {
    params.set("author", String(author));
  }

  if (page && page > 1) {
    params.set("page", String(page));
  }

  if (pageSize && pageSize !== DEFAULT_PAGE_SIZE) {
    params.set("pageSize", String(pageSize));
  }

  const query = params.toString();
  return query ? `${routes.home}?${query}` : routes.home;
}

export type FeedPageLink =
  | { type: "page"; page: number; href: string }
  | { type: "ellipsis" };

export function getFeedPageLinks(
  params: ArticleListParams,
  pageCount: number,
): FeedPageLink[] {
  const page = params.page;

  if (pageCount <= 1) {
    return [];
  }

  if (pageCount <= 7) {
    return Array.from({ length: pageCount }, (_, index) => ({
      type: "page" as const,
      page: index + 1,
      href: feedHref({ ...params, page: index + 1 }),
    }));
  }

  const pages = new Set([1, pageCount, page]);

  for (let offset = -1; offset <= 1; offset += 1) {
    const neighbor = page + offset;
    if (neighbor > 1 && neighbor < pageCount) {
      pages.add(neighbor);
    }
  }

  const sorted = [...pages].sort((a, b) => a - b);
  const items: FeedPageLink[] = [];

  for (const [index, value] of sorted.entries()) {
    if (index > 0 && value - sorted[index - 1]! > 1) {
      items.push({ type: "ellipsis" });
    }

    items.push({
      type: "page",
      page: value,
      href: feedHref({ ...params, page: value }),
    });
  }

  return items;
}
