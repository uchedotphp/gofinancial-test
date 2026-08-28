import type { Metadata } from "next";

import { PageShell } from "@/components/page-shell";
import { PageDescription, PageTitle } from "@/components/typography";
import { BookmarkList } from "./_components/bookmark-list";

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
