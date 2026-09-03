import { cookies } from "next/headers";
import { NextResponse } from "next/server";

import { SESSION_COOKIE } from "@/auth/constants";
import { verifySessionCookie } from "@/auth/cookie";

export async function GET() {
  const cookieStore = await cookies();
  const value = cookieStore.get(SESSION_COOKIE)?.value;
  const session = value ? verifySessionCookie(value) : null;

  return NextResponse.json({ session });
}
