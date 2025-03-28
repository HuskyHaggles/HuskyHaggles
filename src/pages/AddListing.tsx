// pages/AddListing.tsx
import React, { useState, useEffect, Suspense } from "react";
import {
  Button,
  Container,
  Typography,
  Grid,
  Box,
  InputAdornment,
  TextField,
} from "@mui/material";
import { Helmet } from "react-helmet";
import NeighborhoodPicker from "../components/NeighborhoodPicker";
import { supabase } from "../supabaseClient";
import { generateListingId } from "../utils/generateListingId";

// Dynamically import ReactQuill to defer loading (and avoid some strict‑mode warnings)
const ReactQuill = React.lazy(() => import("react-quill-new"));
import "react-quill-new/dist/quill.snow.css";

const AddListing: React.FC = () => {
  // isMounted flag to delay rendering of ReactQuill until after mount.
  const [isMounted, setIsMounted] = useState(false);
  const [name, setName] = useState("");
  const [content, setContent] = useState("<p></p>");
  const [inStock, setInStock] = useState(true);
  const [imageUrl, setImageUrl] = useState("");
  const [price, setPrice] = useState("");
  const [condition, setCondition] = useState("");
  const [category, setCategory] = useState("");
  const [location, setLocation] = useState("");
  const [latitude, setLatitude] = useState<number | null>(null);
  const [longitude, setLongitude] = useState<number | null>(null);

  // Set mounted flag after component mounts.
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // "Use Current Location" handler with slight randomization on the client side.
  const handleUseCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          const randomOffset = () => (Math.random() - 0.5) * 0.01;
          const newLat = latitude + randomOffset();
          const newLng = longitude + randomOffset();
          setLatitude(newLat);
          setLongitude(newLng);
          // In production, reverse geocode these coordinates to get the neighborhood name.
          setLocation("Current Neighborhood"); // Placeholder text.
        },
        (error) => {
          console.error("Geolocation error:", error);
          setLatitude(null);
          setLongitude(null);
          setLocation("");
        }
      );
    } else {
      console.error("Geolocation not supported");
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const listingId = generateListingId("user123", name);
    const { data, error } = await supabase.from("listings").insert([
      {
        id: listingId,
        name,
        description: content,
        in_stock: inStock,
        images: [imageUrl],
        price: parseFloat(price),
        condition,
        category,
        location,
        latitude,
        longitude,
      },
    ]);

    if (error) {
      console.error("Error adding listing:", error);
    } else {
      console.log("Listing added:", data);
    }
  };

  return (
    <Container maxWidth="lg">
      <Helmet>
        <title>Add Listing - Husky Haggles</title>
      </Helmet>
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          py: 4,
        }}
      >
        <Typography variant="h4" gutterBottom>
          Add New Listing
        </Typography>
        <Grid container spacing={3} sx={{ width: "100%", maxWidth: 900 }}>
          {/* Left Column: 66.66% width on md and up, 100% on xs */}
          <Grid sx={{ width: { xs: "100%", md: "66.66%" } }}>
            <Typography fontWeight="bold" mb={1}>
              Listing Name:
            </Typography>
            <TextField
              fullWidth
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <Typography fontWeight="bold" mt={2} mb={1}>
              Description:
            </Typography>
            <Suspense fallback={<div>Loading editor...</div>}>
              {isMounted && (
                <ReactQuill
                  theme="snow"
                  value={content}
                  onChange={setContent}
                  style={{ height: 200, marginBottom: 16, width: "100%" }}
                />
              )}
            </Suspense>
          </Grid>
          {/* Right Column: 33.33% width on md and up, 100% on xs */}
          <Grid sx={{ width: { xs: "100%", md: "33.33%" } }}>
            <Typography fontWeight="bold" mb={1}>
              Price:
            </Typography>
            <TextField
              type="number"
              fullWidth
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">$</InputAdornment>
                ),
              }}
            />
            <Typography fontWeight="bold" mt={2} mb={1}>
              Condition:
            </Typography>
            <TextField
              fullWidth
              value={condition}
              onChange={(e) => setCondition(e.target.value)}
            />
            <Typography fontWeight="bold" mt={2} mb={1}>
              Category:
            </Typography>
            <TextField
              fullWidth
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            />
            <Typography fontWeight="bold" mt={2} mb={1}>
              Location:
            </Typography>
            <NeighborhoodPicker
              value={location}
              onChange={(neighborhood, coords) => {
                setLocation(neighborhood);
                setLatitude(coords.lat);
                setLongitude(coords.lng);
              }}
            />
            <Box sx={{ mt: 1 }}>
              <Button variant="outlined" onClick={handleUseCurrentLocation}>
                Use Current Location
              </Button>
            </Box>
          </Grid>
        </Grid>
        <Box sx={{ mt: 3, textAlign: "center" }}>
          <Button type="submit" variant="contained" color="primary">
            Add Listing
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default AddListing;
