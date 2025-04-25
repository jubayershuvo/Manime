
import { getImageUrl } from "@/utils/wikipediaImage";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const title = searchParams.get("name");

  if (!title) {
    return NextResponse.json({ error: "Missing 'title' query param" }, { status: 400 });
  }

  try {
    const data = await getImageUrl(title);

    return NextResponse.json(data, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Unknown error" }, { status: 500 });
  }
}
