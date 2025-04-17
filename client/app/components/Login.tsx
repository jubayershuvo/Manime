'use client';
import { auth } from '@/firebase/config';
import { useSignInWithGoogle, useAuthState } from 'react-firebase-hooks/auth';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const router = useRouter();

  const [signInWithGoogle, _user, loading, error] = useSignInWithGoogle(auth);
  const [user] = useAuthState(auth);
  console.log(user)

  useEffect(() => {
    if (user) {
      router.push('/'); // Redirect to homepage or dashboard
    }
  }, [user, router]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <h1 className="text-3xl font-bold mb-6">Login with Google</h1>

      <button
        onClick={() => signInWithGoogle()}
        className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded font-semibold"
      >
        Sign in with Google
      </button>

      {loading && <p className="mt-4">Loading...</p>}
      {error && <p className="mt-4 text-red-500">{error.message}</p>}
    </div>
  );
}
