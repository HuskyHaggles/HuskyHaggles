import React from "react";
import { Container, Typography, Box, Button } from "@mui/material";
import { Helmet } from "react-helmet";
import { useNavigate } from "react-router-dom";

const Home: React.FC = () => {
  const navigate = useNavigate();
  // Assume navbar is 64px tall.
  return (
    <>
      <Helmet>
        <title>Home - Husky Haggles</title>
      </Helmet>
      <Container
        sx={{
          height: "calc(100vh - 64px)",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          textAlign: "center",
        }}
      >
        <Typography variant="h2" sx={{ fontWeight: "bold", mb: 2 }}>
          Welcome to Husky Haggles
        </Typography>
        <Typography variant="h6" sx={{ mb: 4 }}>
          Buy, sell, and trade listings with your community!
        </Typography>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            gap: 2,
            flexWrap: "wrap",
          }}
        >
          <Button variant="contained" onClick={() => navigate("/listings")}>
            Browse Listings
          </Button>
          <Button variant="outlined" onClick={() => navigate("/users")}>
            View Users
          </Button>
        </Box>
      </Container>
    </>
  );
};

export default Home;
