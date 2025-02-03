import LoginButton from "../components/buttons/LoginButton";
import SignUpButton from "../components/buttons/SignUpButton";
import AddToCartButton from "../components/buttons/AddToCartButton";

const Home = () => {
  return (
    <div>
      <LoginButton>Login</LoginButton>
      <SignUpButton>Signup</SignUpButton>
      <AddToCartButton>Add to Cart</AddToCartButton>
    </div>
  );
};

export default Home;
