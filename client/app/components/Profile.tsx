"use client";
import { auth } from "@/firebase/config";
import React, { useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { signOut } from "firebase/auth";
import { useRouter } from "next/navigation";

function Profile() {
  const router = useRouter();
  const [user, loading, error] = useAuthState(auth);
  const logged = !!user && !loading;

  useEffect(() => {
    if (!logged) {
      router.replace("/login");
    }
  }, [logged, router]);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      router.push("/");
    } catch (err) {
      console.error("Error signing out:", err);
    }
  };

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen dark:bg-gray-900">
        <p className="text-lg text-gray-700 dark:text-gray-300">Loading...</p>
      </div>
    );

  if (error)
    return (
      <div className="flex justify-center items-center h-screen dark:bg-gray-900">
        <p className="text-red-600 dark:text-red-400">Error: {error.message}</p>
      </div>
    );

  if (!user)
    return (
      <div className="flex justify-center items-center h-screen dark:bg-gray-900">
        <p className="text-lg text-gray-700 dark:text-gray-300">No user found. Please log in.</p>
      </div>
    );

  return (
    <div className="max-w-md mx-auto mt-10 p-6 border rounded-xl shadow-md bg-white dark:bg-gray-800 dark:border-gray-700 transition-colors duration-300">
      <div className="flex flex-col items-center gap-4">
        <img
          src={
            user.photoURL ||
            "https://cdn.vectorstock.com/i/preview-1x/96/43/avatar-photo-default-user-icon-picture-face-vector-48139643.webp"
          }
          alt="User avatar"
          className="w-24 h-24 rounded-full object-cover ring-2 ring-gray-300 dark:ring-gray-600"
        />
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
          {user.displayName || "No Name"}
        </h2>
        <p className="text-gray-600 dark:text-gray-300">{user.email}</p>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Welcome back, {user.displayName?.split(" ")[0] || "User"}!
        </p>
        <button
          onClick={handleLogout}
          className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 dark:hover:bg-red-700 transition"
        >
          Logout
        </button>
      </div>
    </div>
  );
}

export default Profile;
