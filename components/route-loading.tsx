import { PageShell } from "@/components/page-shell";

type RouteLoadingProps = {
  narrow?: boolean;
};

export function RouteLoading({ narrow = false }: RouteLoadingProps) {
  return (
    <PageShell narrow={narrow}>
      <div aria-hidden>
        <div className="bg-rule/60 h-9 w-48 animate-pulse rounded sm:w-64" />
        <div className="bg-rule/40 mt-4 h-4 w-full max-w-md animate-pulse rounded" />
        <div className="bg-rule/35 mt-10 h-32 w-full animate-pulse rounded-lg" />
        <div className="bg-rule/30 mt-4 h-32 w-full animate-pulse rounded-lg" />
      </div>
    </PageShell>
  );
}
