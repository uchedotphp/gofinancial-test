import { DEMO_PASSWORD } from "@/auth/constants";
import { isStudioPath } from "@/auth/cookie";
import type { Session } from "@/auth/types";
import type { AuthorId } from "@/authors/types";
import { api } from "@/lib/api/client";
import { routes } from "@/lib/routes";

type PlaceholderUserWithEmail = {
  id: number;
  name: string;
  email: string;
};

async function findAuthorByEmail(
  email: string,
): Promise<{ id: AuthorId; name: string } | null> {
  const response = await api.get<PlaceholderUserWithEmail[]>("/users");
  const user = response.data.find(
    (entry) => entry.email.toLowerCase() === email.toLowerCase(),
  );

  if (!user) {
    return null;
  }

  return { id: user.id, name: user.name };
}

export function safeLoginRedirect(from?: string) {
  if (from && isStudioPath(from)) {
    return from;
  }
  return routes.studio;
}

export async function verifyLoginCredentials(
  email: string,
  password: string,
): Promise<{ ok: true; session: Session } | { ok: false; error: string }> {
  if (password !== DEMO_PASSWORD) {
    return { ok: false, error: "Invalid email or password." };
  }

  const author = await findAuthorByEmail(email);
  if (!author) {
    return { ok: false, error: "Invalid email or password." };
  }

  return {
    ok: true,
    session: { authorId: author.id, name: author.name },
  };
}
