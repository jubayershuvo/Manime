"use client";

import { auth } from "@/firebase/config";
import { getRandomUsers } from "@/utils/randomUser";
import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { FaArrowRight } from "react-icons/fa"; // Add this at the top of your file

const features = [
  {
    title: "Detailed Info",
    desc: "From plot summaries to cast, get everything in one place.",
    icon: "🎬",
  },
  {
    title: "HD Trailers",
    desc: "Watch trailers for the latest and trending releases.",
    icon: "📽️",
  },
  {
    title: "Fast Downloads",
    desc: "Instant download links for movies and anime.",
    icon: "⚡",
  },
];
const trending = [
  {
    name: "Attack on Titan",
    imdbId: "tt2560140",
    image:
      "https://upload.wikimedia.org/wikipedia/en/thumb/d/d6/Shingeki_no_Kyojin_manga_volume_1.jpg/250px-Shingeki_no_Kyojin_manga_volume_1.jpg",
  },
  {
    name: "Oppenheimer",
    imdbId: "tt1727824",
    image:
      "https://upload.wikimedia.org/wikipedia/en/thumb/4/4a/Oppenheimer_%28film%29.jpg/250px-Oppenheimer_%28film%29.jpg",
  },
  {
    name: "Demon Slayer",
    imdbId: "tt9335498",
    image:
      "https://upload.wikimedia.org/wikipedia/en/0/09/Demon_Slayer_-_Kimetsu_no_Yaiba%2C_volume_1.jpg",
  },
];

export default function Home() {
  const router = useRouter();
  const [user, loading] = useAuthState(auth);
  const logged = !!user && !loading;
  const [randomUsers, setRandomUsers] = useState([]);

  useEffect(() => {
    const usersr = async () => {
      setRandomUsers(await getRandomUsers());
    };
    usersr();
  }, []);

  return (
    <main className="min-h-screen bg-gradient-to-br from-[#0f0f0f] via-[#1a1a1a] to-[#111] text-white">
      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center text-center px-6 py-20">
        <motion.h1
          className="text-5xl md:text-6xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-red-500 via-pink-500 to-purple-500"
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          Welcome to Manime
        </motion.h1>
        <motion.p
          className="mt-4 text-lg md:text-xl text-gray-300 max-w-xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
        >
          Your ultimate hub for discovering movies & anime. Trailers, cast info,
          downloads, and more — all in one place.
        </motion.p>
        <motion.div
          className="mt-8"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
        >
          <Link href="/login">
            {logged ? (
              <button
                className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded font-semibold flex items-center"
                onClick={() => router.push("/profile")}
              >
                Profile <FaArrowRight className="ml-2" />
              </button>
            ) : (
              <button
                className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded font-semibold flex items-center"
                onClick={() => router.push("/login")}
              >
                Login <FaArrowRight className="ml-2" />
              </button>
            )}
          </Link>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="px-6 py-20 bg-[#1a1a1a] text-center">
        <h2 className="text-3xl font-bold mb-10">What Manime Offers</h2>
        <div className="grid md:grid-cols-3 gap-10 max-w-5xl mx-auto">
          {features.map((item, idx) => (
            <motion.div
              key={idx}
              className="bg-[#111] p-6 rounded-xl shadow-md"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 * idx }}
              viewport={{ once: true }}
            >
              <div className="text-4xl mb-4">{item.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
              <p className="text-gray-400">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="px-6 py-20 text-center">
        <h2 className="text-3xl font-bold mb-10">🔥 Trending Now</h2>
        <div className="flex flex-wrap justify-center gap-6">
          {trending.map((item, idx) => (
            <motion.div
              key={idx}
              className="relative w-60 h-80 rounded-xl overflow-hidden shadow-lg group cursor-pointer"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              {/* Background Image */}
              <img
                src={item.image}
                alt={item.name}
                className="absolute inset-0 w-full h-full object-cover transition-opacity duration-500 group-hover:opacity-40"
              />

              {/* Overlay */}
              <Link
                href={`/movie/${item.imdbId}`}
                className="absolute inset-0 z-10"
              >
                {/* Centered Arrow */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <FaArrowRight className="text-white text-3xl drop-shadow-lg" />
                </div>

                {/* Title at Bottom */}
                <div className="absolute bottom-0 w-full text-white bg-black bg-opacity-50 py-3 text-center">
                  <h4 className="text-lg font-semibold">{item.name}</h4>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Why Manime Section */}
      <section className="px-6 py-20 bg-[#1a1a1a] text-center">
        <h2 className="text-3xl font-bold mb-6">Why Choose Manime?</h2>
        <p className="max-w-2xl mx-auto text-gray-400">
          With a sleek interface, lightning-fast content access, and reliable
          info, Manime is your go-to entertainment companion.
        </p>
      </section>

      {/* Testimonials Section */}
      <section className="px-6 py-20 bg-[#111] text-center">
        <h2 className="text-3xl font-bold mb-10">What Our Users Say</h2>
        <div className="grid md:grid-cols-3 gap-10 max-w-6xl mx-auto">
          {randomUsers.map((user, idx) => (
            <motion.div
              key={idx}
              className="bg-[#1f1f1f] p-6 rounded-xl shadow-md flex flex-col items-center"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 * idx }}
              viewport={{ once: true }}
            >
              <img
                src={user?.photo}
                alt={user?.name}
                className="w-16 h-16 rounded-full object-cover mb-4"
              />
              <p className="text-gray-300 italic mb-2">"{user?.comment}"</p>
              <h4 className="font-semibold text-white">{user?.name}</h4>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Report an Issue Section */}
      <section className="px-6 py-20 text-center bg-[#1a1a1a]">
        <h2 className="text-3xl font-bold mb-4">Report an Issue</h2>
        <p className="text-gray-400 mb-8">
          Found a bug, wrong info, or anything off? Let us know so we can fix it
          fast.
        </p>
        <form className="max-w-xl mx-auto flex flex-col gap-4">
          <input
            type="email"
            placeholder="Your email (optional)"
            className="w-full px-4 py-3 rounded-xl bg-[#222] text-white placeholder-gray-500 focus:outline-none"
          />
          <textarea
            rows={5}
            placeholder="Describe the issue in detail..."
            className="w-full px-4 py-3 rounded-xl bg-[#222] text-white placeholder-gray-500 focus:outline-none"
          ></textarea>
          <button
            type="submit"
            className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-xl transition-all duration-300"
          >
            Submit Report
          </button>
        </form>
      </section>

      {/* Supported Platforms Section */}
      <section className="px-6 py-10 bg-[#0f0f0f] text-center">
        <h3 className="text-xl text-gray-400 mb-6">Supported on</h3>
        <div className="flex flex-wrap justify-center gap-10 items-center">
          {["Netflix", "Crunchyroll", "Amazon Prime", "Disney+", "Hulu"].map(
            (platform, idx) => (
              <motion.div
                key={idx}
                className="text-white text-lg font-semibold"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1 * idx }}
                viewport={{ once: true }}
              >
                {platform}
              </motion.div>
            )
          )}
        </div>
      </section>
    </main>
  );
}
