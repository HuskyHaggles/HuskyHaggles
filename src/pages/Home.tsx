import { useNavigate } from "react-router-dom";
import MessageButton from "../components/buttons/MessageButton";
import { Button } from "@mui/material";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div>
      <h1>Husky Haggles</h1>
      <p>
        Welcome to Husky Haggles! List items, purchase items, and more from
        other Northeastern students!
      </p>
      <Button onClick={() => navigate("/login")}>Login</Button>
      <Button onClick={() => navigate("/signup")}>Signup</Button>
      <Button onClick={() => navigate("/listings")}>View Listings</Button>
      <MessageButton>Message</MessageButton>
    </div>
  );
};

export default Home;
