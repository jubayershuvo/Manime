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

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  if (!user) return <p>No user found. Please log in.</p>;

  return (
    <div className="max-w-md mx-auto mt-10 p-6 border rounded-xl shadow-md bg-white">
      <div className="flex flex-col items-center gap-4">
        <img
          src={user.photoURL || "https://via.placeholder.com/100"}
          alt="User avatar"
          className="w-24 h-24 rounded-full object-cover"
        />
        <h2 className="text-2xl font-semibold">
          {user.displayName || "No Name"}
        </h2>
        <p className="text-gray-600">{user.email}</p>
        <button
          onClick={handleLogout}
          className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
        >
          Logout
        </button>
      </div>
    </div>
  );
}

export default Profile;
