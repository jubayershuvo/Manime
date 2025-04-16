import { Metadata } from "next";
import MovieClient from "../../components/Movie"; // new file you'll create

type Props = {
  params: {
    imdbId: string;
  };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL;
  const res = await fetch(`${baseUrl}/api/movie/${params.imdbId}`, {
    cache: "no-store",
  });
  const movie = await res.json();

  return {
    title: `${movie?.title} ${movie.actors[0].name} (${movie?.yearRange?.start})` || "Loading...",
    description: movie?.description || movie?.fullTitle || "Movie info",
    openGraph: {
      title: `${movie?.title} ${movie.actors[0].name} (${movie?.yearRange?.start})`,
      description: movie?.description,
      images: [movie?.primaryImage?.url],
      type: "video.movie",
    },
  };
}

export default function MoviePage({ params }: Props) {
  return <MovieClient imdbId={params.imdbId} />;
}
