// src/pages/AddListing.tsx
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
import NeighborhoodPicker from "../components/NeighborhoodPicker";
import { supabase } from "../supabaseClient";
import { generateListingId } from "../utils/generateListingId";

/**
 * Dynamically import react-quill-new for the text editor.
 */
const ReactQuill = React.lazy(() => import("react-quill-new"));
import "react-quill-new/dist/quill.snow.css";

/**
 * AddListing Page
 * Allows a user to create a new listing.
 */
const AddListing: React.FC = () => {
  const [isMounted, setIsMounted] = useState(false);
  const [name, setName] = useState("");
  const [content, setContent] = useState("<p></p>");
  const [inStock] = useState(true); // defaults to true
  const [imageUrl, setImageUrl] = useState("");
  const [price, setPrice] = useState("");
  const [condition, setCondition] = useState("");
  const [category, setCategory] = useState("");
  // Default location: Northeastern University, Boston
  const [location, setLocation] = useState("Northeastern University, Boston");
  const [latitude, setLatitude] = useState<number>(42.339806);
  const [longitude, setLongitude] = useState<number>(-71.08917);

  useEffect(() => {
    setIsMounted(true);
    document.title = "Add Listing - Husky Haggles";
  }, []);

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
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography variant="h4" gutterBottom>
          Add New Listing
        </Typography>

        <Grid container spacing={3} sx={{ width: "100%", maxWidth: 900 }}>
          {/* Left Column: Listing Details */}
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

          {/* Right Column: Additional Info */}
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
              latitude={latitude}
              longitude={longitude}
              onChange={(neighborhood, coords) => {
                setLocation(neighborhood);
                setLatitude(coords.lat);
                setLongitude(coords.lng);
              }}
            />
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
