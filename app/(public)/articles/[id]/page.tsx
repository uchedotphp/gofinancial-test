import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { cache, Suspense } from "react";

import { fetchArticle } from "@/articles/queries";
import type { ArticleId } from "@/articles/types";
import { fetchAuthor } from "@/authors/queries";
import { PageShell } from "@/components/page-shell";
import { PageTitle } from "@/components/typography";
import { routes } from "@/lib/routes";
import {
  ArticleComments,
  CommentListSkeleton,
} from "./_components/article-comments";

type ArticlePageProps = {
  params: Promise<{ id: string }>;
};

function parseArticleId(id: string): ArticleId | null {
  const parsed = Number(id);
  if (!Number.isInteger(parsed) || parsed < 1) {
    return null;
  }
  return parsed;
}

const getArticle = cache(async (id: ArticleId) => fetchArticle(id));

export async function generateMetadata({
  params,
}: ArticlePageProps): Promise<Metadata> {
  const { id } = await params;
  const articleId = parseArticleId(id);
  if (!articleId) {
    return {};
  }

  const article = await getArticle(articleId);
  if (!article) {
    return {};
  }

  return {
    title: article.title,
    description: article.body.slice(0, 160),
  };
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { id } = await params;
  const articleId = parseArticleId(id);
  if (!articleId) {
    notFound();
  }

  const article = await getArticle(articleId);
  if (!article) {
    notFound();
  }

  const author = await fetchAuthor(article.authorId);
  const authorHref = routes.author(article.authorId);
  const authorLabel = author?.name ?? `Author #${article.authorId}`;

  return (
    <PageShell narrow>
      <p className="text-muted text-sm">Article</p>
      <PageTitle className="mt-2 text-balance">{article.title}</PageTitle>
      <p className="text-muted mt-4 text-sm">
        <Link href={authorHref} className="hover:text-accent hover:underline">
          {authorLabel}
        </Link>
      </p>
      <div className="text-ink mt-8 text-base leading-relaxed whitespace-pre-wrap">
        {article.body}
      </div>

      <section className="mt-12">
        <h2 className="text-ink font-serif text-2xl font-normal">Comments</h2>
        <div className="mt-6">
          <Suspense fallback={<CommentListSkeleton />}>
            <ArticleComments articleId={article.id} />
          </Suspense>
        </div>
      </section>
    </PageShell>
  );
}
