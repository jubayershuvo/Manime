import {
  useAuthState,
  useCreateUserWithEmailAndPassword,
  useSignInWithEmailAndPassword,
} from "react-firebase-hooks/auth";
import { auth } from "./config";

const [createUserWithEmailAndPassword] =
  useCreateUserWithEmailAndPassword(auth);
const [signInWithEmailAndPassword] = useSignInWithEmailAndPassword(auth);

const authState = useAuthState(auth);
export {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  authState,
};
