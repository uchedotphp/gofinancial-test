import type { ReactNode } from "react";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-1 flex-col justify-center py-6 sm:py-10">
      {children}
    </div>
  );
}
