import { NextResponse } from "next/server";

import { clearSessionCookie } from "@/auth/cookie";

export async function POST() {
  const response = NextResponse.json({ ok: true });
  clearSessionCookie(response);
  return response;
}
