import { create } from "zustand";

import type { Session } from "@/session/types";

type SessionStore = {
  session: Session | null;
  status: "pending" | "ready";
  setSession: (session: Session | null) => void;
};

export const useSessionStore = create<SessionStore>((set) => ({
  session: null,
  status: "pending",
  setSession: (session) => set({ session, status: "ready" }),
}));
