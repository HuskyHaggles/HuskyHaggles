import LoginButton from "../components/buttons/LoginButton";
import SignUpButton from "../components/buttons/SignUpButton";
import AddToCartButton from "../components/buttons/MessageButton";

const Home = () => {
  return (
    <div>
      <LoginButton>Login</LoginButton>
      <SignUpButton>Signup</SignUpButton>
      <AddToCartButton>Message</AddToCartButton>
    </div>
  );
};

export default Home;
