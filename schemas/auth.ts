import { z } from "zod";

export const SignUpSchema = z
  .object({
    email: z
      .string()
      .min(1, "Email address required!")
      .email("This email address is invalid!"),
    password: z
      .string()
      .min(1, "Password required!")
      .min(8, "Password must be 8 characters or longer!")
      .regex(/[a-z]/, "Please use at least one lowercase letter!")
      .regex(/[A-Z]/, "Please use at least one capital letter!")
      .regex(/\d/, "Password must contain at least one number!")
      .regex(
        /[^\w\s]/,
        "Password must contain at least one special character!"
      ),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match!",
    path: ["confirmPassword"],
  });

export type SignUpRequestBody = z.infer<typeof SignUpSchema>;
