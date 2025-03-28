// src/pages/Login.tsx
import React, { useEffect } from "react";
import LoginForm from "../components/LoginForm";

/**
 * Login Page
 * Renders the login form. Document title set on mount.
 */
const Login = () => {
  useEffect(() => {
    document.title = "Login - Husky Haggles";
  }, []);

  return <LoginForm />;
};

export default Login;
