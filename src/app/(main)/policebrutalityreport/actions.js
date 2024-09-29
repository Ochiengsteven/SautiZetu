"use server";

import prisma from "@/lib/prisma";
import { validateRequest } from "@/auth";

export async function getAllPoliceBrutalityReports() {
  try {
    const reports = await prisma.policeBrutalityReport.findMany({
      orderBy: { createdAt: "desc" },
      include: {
        reporter: true, // Include reporter details
      },
    });
    return { success: true, reports };
  } catch (error) {
    console.error("Failed to fetch reports:", error);
    return { success: false, error: "Failed to fetch reports" };
  }
}

export async function addPoliceBrutalityReport(formData) {
  try {
    const title = formData.get("title");
    const date = formData.get("date");
    const location = formData.get("location");
    const description = formData.get("description");
    const evidenceFiles = formData.getAll("evidence");

    const session = await validateRequest();
    if (!session || !session.user) {
      return { success: false, error: "User not authenticated" };
    }

    // Process each file and prepare for database storage
    const evidenceData = await Promise.all(
      evidenceFiles.map(async (file) => {
        if (file instanceof File) {
          const buffer = await file.arrayBuffer();
          const base64Data = Buffer.from(buffer).toString("base64");
          return {
            filename: file.name,
            mimeType: file.type,
            data: base64Data,
          };
        }
        return null;
      })
    );

    // Filter out any null values (non-file inputs)
    const validEvidenceData = evidenceData.filter((item) => item !== null);

    const newReport = await prisma.policeBrutalityReport.create({
      data: {
        title,
        date: new Date(date),
        location,
        description,
        evidence: validEvidenceData,
        reporterId: session.user.id,
      },
    });

    return { success: true, report: newReport };
  } catch (error) {
    console.error("Failed to add report:", error);
    return { success: false, error: "Failed to add report" };
  }
}
