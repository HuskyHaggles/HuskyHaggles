import React from "react";
import { useNavigate } from "react-router-dom";
import { Button, Container, Typography } from "@mui/material";

const Home = () => {
  const navigate = useNavigate();

  return (
    <Container sx={{ mt: 4, textAlign: "center" }}>
      <Typography variant="h3" gutterBottom>
        Welcome to Husky Haggles!
      </Typography>
      <Typography variant="body1" paragraph>
        Buy, sell, and trade with fellow Northeastern students.
      </Typography>
      <Button
        variant="contained"
        color="primary"
        onClick={() => navigate("/login")}
        sx={{ m: 1 }}
      >
        Login
      </Button>
      <Button
        variant="contained"
        color="secondary"
        onClick={() => navigate("/signup")}
        sx={{ m: 1 }}
      >
        Signup
      </Button>
      <Button
        variant="contained"
        onClick={() => navigate("/listings")}
        sx={{ m: 1 }}
      >
        View Listings
      </Button>
      <Button
        variant="contained"
        color="success"
        onClick={() => navigate("/users")}
        sx={{ m: 1 }}
      >
        View Users
      </Button>
    </Container>
  );
};

export default Home;
