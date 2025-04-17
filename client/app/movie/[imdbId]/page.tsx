import { Metadata } from "next";
import MovieClient from "../../components/Movie"; // new file you'll create
import { headers } from "next/headers";


export async function generateMetadata({ params }: any): Promise<Metadata> {
  const headersList = await headers(); // ✅ await the function
  const host = headersList.get("host");
  const protocol = headersList?.get("x-forwarded-proto") || "http";
  const baseUrl = `${protocol}://${host}`;
  const { imdbId } = await params;

  try {
    const res = await fetch(`${baseUrl}/api/movie/${imdbId}`, {
      cache: "no-store",
    });
    const movie = await res.json();
    const allImages = [
      movie?.primaryImage?.url,
      ...movie?.images?.map((image: any) => image?.url),
    ];

    return {
      title:
        `${movie?.title} ${movie.actors[0]?.name} (${movie?.yearRange?.start})` ||
        "Loading...",
      description: movie?.description || movie?.fullTitle || "Movie info",
      openGraph: {
        title: `${movie?.title} ${movie.actors[0]?.name} (${movie?.yearRange?.start})`,
        description: movie?.description || movie?.fullTitle || "Movie info",
        images: allImages,
        type: "video.movie",
      },
    };
  } catch (error) {
    console.log(error);
    return {
      title: "Loading...",
    };
  }
}

export default async function MoviePage({ params }: any) {
  const {imdbId} = await params
  return <MovieClient imdbId={imdbId} />;
}
