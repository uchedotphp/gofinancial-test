import { keepPreviousData, queryOptions } from "@tanstack/react-query";

import { DEFAULT_PAGE_SIZE, normalizeArticleListParams } from "@/articles/feed-url";
import type {
  Article,
  ArticleListParams,
  ArticleListResult,
  Post,
} from "@/articles/types";
import { api } from "@/lib/api/client";

function articleListKey(params: ArticleListParams) {
  return [
    "articles",
    "list",
    {
      q: params.q ?? "",
      page: params.page,
      author: params.author ?? null,
      pageSize: params.pageSize ?? DEFAULT_PAGE_SIZE,
    },
  ] as const;
}

function postToArticle(post: Post): Article {
  return {
    id: post.id,
    authorId: post.userId,
    title: post.title,
    body: post.body,
  };
}

function matchesQuery(post: Post, q: string) {
  const needle = q.trim().toLowerCase();
  if (!needle) return true;
  return (
    post.title.toLowerCase().includes(needle) ||
    post.body.toLowerCase().includes(needle)
  );
}

async function fetchArticleList(
  params: ArticleListParams,
): Promise<ArticleListResult> {
  const page = Math.max(1, params.page);
  const pageSize = params.pageSize ?? DEFAULT_PAGE_SIZE;
  const q = params.q?.trim() ?? "";

  if (q) {
    // JSONPlaceholder has no search param — fetch and filter in memory.
    const response = await api.get<Post[]>("/posts", {
      params: params.author ? { userId: params.author } : undefined,
    });
    const filtered = response.data.filter((post) => matchesQuery(post, q));
    const total = filtered.length;
    const pageCount = Math.max(1, Math.ceil(total / pageSize));
    const start = (page - 1) * pageSize;

    return {
      items: filtered.slice(start, start + pageSize).map(postToArticle),
      total,
      page,
      pageSize,
      pageCount,
    };
  }

  const response = await api.get<Post[]>("/posts", {
    params: {
      _page: page,
      _limit: pageSize,
      ...(params.author ? { userId: params.author } : {}),
    },
  });

  const totalHeader = response.headers["x-total-count"];
  const total = totalHeader ? Number(totalHeader) : response.data.length;
  const pageCount = Math.max(1, Math.ceil(total / pageSize));

  return {
    items: response.data.map(postToArticle),
    total,
    page,
    pageSize,
    pageCount,
  };
}

export function articleListQueryOptions(params: ArticleListParams) {
  const normalized = normalizeArticleListParams(params);

  return queryOptions({
    queryKey: articleListKey(normalized),
    queryFn: () => fetchArticleList(normalized),
    staleTime: 60_000,
    placeholderData: keepPreviousData,
  });
}
