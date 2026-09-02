import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().min(1, "Email is required").email("Enter a valid email"),
  password: z.string().min(1, "Password is required"),
  from: z.string().optional(),
});

export type LoginInput = z.infer<typeof loginSchema>;

export type LoginFieldErrors = {
  email?: string;
  password?: string;
};

export function parseLoginFormData(formData: FormData): LoginInput {
  const from = String(formData.get("from") ?? "").trim();

  return {
    email: String(formData.get("email") ?? ""),
    password: String(formData.get("password") ?? ""),
    from: from || undefined,
  };
}

export function loginFieldErrors(issues: z.core.$ZodIssue[]): LoginFieldErrors {
  const errors: LoginFieldErrors = {};

  for (const issue of issues) {
    const field = issue.path[0];
    if ((field === "email" || field === "password") && !errors[field]) {
      errors[field] = issue.message;
    }
  }

  return errors;
}
