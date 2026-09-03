import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { Suspense } from "react";

import {
  ArticleListEmpty,
  ArticleListSkeleton,
  ArticleListView,
} from "@/articles/components/article-list-view";
import { fetchArticlesByAuthor } from "@/articles/queries";
import { getSession } from "@/auth/get-session";
import type { AuthorId } from "@/authors/types";
import { PageShell } from "@/components/page-shell";
import { PageDescription, PageTitle } from "@/components/typography";
import { routes } from "@/lib/routes";

export const metadata: Metadata = {
  title: "My articles",
};

async function MyArticles({ authorId }: { authorId: AuthorId }) {
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

export default async function StudioPage() {
  const session = await getSession();
  if (!session) {
    redirect(routes.login);
  }

  return (
    <PageShell>
      <PageTitle>My articles</PageTitle>
      <PageDescription>Articles published under your account.</PageDescription>
      <Suspense fallback={<ArticleListSkeleton />}>
        <MyArticles authorId={session.authorId} />
      </Suspense>
    </PageShell>
  );
}
