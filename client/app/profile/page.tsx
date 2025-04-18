import { Metadata } from "next";
import { headers } from "next/headers";
import ProfilePage from "@/app/components/Profile";

export async function generateMetadata(): Promise<Metadata> {
  const headersList = await headers(); // ✅ await the function
  const host = headersList.get("host");
  const protocol = headersList.get("x-forwarded-proto") || "http";
  const baseUrl = `${protocol}://${host}`;
  return {
    title: "Manime | Login & Register",
    description:
      "Discover and download your favorite movies and anime. Detailed info, cast, trailers, and more — all in one place with Manime.",
    keywords: [
      "Manime",
      "anime info",
      "movie info",
      "anime download",
      "anime download link",
      "movie download",
      "movie download link",
      "watch anime",
      "watch movies",
      "free movies",
      "anime cast",
      "movie trailers",
    ],
    authors: [{ name: "Md Jubayer", url: "https://github.com/jubayershuvo" }],
    creator: "Md Jubayer",
    metadataBase: new URL(baseUrl),
    category: "entertainment",
    robots: {
      index: true,
      follow: true,
      nocache: false,
    },
  };
}

export default function Profile() {
  return <ProfilePage />;
}
