import { fetchArticleComments } from "@/articles/queries";
import type { ArticleId } from "@/articles/types";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

type CommentListItem = {
  id: number;
  name: string;
  body: string;
};

type CommentListProps = {
  items: CommentListItem[];
};

function CommentList({ items }: CommentListProps) {
  return (
    <ul className="space-y-4">
      {items.map((comment) => (
        <li key={comment.id}>
          <Card className="border-rule bg-surface gap-0 rounded-lg py-0 shadow-none">
            <CardHeader className="gap-0 px-5 pt-5 pb-0 sm:px-6 sm:pt-6">
              <CardTitle className="text-ink text-sm font-medium">
                {comment.name}
              </CardTitle>
            </CardHeader>
            <CardContent className="text-muted px-5 pt-3 pb-5 text-sm leading-relaxed sm:px-6 sm:pb-6">
              <p className="whitespace-pre-wrap">{comment.body}</p>
            </CardContent>
          </Card>
        </li>
      ))}
    </ul>
  );
}

export function CommentListSkeleton() {
  return (
    <ul className="space-y-4" aria-hidden>
      {Array.from({ length: 3 }).map((_, index) => (
        <li key={index}>
          <Card className="border-rule bg-surface gap-4 rounded-lg py-5 shadow-none">
            <CardHeader className="gap-3 px-5 sm:px-6">
              <Skeleton className="bg-rule/70 h-4 w-32" />
            </CardHeader>
            <CardContent className="space-y-2 px-5 sm:px-6">
              <Skeleton className="bg-rule/50 h-4 w-full" />
              <Skeleton className="bg-rule/50 h-4 w-5/6" />
            </CardContent>
          </Card>
        </li>
      ))}
    </ul>
  );
}

type ArticleCommentsProps = {
  articleId: ArticleId;
};

export async function ArticleComments({ articleId }: ArticleCommentsProps) {
  const comments = await fetchArticleComments(articleId);

  if (comments.length === 0) {
    return <p className="text-muted text-sm">No comments yet.</p>;
  }

  const items = comments.map((comment) => ({
    id: comment.id,
    name: comment.name,
    body: comment.body,
  }));

  return <CommentList items={items} />;
}
