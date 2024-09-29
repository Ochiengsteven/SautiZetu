"use server";

import prisma from "@/lib/prisma";
import { validateRequest } from "@/auth";

export async function createCrowdfund(formData) {
  try {
    const session = await validateRequest();
    if (!session || !session.user) {
      return { success: false, error: "User not authenticated" };
    }

    const title = formData.get("title");
    const description = formData.get("description");
    const targetAmount = parseFloat(formData.get("targetAmount"));

    const newCrowdfund = await prisma.crowdfund.create({
      data: {
        title,
        description,
        targetAmount,
        creator: { connect: { id: session.user.id } },
      },
    });

    return { success: true, crowdfund: newCrowdfund };
  } catch (error) {
    console.error("Failed to create crowdfund:", error);
    return { success: false, error: "Failed to create crowdfund" };
  }
}

export async function getAllCrowdfunds() {
  try {
    const crowdfunds = await prisma.crowdfund.findMany({
      orderBy: { createdAt: "desc" },
      include: {
        creator: true,
        signatories: true,
        contributions: {
          include: {
            contributor: true,
          },
          orderBy: {
            amount: "desc",
          },
        },
      },
    });
    return { success: true, crowdfunds };
  } catch (error) {
    console.error("Failed to fetch crowdfunds:", error);
    return { success: false, error: "Failed to fetch crowdfunds" };
  }
}

export async function contributeToFund(formData) {
  try {
    const session = await validateRequest();
    if (!session || !session.user) {
      return { success: false, error: "User not authenticated" };
    }

    const crowdfundId = formData.get("crowdfundId");
    const amount = parseFloat(formData.get("amount"));

    // Start a transaction
    const result = await prisma.$transaction(async (prisma) => {
      // Create the contribution
      const contribution = await prisma.contribution.create({
        data: {
          amount,
          contributor: { connect: { id: session.user.id } },
          crowdfund: { connect: { id: crowdfundId } },
        },
      });

      // Update the crowdfund's current amount
      const updatedCrowdfund = await prisma.crowdfund.update({
        where: { id: crowdfundId },
        data: { currentAmount: { increment: amount } },
        include: {
          creator: true,
          signatories: true,
          contributions: {
            include: {
              contributor: true,
            },
            orderBy: {
              amount: "desc",
            },
          },
        },
      });

      // Check if the target amount has been reached
      if (updatedCrowdfund.currentAmount >= updatedCrowdfund.targetAmount) {
        await prisma.crowdfund.update({
          where: { id: crowdfundId },
          data: { status: "COMPLETED" },
        });
      }

      return { contribution, updatedCrowdfund };
    });

    return { success: true, result };
  } catch (error) {
    console.error("Failed to contribute to fund:", error);
    return { success: false, error: "Failed to contribute to fund" };
  }
}

export async function addSignatory(formData) {
  try {
    const session = await validateRequest();
    if (!session || !session.user) {
      return { success: false, error: "User not authenticated" };
    }

    const crowdfundId = formData.get("crowdfundId");
    const userId = formData.get("userId");

    const signatory = await prisma.crowdfundSignatory.create({
      data: {
        crowdfund: { connect: { id: crowdfundId } },
        user: { connect: { id: userId } },
      },
    });

    return { success: true, signatory };
  } catch (error) {
    console.error("Failed to add signatory:", error);
    return { success: false, error: "Failed to add signatory" };
  }
}

export async function initiateWithdrawal(formData) {
  try {
    const session = await validateRequest();
    if (!session || !session.user) {
      return { success: false, error: "User not authenticated" };
    }

    const crowdfundId = formData.get("crowdfundId");
    const amount = parseFloat(formData.get("amount"));

    // Check if the user is a signatory
    const isSignatory = await prisma.crowdfundSignatory.findUnique({
      where: {
        crowdfundId_userId: {
          crowdfundId: crowdfundId,
          userId: session.user.id,
        },
      },
    });

    if (!isSignatory) {
      return { success: false, error: "User is not a signatory" };
    }

    // Check if there are at least 3 signatories
    const signatoryCount = await prisma.crowdfundSignatory.count({
      where: { crowdfundId: crowdfundId },
    });

    if (signatoryCount < 3) {
      return {
        success: false,
        error: "At least 3 signatories are required for withdrawal",
      };
    }

    // Simulate the withdrawal (in a real scenario, you'd implement actual withdrawal logic here)
    const updatedCrowdfund = await prisma.crowdfund.update({
      where: { id: crowdfundId },
      data: { currentAmount: { decrement: amount } },
    });

    return { success: true, message: "Withdrawal initiated", updatedCrowdfund };
  } catch (error) {
    console.error("Failed to initiate withdrawal:", error);
    return { success: false, error: "Failed to initiate withdrawal" };
  }
}
