export type AuthorId = number;

export type Author = {
  id: AuthorId;
  name: string;
  company: string;
};

/** JSONPlaceholder user — stays behind the mapper in queries.ts. */
export type PlaceholderUser = {
  id: number;
  name: string;
  company: {
    name: string;
  };
};
