import type { Metadata } from "next";
import { cookies } from "next/headers";

import { PageShell } from "@/components/page-shell";
import { PageDescription, PageTitle } from "@/components/typography";
import { AUTH_FROM_COOKIE } from "@/session/constants";
import { LoginForm } from "./_components/login-form";

export const metadata: Metadata = {
  title: "Sign in",
};

export default async function LoginPage() {
  const cookieStore = await cookies();
  const from = cookieStore.get(AUTH_FROM_COOKIE)?.value;

  return (
    <PageShell narrow>
      <PageTitle>Sign in</PageTitle>
      <PageDescription>Access Studio with your author account.</PageDescription>
      <p className="text-muted mt-4 text-sm">
        Demo: <span className="text-ink">Sincere@april.biz</span> /{" "}
        <span className="text-ink">demo</span>
      </p>
      <LoginForm from={from} />
    </PageShell>
  );
}
