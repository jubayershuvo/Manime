"use client";
import {
  useSignInWithEmailAndPassword,
  useSignInWithFacebook,
  useSignInWithGithub,
  useSignInWithGoogle,
} from "react-firebase-hooks/auth";
import { auth } from "../firebase/config";
import { useState } from "react";
import getMovieDetails from "../utils/imdb";

export default function Home() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [signInWithGoogle, googleUser, googleLoading, googleError] =
    useSignInWithGoogle(auth);
  const [signInWithGithub, githubUser, githubLoading, githubError] =
    useSignInWithGithub(auth);
  const [signInWithFacebook, facebookUser, facebookLoading, facebookError] =
    useSignInWithFacebook(auth);
  const [signInWithEmailAndPassword, emailUser, emailLoading, emailError] =
    useSignInWithEmailAndPassword(auth);
  const [movie, setMovie] = useState("");
  const [movieResult, setMovieResult] = useState<object>({});

const searchMovie = async () => {
  try {
    const movieData = await getMovieDetails(movie);
    console.log(movieData);
    setMovieResult(movieData);
  } catch (error) {
    console.error("Error fetching movie data:", error);
  }
};

  

  // const searchMovie = async () => {
  //   try {
  //     const response = await axios.get("http://www.omdbapi.com/", {
  //       params: {
  //         t: movie, // 'movie' should be your dynamic title variable
  //         apikey: "9b3ce09b",
  //       },
  //     });

  //     console.log(response.data); // this contains the actual movie data
  //   } catch (error) {
  //     console.error("Error fetching movie data:", error);
  //   }
  // };


  
  // async function fetchData() {
  //   try {
  //     const options = {
  //       method: 'GET',
  //       url: 'https://imdb236.p.rapidapi.com/imdb/tt0816692',
  //       headers: {
  //         'x-rapidapi-key': 'bd7a45a5b5msh239ed5c42821090p16ecccjsn60a61d11bd15',
  //         'x-rapidapi-host': 'imdb236.p.rapidapi.com'
  //       }
  //     };
  //     const response = await axios.request(options);
  //     console.log(response.data);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // }
  
  // const searchMovie = async () => {
  //   try {
  //     const response = await axios.get(
  //       "https://api.themoviedb.org/3/search/movie",
  //       {
  //         params: {
  //           api_key: "4e44d9029b1270a757cddc766a1bcb63",
  //           language: "en-US",
  //           query: movie,
  //           page: 1,
  //           include_adult: false,
  //         },
  //       }
  //     );
  //     console.log(response.data); // this contains the actual movie data
  //   } catch (error) {
  //     console.error("Error fetching movie data:", error);
  //   }
  // };
  return (
    <div className="min-h-screen text-gray-950 flex flex-col items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4 text-center">Welcome Back</h1>
        <input
          type="text"
          placeholder="Email"
          className="w-full p-2 mb-3 border border-gray-300 rounded"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full p-2 mb-3 border border-gray-300 rounded"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600 mb-3"
          onClick={() => signInWithEmailAndPassword(email, password)}
        >
          Sign in with Email
        </button>
        <button
          className="w-full p-2 bg-red-500 text-white rounded hover:bg-red-600 mb-3"
          onClick={() => signInWithGoogle()}
        >
          Sign in with Google
        </button>
        <button
          className="w-full p-2 bg-gray-800 text-white rounded hover:bg-gray-900 mb-3"
          onClick={() => signInWithGithub()}
        >
          Sign in with Github
        </button>
        <button
          className="w-full p-2 bg-blue-900 text-white rounded hover:bg-blue-800 mb-3"
          onClick={() => signInWithFacebook()}
        >
          Sign in with Facebook
        </button>
        {googleLoading || githubLoading || facebookLoading || emailLoading ? (
          <p className="text-center text-gray-500">Loading...</p>
        ) : null}
        {googleError && (
          <p className="text-red-500">Google Error: {googleError.message}</p>
        )}
        {githubError && (
          <p className="text-red-500">Github Error: {githubError.message}</p>
        )}
        {facebookError && (
          <p className="text-red-500">Facebook Error: {facebookError.message}</p>
        )}
        {emailError && (
          <p className="text-red-500">Email Error: {emailError.message}</p>
        )}
        {googleUser && <p>Welcome, {googleUser.user.displayName}</p>}
        {githubUser && <p>Welcome, {githubUser.user.displayName}</p>}
        {facebookUser && <p>Welcome, {facebookUser.user.displayName}</p>}
        {emailUser && <p>Welcome, {emailUser.user.displayName}</p>}
      </div>
      <input
        className="w-full p-2 mb-3 border border-gray-300 rounded"
        type="text"
        placeholder="Name of movie"
        value={movie}
        onChange={(e) => setMovie(e.target.value)}
      />
      <button onClick={() => searchMovie()} className="bg-blue-500">
        Search
      </button>

      {movieResult && <div>{JSON.stringify(movieResult)}</div>}
    </div>
  );
}
