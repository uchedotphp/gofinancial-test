import { PageShell } from "@/components/page-shell";
import { PageDescription, PageTitle } from "@/components/typography";

export default function LoginPage() {
  return (
    <PageShell narrow>
      <PageTitle>Sign in</PageTitle>
      <PageDescription>Access Studio with your author account.</PageDescription>
    </PageShell>
  );
}
