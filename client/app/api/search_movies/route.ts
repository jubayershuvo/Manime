
import { searchMovies } from "@/utils/imdb";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const title = searchParams.get("title");

  if (!title) {
    return NextResponse.json({ error: "Missing 'title' query param" }, { status: 400 });
  }

  try {
    const data: any = await searchMovies(title);
    const sendData = data.filter((item: any) => item.image);
    return NextResponse.json(sendData, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Unknown error" }, { status: 500 });
  }
}
