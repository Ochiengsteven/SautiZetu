"use server";

import prisma from "@/lib/prisma";
import { validateRequest } from "@/auth";

export async function getAllWhistleblowerReports() {
  try {
    const reports = await prisma.whistleblowerReport.findMany({
      orderBy: { createdAt: "desc" },
      include: {
        reporter: true,
      },
    });
    return { success: true, reports };
  } catch (error) {
    console.error("Failed to fetch reports:", error);
    return { success: false, error: "Failed to fetch reports" };
  }
}

export async function addWhistleblowerReport(formData) {
  try {
    const title = formData.get("title");
    const description = formData.get("description");
    const evidenceFiles = formData.getAll("evidence"); // Array of file inputs

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

    // Validate file types
    const allowedMimeTypes = [
      "image/jpeg",
      "image/png",
      "image/gif",
      "application/pdf",
      "video/mp4",
      "video/quicktime",
    ];

    const invalidFiles = validEvidenceData.filter(
      (item) => !allowedMimeTypes.includes(item.mimeType)
    );

    if (invalidFiles.length > 0) {
      return {
        success: false,
        error: `Invalid file type(s): ${invalidFiles
          .map((f) => f.filename)
          .join(", ")}. Only images, PDFs, and videos are allowed.`,
      };
    }

    const newReport = await prisma.whistleblowerReport.create({
      data: {
        title,
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

export async function getEvidenceFile(reportId, fileIndex) {
  try {
    const report = await prisma.whistleblowerReport.findUnique({
      where: { id: reportId },
      select: { evidence: true },
    });

    if (!report || !report.evidence[fileIndex]) {
      return { success: false, error: "File not found" };
    }

    const file = report.evidence[fileIndex];
    return {
      success: true,
      file: {
        ...file,
        data: Buffer.from(file.data, "base64"),
      },
    };
  } catch (error) {
    console.error("Failed to fetch file:", error);
    return { success: false, error: "Failed to fetch file" };
  }
}
