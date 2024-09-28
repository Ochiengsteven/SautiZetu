"use server";

import prisma from "@/lib/prisma";
import { validateRequest } from "@/auth";

export async function getAllForums() {
  try {
    const forums = await prisma.forumPost.findMany({
      orderBy: { createdAt: "desc" },
      include: {
        author: { select: { username: true } },
        bill: { select: { title: true } },
        _count: { select: { comments: true } },
      },
    });
    return { success: true, forums };
  } catch (error) {
    console.error("Failed to fetch forums:", error);
    return { success: false, error: "Failed to fetch forums" };
  }
}

export async function addForum(formData) {
  try {
    const session = await validateRequest();
    if (!session || !session.user) {
      return { success: false, error: "User not authenticated" };
    }

    const title = formData.get("title");
    const content = formData.get("content");
    const billId = formData.get("billId");

    const newForum = await prisma.forumPost.create({
      data: {
        title,
        content,
        author: { connect: { id: session.user.id } },
        bill: billId ? { connect: { id: billId } } : undefined,
      },
    });

    return { success: true, forum: newForum };
  } catch (error) {
    console.error("Failed to add forum:", error);
    return { success: false, error: "Failed to add forum" };
  }
}

export async function getForumComments(forumId) {
  try {
    const comments = await prisma.forumComment.findMany({
      where: { postId: forumId },
      orderBy: { createdAt: "asc" },
      include: { author: { select: { username: true } } },
    });
    return { success: true, comments };
  } catch (error) {
    console.error("Failed to fetch comments:", error);
    return { success: false, error: "Failed to fetch comments" };
  }
}

export async function addComment(formData) {
  try {
    const session = await validateRequest();
    if (!session || !session.user) {
      return { success: false, error: "User not authenticated" };
    }

    const content = formData.get("content");
    const postId = formData.get("postId");

    const newComment = await prisma.forumComment.create({
      data: {
        content,
        author: { connect: { id: session.user.id } },
        post: { connect: { id: postId } },
      },
      include: {
        author: {
          select: { username: true },
        },
      },
    });

    return { success: true, comment: newComment };
  } catch (error) {
    console.error("Failed to add comment:", error);
    return { success: false, error: "Failed to add comment" };
  }
}
