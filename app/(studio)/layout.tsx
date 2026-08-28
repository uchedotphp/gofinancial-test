import { redirect } from "next/navigation";
import type { ReactNode } from "react";

import { routes } from "@/lib/routes";
import { getSession } from "@/session/get-session";
import { StudioNav } from "./_components/studio-nav";

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
