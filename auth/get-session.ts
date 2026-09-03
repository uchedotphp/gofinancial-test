import { cookies } from "next/headers";
import { cache } from "react";

import { SESSION_COOKIE } from "@/auth/constants";
import { verifySessionCookie } from "@/auth/cookie";
import type { Session } from "@/auth/types";

export const getSession = cache(async (): Promise<Session | null> => {
  const cookieStore = await cookies();
  const value = cookieStore.get(SESSION_COOKIE)?.value;
  return value ? verifySessionCookie(value) : null;
});
