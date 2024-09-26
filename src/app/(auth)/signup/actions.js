"use server";

import { lucia } from "@/auth";
import prisma from "@/lib/prisma";
import { signUpSchema } from "@/lib/validation";
import bcrypt from "bcrypt"; // New import
import { generateIdFromEntropySize } from "lucia";
import { isRedirectError } from "next/dist/client/components/redirect";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function signUp(credentials) {
  try {
    const { username, email, password, role } = signUpSchema.parse(credentials);

    // bcrypt to hash the password
    const saltRounds = 12; // adjust this value based on your security needs
    const passwordHash = await bcrypt.hash(password, saltRounds);

    const userId = generateIdFromEntropySize(10);

    const existingEmail = await prisma.user.findFirst({
      where: {
        email: {
          equals: email,
          mode: "insensitive",
        },
      },
    });

    if (existingEmail) {
      return {
        error: "Email already exists.",
      };
    }

    await prisma.user.create({
      data: {
        id: userId,
        username,
        email,
        passwordHash,
        role,
      },
    });

    const session = await lucia.createSession(userId, {});
    const sessionCookie = lucia.createSessionCookie(session.id);
    cookies().set(
      sessionCookie.name,
      sessionCookie.value,
      sessionCookie.attributes
    );

    return redirect("/home");
  } catch (error) {
    if (isRedirectError(error)) throw error;
    console.error(error);
    return {
      error: "Something went wrong. Please try again later.",
    };
  }
}
