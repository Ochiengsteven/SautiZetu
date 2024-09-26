import { z } from "zod";

const requiredString = z.string().trim().min(1, "Required");

export const signUpSchema = z.object({
  username: requiredString.regex(/^[a-zA-Z0-9_ ]{3,30}$/, "Invalid username"), // Updated to allow spaces
  email: requiredString.email("Invalid email address"),
  password: requiredString.min(6, "Password must be at least 6 characters"),
  //   displayName: z.string().min(3).max(30),
  //   role: z.enum(["GUEST", "ADMIN", "HOST", "MODERATOR"]),
  //   avatarUrl: z.string().url().optional(),
});

export const loginSchema = z.object({
  email: requiredString,
  password: requiredString,
});
