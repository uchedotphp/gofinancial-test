import { ArticleListSkeleton } from "@/articles/components/article-list-view";
import { Skeleton } from "@/components/ui/skeleton";

export default function FeedLoading() {
  return (
    <>
      <Skeleton className="bg-rule/50 mt-8 h-10 w-full sm:max-w-xl" />
      <ArticleListSkeleton />
    </>
  );
}
