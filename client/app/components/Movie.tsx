"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Link from "next/link";
import { motion } from "framer-motion";

function Movie({ imdbId }: { imdbId: string }) {
  const [movie, setMovie] = useState<any>(null);

  useEffect(() => {
    axios
      .get("/api/movie/" + imdbId)
      .then((res) => {
        setMovie(res.data);
        console.log(res.data);
      })
      .catch((err) => console.error(err));
  }, [imdbId]);

  if (!movie) {
    return (
      <div className="w-screen h-screen flex items-center justify-center bg-black text-white">
        <div className="flex flex-col items-center gap-4">
          <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-red-500 border-opacity-50"></div>
          <p className="text-lg font-medium">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      className="p-6 max-w-6xl mx-auto space-y-10"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <motion.div
        className="flex flex-col md:flex-row gap-8"
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
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
          <p className="text-gray-400">{movie.description || movie.fullTitle}</p>

          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-gray-500"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <p><strong>Type:</strong> 🎬 {movie.type}</p>
            <p><strong>Release:</strong> 📅 {new Date(movie.releaseDate).toLocaleDateString()}</p>
            <p><strong>Runtime:</strong> ⏳ {movie.runtime?.display} ({movie.runtime?.seconds}s)</p>
            <p><strong>Awards:</strong> 🏆 {movie.awards?.wins} Wins / 🎖 {movie.awards?.nominations} Nominations</p>
            <p><strong>Rating:</strong> ⭐ {movie.ratings?.average} / 10 ({movie.ratings?.count} ratings)</p>
            <p><strong>Engagement:</strong> 👤 {movie?.engagement?.watchlistCount}</p>
            <p><strong>Reviews:</strong> 📝 {movie.reviews?.total}</p>
            <p><strong>Status:</strong> {movie.productionStatus?.current === "Released" ? `🍿 Released` : `⏳ Coming soon`}</p>
          </motion.div>

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

          {movie.productionCompanies?.length > 0 && (
            <div className="pt-1">
              <h2 className="text-2xl font-semibold text-gray-500 pb-2">
                Production Companies
              </h2>
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
            </div>
          )}
        </div>
      </motion.div>

      {movie.actors?.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <h2 className="text-2xl font-semibold mb-4">Actors</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {movie.actors?.map((actor: any, i: number) => (
              <div
                key={i}
                className="bg-gray-100 p-3 rounded-xl shadow-sm text-sm"
              >
                <p className="font-medium text-black">{actor.name}</p>
                {actor.role && <p className="text-gray-500">as {actor.role}</p>}
              </div>
            ))}
          </div>
        </motion.div>
      )}

      {movie.directors?.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <h2 className="text-2xl font-semibold mb-4">Director(s)</h2>
          <div className="flex flex-wrap gap-4">
            {movie.directors?.map((director: any) => (
              <div
                key={director.id}
                className="bg-gray-50 p-3 rounded-lg shadow"
              >
                <p className="font-medium text-black">{director.name}</p>
              </div>
            ))}
          </div>
        </motion.div>
      )}

      {movie.images?.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
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
            {movie.images?.map((image: any, index: number) => (
              <SwiperSlide
                key={index}
                className="h-64 flex items-center justify-center rounded-xl overflow-hidden"
              >
                <div className="w-full h-full flex items-center justify-center">
                  <img
                    src={image.url}
                    alt={image.title}
                    className="max-h-full max-w-full object-contain rounded-xl shadow"
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </motion.div>
      )}

      {movie.similarTitles.length > 0 && (
        <motion.div
          className="w-full"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <h2 className="text-2xl font-semibold mb-4">Similar Titles</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
            {movie.similarTitles?.map((title: any, i: number) => (
              <Link
                key={i}
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
        </motion.div>
      )}
    </motion.div>
  );
}

export default Movie;
