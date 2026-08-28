import { cookies } from "next/headers";
import { cache } from "react";

import { verifySessionCookie } from "@/lib/auth";
import { SESSION_COOKIE } from "@/session/constants";
import type { Session } from "@/session/types";

export const getSession = cache(async (): Promise<Session | null> => {
  const cookieStore = await cookies();
  const value = cookieStore.get(SESSION_COOKIE)?.value;
  return value ? verifySessionCookie(value) : null;
});
