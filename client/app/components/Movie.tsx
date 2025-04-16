"use client";

import React, { use, useEffect, useState } from "react";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Link from "next/link";

function Movie({ imdbId }: { imdbId: string }) {
  const [movie, setMovie] = useState<any>(null);
  useEffect(() => {
    axios
      .get("/api/movie/" + imdbId)
      .then((res) => {
        setMovie(res.data);
      })
      .catch((err) => console.error(err));
  }, []);

  if (!movie) return <div className="p-6 text-center">Loading...</div>;
  console.log(movie);
  return (
    <div className="p-6 max-w-6xl mx-auto space-y-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row gap-8">
        <img
          src={movie.primaryImage?.url}
          alt={movie.title}
          className="rounded-xl w-full md:w-1/3 object-cover shadow-lg"
        />
        <div className="flex-1 space-y-4">
          <h1 className="text-4xl font-bold">{movie.title}</h1>
          <p className="text-lg text-muted-foreground">
            {movie.title} ({movie.yearRange.start})
          </p>
          <p className="text-gray-400">
            {movie.description || movie.fullTitle}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-gray-500">
            <p>
              <strong>Type:</strong> {movie.type}
            </p>
            <p>
              <strong>Release:</strong>{" "}
              {new Date(movie.releaseDate).toLocaleDateString()}
            </p>
            <p>
              <strong>Runtime:</strong> {movie.runtime?.display} (
              {movie.runtime?.seconds}s)
            </p>
            <p>
              <strong>Awards:</strong> 🏆 {movie.awards?.wins} Wins / 🎖{" "}
              {movie.awards?.nominations} Nominations
            </p>
            <p>
              <strong>Rating:</strong> ⭐ {movie.ratings?.average} / 10 (
              {movie.ratings?.count} ratings)
            </p>
            <p>
              <strong>Engagement:</strong>  👤 {movie?.engagement?.watchlistCount}
            </p>
            <p>
              <strong>Reviews:</strong> 📝 {movie.reviews?.total}
            </p>
          </div>

          {/* Genres */}
          <div className="flex flex-wrap gap-2 mt-2">
            {movie.genres?.map((genre: string, index: number) => (
              <span
                key={index}
                className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium"
              >
                {genre}
              </span>
            ))}
          </div>

          <div className="pt-1">
            <h2 className="text-2xl font-semibold text-gray-500 pb-2">
              Production Companies
            </h2>
            {movie?.productionCompanies?.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
                {movie.productionCompanies.map((company: any) => (
                  <div
                    key={company.id}
                    className="bg-white shadow-md rounded-lg p-2 flex flex-col items-center space-y-2"
                  >
                    <p className="text-lg font-medium text-gray-900">
                      {company.name}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500">
                No production companies available.
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Cast */}
      <div>
        <h2 className="text-2xl font-semibold mb-4">Actors</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {movie.actors?.map((actor: any) => (
            <div
              key={actor.id}
              className="bg-gray-100 p-3 rounded-xl shadow-sm text-sm"
            >
              <p className="font-medium text-black">{actor.name}</p>
              {actor.role && <p className="text-gray-500">as {actor.role}</p>}
            </div>
          ))}
        </div>
      </div>

      {/* Directors */}
      <div>
        <h2 className="text-2xl font-semibold mb-4">Director(s)</h2>
        <div className="flex flex-wrap gap-4">
          {movie.directors?.map((director: any) => (
            <div key={director.id} className="bg-gray-50 p-3 rounded-lg shadow">
              <p className="font-medium text-black">{director.name}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Gallery */}
      <div>
        <h2 className="text-2xl font-semibold mb-4">Gallery</h2>
        <Swiper
          modules={[Navigation, Pagination]}
          spaceBetween={20}
          slidesPerView={1}
          navigation
          pagination={{ clickable: true }}
          breakpoints={{
            640: { slidesPerView: 2 },
            768: { slidesPerView: 3 },
            1024: { slidesPerView: 4 },
          }}
          className="rounded-lg"
        >
          {movie.images?.map((image: any) => (
            <SwiperSlide key={image.id} className="rounded-xl overflow-hidden">
              <div className="aspect-[16/9] w-full">
                <img
                  src={image.url}
                  alt={image.title}
                  className="w-full h-full object-cover rounded-xl shadow"
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Similar Titles */}
      <div className="w-full">
        <h2 className="text-2xl font-semibold mb-4">Similar Titles</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
          {movie.similarTitles?.map((title: any) => (
            <Link
              key={title.id}
              href={`/movie/${title.id}`}
              className="bg-white rounded-xl shadow p-3 space-y-2 flex flex-col h-full"
            >
              <div className="aspect-[2/3] w-full overflow-hidden rounded-md">
                <img
                  src={title.image}
                  alt={title.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <p className="font-semibold text-sm text-gray-900">
                {title.title} ({title.year})
              </p>
              <p className="text-xs text-gray-600">⭐ {title.rating} / 10</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Movie;
