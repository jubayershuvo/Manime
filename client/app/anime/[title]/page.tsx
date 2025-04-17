import { Metadata } from "next";
import MovieClient from "../../components/Movie"; // new file you'll create
import { headers } from "next/headers";

type Props = {
  params: {
    imdbId: string;
  };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const headersList:any = headers();
    const host = headersList.get("host");
    const protocol = headersList.get("x-forwarded-proto") || "http";
    const baseUrl = `${protocol}://${host}`;
  const res = await fetch(`${baseUrl}/api/movie/${params.imdbId}`, {
    cache: "no-store",
  });
  const movie = await res.json();

  return {
    title: `${movie?.title} (${movie?.yearRange?.start})` || "Loading...",
    description: movie?.description || movie?.fullTitle || "Movie info",
    openGraph: {
      title: movie?.title,
      description: movie?.description,
      images: [movie?.image],
      type: "video.other",
    },
  };
}

export default function MoviePage({ params }: Props) {
  return <MovieClient imdbId={params.imdbId} />;
}