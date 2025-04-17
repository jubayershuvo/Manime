import { NextRequest, NextResponse } from "next/server";
import translate from "google-translate-api-x"; // works server-side only

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;

  const text = searchParams.get("text");
  const from = searchParams.get("from") || "en";
  const to = searchParams.get("to") || "bn";

  if (!text) {
    return NextResponse.json({ error: "Missing 'text' query parameter" }, { status: 400 });
  }

  try {
    const result: any = await translate(text, { from, to });

    return NextResponse.json({ translated: result.text });
  } catch (error) {
    console.error("Translation error:", error);
    return NextResponse.json({ error: "Translation failed" }, { status: 500 });
  }
}
