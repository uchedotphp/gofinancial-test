import { cookies } from "next/headers";
import { NextResponse } from "next/server";

import { verifySessionCookie } from "@/lib/auth";
import { SESSION_COOKIE } from "@/session/constants";

export async function GET() {
  const cookieStore = await cookies();
  const value = cookieStore.get(SESSION_COOKIE)?.value;
  const session = value ? verifySessionCookie(value) : null;

  return NextResponse.json({ session });
}
