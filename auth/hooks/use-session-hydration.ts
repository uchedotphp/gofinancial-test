"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

import { useSessionStore } from "@/auth/store";

export function useSessionHydration() {
  const pathname = usePathname();
  const setSession = useSessionStore((state) => state.setSession);

  useEffect(() => {
    let cancelled = false;

    fetch("/api/session")
      .then((response) => response.json())
      .then((data: { session: { authorId: number; name: string } | null }) => {
        if (!cancelled) {
          setSession(data.session);
        }
      })
      .catch(() => {
        if (!cancelled) {
          setSession(null);
        }
      });

    return () => {
      cancelled = true;
    };
  }, [pathname, setSession]);
}
