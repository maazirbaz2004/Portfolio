import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function GET() {
  try {
    // Resolve the path to docs/pic.png in the project root
    const filePath = path.join(process.cwd(), "docs", "pic.png");

    if (!fs.existsSync(filePath)) {
      return new NextResponse("Image Not Found", { status: 404 });
    }

    // Read the binary file content
    const fileBuffer = fs.readFileSync(filePath);

    // Return image with appropriate headers
    return new NextResponse(fileBuffer, {
      headers: {
        "Content-Type": "image/png",
        "Cache-Control": "public, max-age=86400", // Cache for 24 hours
      },
    });
  } catch (error) {
    console.error("Error serving profile image:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
