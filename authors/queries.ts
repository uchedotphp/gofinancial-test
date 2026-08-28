import { isAxiosError } from "axios";

import type { Author, AuthorId, PlaceholderUser } from "@/authors/types";
import { api } from "@/lib/api/client";

function userToAuthor(user: PlaceholderUser): Author {
  return {
    id: user.id,
    name: user.name,
    company: user.company.name,
  };
}

export async function fetchAuthor(id: AuthorId): Promise<Author | null> {
  try {
    const response = await api.get<PlaceholderUser>(`/users/${id}`);
    return userToAuthor(response.data);
  } catch (error) {
    if (isAxiosError(error) && error.response?.status === 404) {
      return null;
    }
    throw error;
  }
}

export async function fetchAuthors(): Promise<Author[]> {
  const response = await api.get<PlaceholderUser[]>("/users");
  return response.data.map(userToAuthor);
}
