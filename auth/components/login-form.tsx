"use client";

import { Eye, EyeOff } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

import {
  loginFieldErrors,
  loginSchema,
  parseLoginFormData,
  type LoginFieldErrors,
} from "@/auth/login-schema";
import { useSessionStore } from "@/auth/store";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { routes } from "@/lib/routes";

type LoginFormProps = {
  from?: string;
};

type LoginResponse = {
  session?: { authorId: number; name: string };
  redirect?: string;
  error?: string;
  fieldErrors?: LoginFieldErrors;
};

export function LoginForm({ from }: LoginFormProps) {
  const router = useRouter();
  const setSession = useSessionStore((state) => state.setSession);
  const [clientErrors, setClientErrors] = useState<LoginFieldErrors>({});
  const [showPassword, setShowPassword] = useState(false);
  const [pending, setPending] = useState(false);

  function togglePasswordVisibility() {
    setShowPassword((current) => !current);
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const parsed = loginSchema.safeParse(parseLoginFormData(formData));

    if (!parsed.success) {
      setClientErrors(loginFieldErrors(parsed.error.issues));
      return;
    }

    setClientErrors({});
    setPending(true);

    try {
      const response = await fetch("/api/login", {
        method: "POST",
        body: formData,
      });
      const data = (await response.json()) as LoginResponse;

      if (!response.ok) {
        if (data.fieldErrors) {
          setClientErrors(data.fieldErrors);
          return;
        }

        toast.error(data.error ?? "Invalid email or password.");
        return;
      }

      if (data.session) {
        setSession(data.session);
      }

      toast.success("Signed in successfully.");
      router.push(data.redirect ?? routes.studio);
      router.refresh();
    } catch {
      toast.error("Sign in failed. Please try again.");
    } finally {
      setPending(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="mt-8 space-y-4">
      <div className="space-y-2">
        <Label htmlFor="login-email">Email</Label>
        <Input
          id="login-email"
          name="email"
          type="email"
          autoComplete="email"
          aria-invalid={clientErrors.email ? true : undefined}
          aria-describedby={
            clientErrors.email ? "login-email-error" : undefined
          }
        />
        {clientErrors.email ? (
          <p id="login-email-error" className="text-destructive text-sm">
            {clientErrors.email}
          </p>
        ) : null}
      </div>

      <div className="space-y-2">
        <Label htmlFor="login-password">Password</Label>
        <div className="relative">
          <Input
            id="login-password"
            name="password"
            type={showPassword ? "text" : "password"}
            autoComplete="current-password"
            className="pr-10"
            aria-invalid={clientErrors.password ? true : undefined}
            aria-describedby={
              clientErrors.password ? "login-password-error" : undefined
            }
          />
          <Button
            type="button"
            variant="ghost"
            size="icon-sm"
            className="text-muted hover:text-ink absolute top-1/2 right-1 -translate-y-1/2"
            aria-label={showPassword ? "Hide password" : "Show password"}
            onClick={togglePasswordVisibility}
          >
            {showPassword ? (
              <EyeOff className="size-4" />
            ) : (
              <Eye className="size-4" />
            )}
          </Button>
        </div>
        {clientErrors.password ? (
          <p id="login-password-error" className="text-destructive text-sm">
            {clientErrors.password}
          </p>
        ) : null}
      </div>

      {from ? <input type="hidden" name="from" value={from} /> : null}

      <Button type="submit" className="w-full" disabled={pending}>
        {pending ? "Signing in…" : "Sign in"}
      </Button>
    </form>
  );
}
