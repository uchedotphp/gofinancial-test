"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { useSessionStore } from "@/auth/store";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { routes } from "@/lib/routes";
import { cn } from "@/utils/cn";

type HeaderAuthProps = {
  className?: string;
  linkClassName?: string;
  onNavigate?: () => void;
};

export function HeaderAuth({
  className,
  linkClassName,
  onNavigate,
}: HeaderAuthProps) {
  const router = useRouter();
  const session = useSessionStore((state) => state.session);
  const status = useSessionStore((state) => state.status);
  const setSession = useSessionStore((state) => state.setSession);

  async function handleSignOut() {
    try {
      await fetch("/api/logout", { method: "POST" });
      setSession(null);
      toast.success("Signed out successfully.");
      onNavigate?.();
      router.push(routes.home);
    } catch {
      toast.error("Sign out failed. Please try again.");
    }
  }

  if (status === "pending") {
    return <Skeleton className={cn("mx-3 h-4 w-20", className)} aria-hidden />;
  }

  if (session) {
    return (
      <div className={cn("flex items-center gap-2", className)}>
        <span className="text-muted text-sm">{session.name}</span>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          className={linkClassName}
          onClick={handleSignOut}
        >
          Sign out
        </Button>
      </div>
    );
  }

  return (
    <Link
      href={routes.login}
      className={cn(
        "text-muted hover:bg-rule/30 hover:text-ink rounded-md px-3 py-2 text-sm transition-colors",
        linkClassName,
      )}
      onClick={onNavigate}
    >
      Sign in
    </Link>
  );
}
