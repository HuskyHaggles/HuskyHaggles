// src/pages/SignUp.tsx
import { useEffect } from "react";
import SignupPage from "../components/SignupForm";

/**
 * SignUp Page
 * Renders the sign-up form. Document title set on mount.
 */
const SignUp = () => {
  useEffect(() => {
    document.title = "Sign Up - Husky Haggles";
  }, []);

  return <SignupPage />;
};

export default SignUp;
