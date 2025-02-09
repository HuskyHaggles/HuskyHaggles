import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

const MessageButton: React.FC<ButtonProps> = ({ children, ...props }) => {
  const handleMessage = () => {
    console.log("Message Button Pressed");
  };

  return (
    <button
      className="bg-yellow-500 text-darkBg hover:bg-yellow-600 hover:scale-105 my-2 px-6 py-3 rounded-lg transition-transform duration-200 focus:outline-none flex items-center justify-center"
      onClick={handleMessage}
      {...props}
    >
      {children}
    </button>
  );
};

export default MessageButton;
