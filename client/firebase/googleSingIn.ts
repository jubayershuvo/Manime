import { useSignInWithGoogle } from "react-firebase-hooks/auth";
import { auth } from "./config";

export function useSignInWithGoogle () {
    const [signInWithGoogle] = useSignInWithGoogle(auth);
}