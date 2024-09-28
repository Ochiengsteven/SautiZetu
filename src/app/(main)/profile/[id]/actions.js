"use server";

import prisma from "@/lib/prisma";
import bcrypt from "bcrypt";
import { writeFile } from "fs/promises";
import path from "path";

export async function updateUsername(userId, newUsername) {
  try {
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: { username: newUsername },
    });
    return { success: true, user: updatedUser };
  } catch (error) {
    console.error("Failed to update username:", error);
    return { success: false, error: "Failed to update username" };
  }
}

export async function changePassword(userId, newPassword) {
  try {
    const hashedPassword = await bcrypt.hash(newPassword, 12);
    await prisma.user.update({
      where: { id: userId },
      data: { passwordHash: hashedPassword },
    });
    return { success: true };
  } catch (error) {
    console.error("Failed to change password:", error);
    return { success: false, error: "Failed to change password" };
  }
}

export async function updateAvatar(userId, file) {
  try {
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Create a unique filename
    const filename = `${userId}-${Date.now()}${path.extname(file.name)}`;
    const filepath = path.join(process.cwd(), "public", "uploads", filename);

    // Write the file to the server
    await writeFile(filepath, buffer);

    // Update the user's avatarUrl in the database
    const avatarUrl = `/uploads/${filename}`;
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: { avatarUrl },
    });

    return { success: true, user: updatedUser };
  } catch (error) {
    console.error("Failed to update avatar:", error);
    return { success: false, error: "Failed to update avatar" };
  }
}
