import { PageShell } from "@/components/page-shell";
import { PageTitle } from "@/components/typography";

type ArticlePageProps = {
  params: Promise<{ id: string }>;
};

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { id } = await params;

  return (
    <PageShell narrow>
      <p className="text-muted text-sm">Article</p>
      <PageTitle className="mt-2">#{id}</PageTitle>
    </PageShell>
  );
}
