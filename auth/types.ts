import type { AuthorId } from "@/authors/types";

export type Session = {
  authorId: AuthorId;
  name: string;
};
