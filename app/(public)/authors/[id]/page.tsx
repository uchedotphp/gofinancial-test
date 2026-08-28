import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { cache, Suspense } from "react";

import {
  ArticleListEmpty,
  ArticleListSkeleton,
  ArticleListView,
} from "@/articles/components/article-list-view";
import { fetchArticlesByAuthor } from "@/articles/queries";
import type { AuthorId } from "@/articles/types";
import { fetchAuthor } from "@/authors/queries";
import { PageShell } from "@/components/page-shell";
import { PageTitle } from "@/components/typography";
import { routes } from "@/lib/routes";

type AuthorPageProps = {
  params: Promise<{ id: string }>;
};

function parseAuthorId(id: string): AuthorId | null {
  const parsed = Number(id);
  if (!Number.isInteger(parsed) || parsed < 1) {
    return null;
  }
  return parsed;
}

const getAuthor = cache(async (id: AuthorId) => fetchAuthor(id));

export async function generateMetadata({
  params,
}: AuthorPageProps): Promise<Metadata> {
  const { id } = await params;
  const authorId = parseAuthorId(id);
  if (!authorId) {
    return {};
  }

  const author = await getAuthor(authorId);
  if (!author) {
    return {};
  }

  return {
    title: author.name,
  };
}

async function AuthorArticles({ authorId }: { authorId: AuthorId }) {
  const articles = await fetchArticlesByAuthor(authorId);

  if (articles.length === 0) {
    return <ArticleListEmpty message="No articles yet." />;
  }

  const items = articles.map((article) => ({
    id: article.id,
    title: article.title,
    body: article.body,
    href: routes.article(article.id),
  }));

  return <ArticleListView items={items} />;
}

export default async function AuthorPage({ params }: AuthorPageProps) {
  const { id } = await params;
  const authorId = parseAuthorId(id);
  if (!authorId) {
    notFound();
  }

  const author = await getAuthor(authorId);
  if (!author) {
    notFound();
  }

  return (
    <PageShell>
      <p className="text-muted text-sm">Author</p>
      <PageTitle className="mt-2 text-balance">{author.name}</PageTitle>
      <p className="text-muted mt-3 text-sm">{author.company}</p>

      <Suspense fallback={<ArticleListSkeleton />}>
        <AuthorArticles authorId={author.id} />
      </Suspense>
    </PageShell>
  );
}
