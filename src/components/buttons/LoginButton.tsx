import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

const LoginButton: React.FC<ButtonProps> = ({ children, ...props }) => {
  const handleLogin = () => {
    console.log("Login Button Pressed");
  };

  return (
    <button
      className="bg-blue-500 text-white hover:bg-blue-600 hover:scale-105 my-2 px-6 py-3 rounded-lg transition-transform duration-200 focus:outline-none flex items-center justify-center"
      onClick={handleLogin}
      {...props}
    >
      {children}
    </button>
  );
};

export default LoginButton;
