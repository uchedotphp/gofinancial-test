"use client";

import { useEffect } from "react";

import "./globals.css";

type GlobalErrorProps = {
  error: Error & { digest?: string };
  retry: () => void;
};

export default function GlobalError({ error, retry }: GlobalErrorProps) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <html lang="en">
      <body className="bg-paper text-ink min-h-dvh font-sans antialiased">
        <main className="mx-auto flex min-h-dvh max-w-lg flex-col justify-center px-4 py-16">
          <title>Something went wrong · uchedotphp</title>
          <h1 className="font-serif text-3xl text-balance">
            Something went wrong
          </h1>
          <p className="text-muted mt-3 text-sm leading-relaxed">
            The app hit an unexpected error. You can try again.
          </p>
          <button
            type="button"
            className="bg-accent text-accent-foreground mt-8 inline-flex h-10 w-fit items-center justify-center rounded-md px-4 text-sm font-medium"
            onClick={retry}
          >
            Try again
          </button>
        </main>
      </body>
    </html>
  );
}
