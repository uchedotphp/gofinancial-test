import { NextResponse } from "next/server";

import {
  safeLoginRedirect,
  verifyLoginCredentials,
} from "@/app/(auth)/login/_lib/credentials";
import {
  loginFieldErrors,
  loginSchema,
  parseLoginFormData,
} from "@/app/(auth)/login/_lib/login-schema";
import {
  clearAuthFromCookie,
  sessionCookieOptions,
  signSession,
} from "@/lib/auth";
import { SESSION_COOKIE } from "@/session/constants";

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
