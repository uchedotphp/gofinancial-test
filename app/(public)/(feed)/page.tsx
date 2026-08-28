import { dehydrate, HydrationBoundary } from "@tanstack/react-query";

import {
  FEED_PAGE_SIZE_OPTIONS,
  feedHref,
  getFeedPageLinks,
  parseFeedParams,
  type FeedSearchParams,
} from "@/articles/feed-url";
import { articleListQueryOptions } from "@/articles/queries";
import { fetchAuthors } from "@/authors/queries";
import { FeedPagination } from "@/components/pagination";
import { getQueryClient } from "@/lib/query-client";
import { FeedArticleList } from "./_components/feed-article-list";
import { FeedSearchBar } from "./_components/feed-search-bar";

type HomePageProps = {
  searchParams: Promise<FeedSearchParams>;
};

export default async function HomePage({ searchParams }: HomePageProps) {
  const params = parseFeedParams(await searchParams);
  const queryClient = getQueryClient();
  const options = articleListQueryOptions(params);
  const [data, authors] = await Promise.all([
    queryClient.query(options),
    fetchAuthors(),
  ]);
  const authorNames = Object.fromEntries(
    authors.map((author) => [author.id, author.name]),
  );

  const pageLinks = getFeedPageLinks(params, data.pageCount);
  const prevHref =
    data.page > 1 ? feedHref({ ...params, page: data.page - 1 }) : undefined;
  const nextHref =
    data.page < data.pageCount
      ? feedHref({ ...params, page: data.page + 1 })
      : undefined;
  const pageSizeHrefs = Object.fromEntries(
    FEED_PAGE_SIZE_OPTIONS.map((size) => [
      String(size),
      feedHref({ ...params, pageSize: size, page: 1 }),
    ]),
  );

  return (
    <>
      <FeedSearchBar
        q={params.q}
        author={params.author}
        pageSize={params.pageSize}
      />

      <HydrationBoundary state={dehydrate(queryClient)}>
        <FeedArticleList params={params} authorNames={authorNames} />
      </HydrationBoundary>

      <FeedPagination
        page={data.page}
        pageCount={data.pageCount}
        pageSize={data.pageSize}
        pageLinks={pageLinks}
        prevHref={prevHref}
        nextHref={nextHref}
        pageSizeOptions={[...FEED_PAGE_SIZE_OPTIONS]}
        pageSizeHrefs={pageSizeHrefs}
      />
    </>
  );
}
