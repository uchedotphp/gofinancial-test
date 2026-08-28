export const routes = {
  home: "/",
  login: "/login",
  studio: "/studio",
  bookmarks: "/studio/bookmarks",
  article: (id: string | number) => `/articles/${id}`,
  author: (id: string | number) => `/authors/${id}`,
} as const;

export const primaryNav = [
  { href: routes.home, label: "Articles" },
  { href: routes.studio, label: "Studio" },
] as const;

export const studioNav = [
  { href: routes.studio, label: "My articles" },
  { href: routes.bookmarks, label: "Bookmarks" },
] as const;
