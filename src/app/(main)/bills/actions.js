"use server";

import prisma from "@/lib/prisma";
import { validateRequest } from "@/auth";

export async function getAllBills() {
  try {
    const bills = await prisma.bill.findMany({
      orderBy: { proposedDate: "desc" },
    });
    return { success: true, bills };
  } catch (error) {
    console.error("Failed to fetch bills:", error);
    return { success: false, error: "Failed to fetch bills" };
  }
}

export async function addBill(formData) {
  try {
    const title = formData.get("title");
    const description = formData.get("description");
    const status = formData.get("status");
    const proposedBy = formData.get("proposedBy");
    const proposedDate = new Date(formData.get("proposedDate"));

    const newBill = await prisma.bill.create({
      data: {
        title,
        description,
        status,
        proposedBy,
        proposedDate,
      },
    });

    return { success: true, bill: newBill };
  } catch (error) {
    console.error("Failed to add bill:", error);
    return { success: false, error: "Failed to add bill" };
  }
}

export async function createForumPost(postData) {
  try {
    const session = await validateRequest(); // Get the current session
    if (!session || !session.user) {
      return { success: false, error: "User not authenticated" };
    }

    const newPost = await prisma.forumPost.create({
      data: {
        title: postData.title,
        content: postData.content,
        author: {
          connect: { id: session.user.id }, // Connect the post to the current user
        },
        bill: {
          connect: { id: postData.billId }, // Connect the post to the bill
        },
      },
    });

    return { success: true, post: newPost };
  } catch (error) {
    console.error("Failed to create forum post:", error);
    return { success: false, error: "Failed to create forum post" };
  }
}
