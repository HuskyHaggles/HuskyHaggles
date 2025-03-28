// src/pages/Home.tsx
import React, { useEffect } from "react";
import { Container, Typography, Box, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Home: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // We often set a custom title here if we want:
    document.title = "Home - Husky Haggles";
  }, []);

  return (
    <Container
      sx={{
        // Decrease total height by ~128px to accommodate the navbar + extra vertical spacing
        minHeight: "calc(100vh - 128px)",
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
  );
};

export default Home;
