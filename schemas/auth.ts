import { z } from "zod";

export const SignUpSchema = z.object({
  username: z
    .string()
    .min(3, { message: " Username must be at least 3 characters long" })
    .max(20, { message: "Username must be at most 20 characters long" })
    .regex(/^\S+$/, { message: "Username must not contain spaces" })
    .regex(/^[a-zA-Z0-9_]+$/, {
      message: "Username can only contain letters, numbers and underscores",
    }),
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long" })
    .max(16, { message: "Password must be at most 16 characters long" }),
});
