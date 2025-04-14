// app/api/upload/route.ts
import { put } from "@vercel/blob";
import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  const formData = await request.formData();
  const file = formData.get("image") as File;

  if (!file) {
    return new Response("No file uploaded", { status: 400 });
  }

  const blob = await put(file.name, file, {
    access: "public",
  });

  return Response.json({ url: blob.url });
}
