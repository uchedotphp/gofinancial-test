import type { Metadata } from "next";

import { BookmarkList } from "@/bookmarks/components/bookmark-list";
import { PageShell } from "@/components/page-shell";
import { PageDescription, PageTitle } from "@/components/typography";

export const metadata: Metadata = {
  title: "Bookmarks",
};

export default function BookmarksPage() {
  return (
    <PageShell>
      <PageTitle>Bookmarks</PageTitle>
      <PageDescription>Saved articles for later.</PageDescription>
      <BookmarkList />
    </PageShell>
  );
}
