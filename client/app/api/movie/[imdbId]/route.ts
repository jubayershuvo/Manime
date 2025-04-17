import { getMovieDetails } from "@/utils/imdb";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const imdbId = req.nextUrl.pathname.split("/").pop(); // or use searchParams if passing as query

  if (!imdbId) {
    return NextResponse.json({ error: "Missing IMDb ID" }, { status: 400 });
  }

  try {
    const data = await getMovieDetails(imdbId);
    return NextResponse.json(data, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Failed to fetch movie data" },
      { status: 500 }
    );
  }
}
