import { NextResponse } from "next/server";

import { SESSION_COOKIE } from "@/auth/constants";
import {
  clearAuthFromCookie,
  sessionCookieOptions,
  signSession,
} from "@/auth/cookie";
import { safeLoginRedirect, verifyLoginCredentials } from "@/auth/credentials";
import {
  loginFieldErrors,
  loginSchema,
  parseLoginFormData,
} from "@/auth/login-schema";

export async function POST(request: Request) {
  const formData = await request.formData();
  const parsed = loginSchema.safeParse(parseLoginFormData(formData));

  if (!parsed.success) {
    return NextResponse.json(
      { fieldErrors: loginFieldErrors(parsed.error.issues) },
      { status: 400 },
    );
  }

  const { email, password, from } = parsed.data;
  const result = await verifyLoginCredentials(email, password);

  if (!result.ok) {
    return NextResponse.json({ error: result.error }, { status: 401 });
  }

  const redirect = safeLoginRedirect(from);
  const response = NextResponse.json({
    session: result.session,
    redirect,
  });

  response.cookies.set(
    SESSION_COOKIE,
    signSession(result.session),
    sessionCookieOptions(),
  );
  clearAuthFromCookie(response);

  return response;
}
