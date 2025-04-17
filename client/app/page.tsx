import { Metadata } from "next";
import HomePage from "@/app/components/Home";
import { headers } from "next/headers";

export async function generateMetadata(): Promise<Metadata> {
  const headersList = await headers(); // ✅ await the function
  const host = headersList.get("host");
  const protocol = headersList.get("x-forwarded-proto") || "http";
  const baseUrl = `${protocol}://${host}`;
  return {
    title: "Manime | Movies & Anime Info & Downloads",
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
    metadataBase: new URL(baseUrl), // Update with your domain
    openGraph: {
      title: "Manime | Movies & Anime Info & Downloads",
      description:
        "Explore trending movies and anime with full cast, trailer, download links, and more.",
      url: baseUrl, // Update with your actual URL
      siteName: "Manime",
      images: [
        {
          url: "/og-image.jpg", // Add a real Open Graph image in your public folder
          width: 1200,
          height: 630,
          alt: "Manime - Watch Movies and Anime Online",
        },
      ],
      locale: "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: "Manime | Movies & Anime Info & Downloads",
      description:
        "Get detailed movie and anime info. HD trailers, cast, and fast downloads — only on Manime.",
      images: ["/og-image.jpg"], // Same Open Graph image
      creator: "@jubayer_shuvo", // Optional
    },
    category: "entertainment",
    robots: {
      index: true,
      follow: true,
      nocache: false,
    },
  };
}


export default function Home() {
  return <HomePage/>
}
