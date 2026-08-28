export type ArticleId = number;
export type AuthorId = number;

export type Article = {
  id: ArticleId;
  authorId: AuthorId;
  title: string;
  body: string;
};

export type ArticleListItem = {
  id: ArticleId;
  title: string;
  body: string;
  href: string;
  authorHref?: string;
  authorLabel?: string;
};

export type ArticleListParams = {
  q?: string;
  page: number;
  author?: AuthorId;
  pageSize?: number;
};

export type ArticleListResult = {
  items: Article[];
  total: number;
  page: number;
  pageSize: number;
  pageCount: number;
};

export type Comment = {
  id: number;
  articleId: ArticleId;
  name: string;
  body: string;
};

/** JSONPlaceholder post shape — stays behind the mapper in queries.ts. */
export type Post = {
  userId: number;
  id: number;
  title: string;
  body: string;
};

/** JSONPlaceholder comment — stays behind the mapper in queries.ts. */
export type PlaceholderComment = {
  postId: number;
  id: number;
  name: string;
  email: string;
  body: string;
};
