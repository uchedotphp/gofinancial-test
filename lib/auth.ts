import { createHmac, timingSafeEqual } from "node:crypto";

import type { NextResponse } from "next/server";

import { routes } from "@/lib/routes";
import { AUTH_FROM_COOKIE, SESSION_COOKIE } from "@/session/constants";
import type { Session } from "@/session/types";

export { SESSION_COOKIE };

function getSecret() {
  const secret = process.env.AUTH_SECRET;
  if (!secret) {
    throw new Error("AUTH_SECRET is not set");
  }
  return secret;
}

function signPayload(payload: string) {
  return createHmac("sha256", getSecret()).update(payload).digest("base64url");
}

export function signSession(session: Session): string {
  const payload = `${session.authorId}:${session.name}`;
  return `${Buffer.from(payload, "utf8").toString("base64url")}.${signPayload(payload)}`;
}

export function verifySessionCookie(value: string): Session | null {
  const dot = value.lastIndexOf(".");
  if (dot === -1) {
    return null;
  }

  const encoded = value.slice(0, dot);
  const signature = value.slice(dot + 1);

  let payload: string;
  try {
    payload = Buffer.from(encoded, "base64url").toString("utf8");
  } catch {
    return null;
  }

  const expected = signPayload(payload);
  const sigBuffer = Buffer.from(signature);
  const expectedBuffer = Buffer.from(expected);

  if (
    sigBuffer.length !== expectedBuffer.length ||
    !timingSafeEqual(sigBuffer, expectedBuffer)
  ) {
    return null;
  }

  const colon = payload.indexOf(":");
  if (colon === -1) {
    return null;
  }

  const authorId = Number(payload.slice(0, colon));
  const name = payload.slice(colon + 1);

  if (!Number.isInteger(authorId) || authorId < 1 || !name) {
    return null;
  }

  return { authorId, name };
}

export function isStudioPath(path: string) {
  return path === routes.studio || path.startsWith(`${routes.studio}/`);
}

export function sessionCookieOptions() {
  return {
    httpOnly: true,
    sameSite: "lax" as const,
    path: "/",
    secure: process.env.NODE_ENV === "production",
  };
}

export function clearSessionCookie(response: NextResponse) {
  response.cookies.delete({
    name: SESSION_COOKIE,
    path: "/",
  });
}

export function authFromCookieOptions() {
  return {
    httpOnly: true,
    sameSite: "lax" as const,
    path: "/",
    maxAge: 60 * 5,
    secure: process.env.NODE_ENV === "production",
  };
}

export function clearAuthFromCookie(response: NextResponse) {
  response.cookies.delete({
    name: AUTH_FROM_COOKIE,
    path: "/",
  });
}
