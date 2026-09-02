import { redirect } from "next/navigation";
import type { ReactNode } from "react";

import { getSession } from "@/auth/get-session";
import { StudioNav } from "@/components/studio-nav";
import { routes } from "@/lib/routes";

export default async function StudioLayout({
  children,
}: {
  children: ReactNode;
}) {
  const session = await getSession();
  if (!session) {
    redirect(routes.login);
  }

  return (
    <div className="flex flex-1 flex-col">
      <div className="border-rule/70 bg-surface/50 border-b">
        <StudioNav />
      </div>
      {children}
    </div>
  );
}
