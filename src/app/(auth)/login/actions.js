"use server";

import { isRedirectError } from "next/dist/client/components/redirect";
import { loginSchema } from "@/lib/validation";
import prisma from "@/lib/prisma";
import bcrypt from "bcrypt";
import { lucia } from "@/auth";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function login(credentials) {
  try {
    const { email, password } = loginSchema.parse(credentials);

    const existingUser = await prisma.user.findFirst({
      where: {
        email: email,
      },
    });

    if (!existingUser || !existingUser.passwordHash) {
      return {
        error: "Invalid email or password.",
      };
    }

    const passwordValid = await bcrypt.compare(
      password,
      existingUser.passwordHash
    );

    if (!passwordValid) {
      return {
        error: "Invalid email or password.",
      };
    }

    const session = await lucia.createSession(existingUser.id, {});
    const sessionCookie = lucia.createSessionCookie(session.id);
    cookies().set(
      sessionCookie.name,
      sessionCookie.value,
      sessionCookie.attributes
    );

    return redirect("/");
  } catch (error) {
    if (isRedirectError(error)) throw error;
    console.error(error);
    return {
      error: "An error occurred while logging in.",
    };
  }
}
