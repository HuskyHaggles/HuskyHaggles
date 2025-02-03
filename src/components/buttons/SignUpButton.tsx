import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

const SignUpButton: React.FC<ButtonProps> = ({ children, ...props }) => {
  const handleSignup = () => {
    console.log("Signup Button Pressed");
  };
  return (
    <button
      className="bg-green-500 text-white hover:bg-green-600 hover:scale-105 my-2 px-6 py-3 rounded-lg transition-transform duration-200 focus:outline-none flex items-center justify-center"
      onClick={handleSignup}
      {...props}
    >
      {children}
    </button>
  );
};

export default SignUpButton;
