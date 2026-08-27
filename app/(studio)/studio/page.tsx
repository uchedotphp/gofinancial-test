import { PageShell } from "@/components/page-shell";
import { PageDescription, PageTitle } from "@/components/typography";

export default function StudioPage() {
  return (
    <PageShell>
      <PageTitle>My articles</PageTitle>
      <PageDescription>Articles published under your account.</PageDescription>
    </PageShell>
  );
}
