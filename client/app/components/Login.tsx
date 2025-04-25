"use client";
import { auth } from "@/firebase/config";
import { useSignInWithGoogle, useAuthState } from "react-firebase-hooks/auth";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const getFriendlyMessage = (code: string) => {
  switch (code) {
    case "auth/popup-closed-by-user":
      return "You closed the popup before completing sign-in.";
    case "auth/cancelled-popup-request":
      return "Sign-in was interrupted. Please try again.";
    case "auth/network-request-failed":
      return "Network error. Please check your internet connection.";
    case "auth/popup-blocked":
      return "Popup blocked. Please allow popups in your browser.";
    case "auth/user-disabled":
      return "Your account has been disabled. Contact support.";
    default:
      return "Something went wrong. Please try again.";
  }
};

export default function LoginPage() {
  const router = useRouter();
  const [signInWithGoogle, _user, loading, error] = useSignInWithGoogle(auth);
  const [user] = useAuthState(auth);
  const [showError, setShowError] = useState(false);
  const [friendlyMessage, setFriendlyMessage] = useState("");

  useEffect(() => {
    if (user) router.push("/");
  }, [user, router]);

  useEffect(() => {
    if (error) {
      const message = getFriendlyMessage(error.code);
      setFriendlyMessage(message);
      setShowError(true);
    }
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-100 dark:bg-gray-900 transition-colors relative">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-8 max-w-md w-full text-center z-10">
        <h1 className="text-2xl font-bold mb-6 text-gray-800 dark:text-gray-100">Login with Google</h1>
        <button
          onClick={() => signInWithGoogle()}
          className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md font-semibold transition"
        >
          <svg
            className="w-5 h-5"
            viewBox="0 0 533.5 544.3"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill="#4285F4"
              d="M533.5 278.4c0-17.6-1.6-34.6-4.7-51H272v96.8h146.9c-6.3 33.8-25.1 62.4-53.6 81.5v67.5h86.9c50.8-46.8 81.3-115.8 81.3-194.8z"
            />
            <path
              fill="#34A853"
              d="M272 544.3c72.9 0 134.1-24.2 178.7-65.7l-86.9-67.5c-24.1 16.2-55 25.7-91.8 25.7-70.6 0-130.4-47.6-151.8-111.6H29.1v69.9C72.9 475.3 165.9 544.3 272 544.3z"
            />
            <path
              fill="#FBBC05"
              d="M120.2 325.2c-6.9-20.6-10.8-42.5-10.8-65.2s3.9-44.6 10.8-65.2v-69.9H29.1C10.4 161.2 0 199.8 0 260s10.4 98.8 29.1 135.1l91.1-69.9z"
            />
            <path
              fill="#EA4335"
              d="M272 107.7c39.7 0 75.3 13.7 103.4 40.5l77.6-77.6C406.1 26 344.9 0 272 0 165.9 0 72.9 68.9 29.1 174.9l91.1 69.9C141.6 155.3 201.4 107.7 272 107.7z"
            />
          </svg>
          Continue with Google
        </button>

        {loading && (
          <p className="mt-4 text-gray-700 dark:text-gray-300">Loading...</p>
        )}
      </div>

      {/* Error Modal */}
      {showError && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-20">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg max-w-sm w-full relative">
            <button
              onClick={() => setShowError(false)}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-800 dark:hover:text-white text-xl"
            >
              &times;
            </button>
            <h2 className="text-lg font-semibold text-red-600 dark:text-red-400 mb-2">
              Login Error
            </h2>
            <p className="text-sm text-gray-700 dark:text-gray-300">
              {friendlyMessage}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
