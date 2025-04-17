import { Metadata } from "next";
import MovieClient from "../../components/Movie"; // new file you'll create
import { headers } from "next/headers";

export async function generateMetadata({ params }: any): Promise<Metadata> {
  const headersList:any = headers();
  const host = headersList?.get("host");
  const protocol = headersList?.get("x-forwarded-proto") || "http";
  const baseUrl = `${protocol}://${host}`;
 
  const res = await fetch(`${baseUrl}/api/movie/${params.imdbId}`, {
    cache: "no-store",
  });
  const movie = await res.json();
  const allImages = [movie?.primaryImage?.url, ...movie.images.map((image: any) => image.url)];


  return {
    title: `${movie?.title} ${movie.actors[0].name} (${movie?.yearRange?.start})` || "Loading...",
    description: movie?.description || movie?.fullTitle || "Movie info",
    openGraph: {
      title: `${movie?.title} ${movie.actors[0].name} (${movie?.yearRange?.start})`,
      description: movie?.description || movie?.fullTitle || "Movie info",
      images: allImages,
      type: "video.movie",
    },
  };
}

export default function MoviePage({ params }: any) {
  return <MovieClient imdbId={params.imdbId} />;
}
