import { PageShell } from "@/components/page-shell";
import { PageTitle } from "@/components/typography";

type AuthorPageProps = {
  params: Promise<{ id: string }>;
};

export default async function AuthorPage({ params }: AuthorPageProps) {
  const { id } = await params;

  return (
    <PageShell>
      <p className="text-muted text-sm">Author</p>
      <PageTitle className="mt-2">#{id}</PageTitle>
    </PageShell>
  );
}
