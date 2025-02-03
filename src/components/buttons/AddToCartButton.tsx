import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

const AddToCartButton: React.FC<ButtonProps> = ({ children, ...props }) => {
  const handleAddToCart = () => {
    console.log("Add to Cart Button Pressed");
  };

  return (
    <button
      className="bg-yellow-500 text-darkBg hover:bg-yellow-600 hover:scale-105 my-2 px-6 py-3 rounded-lg transition-transform duration-200 focus:outline-none flex items-center justify-center"
      onClick={handleAddToCart}
      {...props}
    >
      {children}
    </button>
  );
};

export default AddToCartButton;
