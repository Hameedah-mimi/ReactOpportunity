import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../firebase";

const provider = new GoogleAuthProvider();

export const signInWithGoogle = async () => {
  const result = await signInWithPopup(auth, provider);

  const idToken = await result.user.getIdToken();

  return {
    idToken,
    user: result.user,
  };
};
