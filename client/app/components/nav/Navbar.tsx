"use client";
import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import axios from "axios";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/firebase/config";

// Navigation links

// SearchBox Component
type Movie = {
  imdbId: string;
  title: string;
  year: string;
  image: string;
  url: string;
};

type SearchBoxProps = {
  query: string;
  setQuery: React.Dispatch<React.SetStateAction<string>>;
  setMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
  filteredMovies: Movie[];
  loading: boolean;
};

const SearchBox = ({
  query,
  setQuery,
  filteredMovies,
  loading,
  setMenuOpen,
}: SearchBoxProps) => {
  return (
    <div className="relative w-full md:w-72">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search movies..."
        aria-label="Search movies"
        className="w-full bg-gray-800 text-white px-4 py-2 rounded-md outline-none focus:ring-2 focus:ring-red-500"
        aria-live="polite"
      />
      {loading && <p className="text-sm text-gray-400 mt-1">Searching...</p>}

      {query && (
        <div className="absolute top-12 w-full bg-white text-black rounded-md shadow-lg overflow-y-auto z-50 max-h-80">
          {filteredMovies.length > 0 ? (
            filteredMovies.map((movie: Movie) => (
              <Link
                href={`/movie/${movie.imdbId}`}
                key={movie.imdbId}
                onClick={() => {
                  setQuery("");
                  setMenuOpen(false);
                }}
                className="flex gap-3 bg-gray-200 items-center px-4 py-2 hover:bg-gray-100 border-b"
              >
                <img
                  src={movie.image}
                  alt={movie.title}
                  className="w-10 h-14 object-cover rounded"
                />
                <div className="text-sm">
                  <p className="font-medium">{movie.title}</p>
                  <p className="text-xs text-gray-500">{movie.year}</p>
                </div>
              </Link>
            ))
          ) : (
            <p className="px-4 py-3 text-sm text-gray-600">
              {loading ? "Searching..." : "No results found"}
            </p>
          )}
        </div>
      )}
    </div>
  );
};

// Main Navbar Component
const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [filteredMovies, setFilteredMovies] = useState<Movie[]>([]);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [user, authloading, error]: [any, boolean, any] = useAuthState(auth);
  const logged = !!user && !loading;

  const lastQueryRef = useRef("");
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const navLinks = logged
    ? [
        { name: "Home", href: "/" },
        { name: "Profile", href: "/profile" },
      ]
    : [
        { name: "Home", href: "/" },
        { name: "Login", href: "/login" },
      ];

  useEffect(() => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);

    timeoutRef.current = setTimeout(async () => {
      const trimmedQuery = query.trim();
      if (trimmedQuery.length < 1 || trimmedQuery === lastQueryRef.current)
        return setFilteredMovies([]);

      setLoading(true);
      try {
        const res = await axios.get(`/api/search_movies?title=${trimmedQuery}`);
        setFilteredMovies(res.data);

        lastQueryRef.current = trimmedQuery;
      } catch (error) {
        console.error("Search failed:", error);
        setFilteredMovies([]);
      } finally {
        setLoading(false);
      }
    }, 1000); // ⏱ Wait 1 second before firing

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [query]);

  return (
    <header className="bg-black text-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="text-2xl font-bold text-red-500">
          🎬 Manime
        </Link>

        {/* Desktop Nav */}
        <nav
          className="hidden md:flex gap-8 items-center"
          aria-label="Main navigation"
        >
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="hover:text-red-500 transition"
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Desktop Search */}
        <div className="hidden md:block">
          <SearchBox
            query={query}
            setQuery={setQuery}
            setMenuOpen={setMenuOpen}
            filteredMovies={filteredMovies}
            loading={loading}
          />
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden text-white"
          onClick={() => setMenuOpen((prev) => !prev)}
          aria-label="Toggle mobile menu"
        >
          {menuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Nav */}
      {menuOpen && (
        <div className="md:hidden bg-black border-t border-gray-700 px-4 pb-4">
          <div className="mt-4">
            <SearchBox
              query={query}
              setQuery={setQuery}
              setMenuOpen={setMenuOpen}
              filteredMovies={filteredMovies}
              loading={loading}
            />
          </div>
          <nav
            className="flex flex-col gap-4 mt-4"
            aria-label="Mobile navigation"
          >
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="hover:text-red-500 transition"
              >
                {link.name}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;
