import React, { useState } from "react";
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
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { supabase } from "../supabaseClient";
import { generateListingId } from "../utils/generateListingId";

const AddListing: React.FC = () => {
  // Store description as HTML via ReactQuill.
  const [name, setName] = useState("");
  const [content, setContent] = useState("<p></p>");
  const [inStock, setInStock] = useState(true);
  const [imageUrl, setImageUrl] = useState("");
  const [price, setPrice] = useState("");
  const [condition, setCondition] = useState("");
  const [category, setCategory] = useState("");
  const [location, setLocation] = useState("");

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const listingId = generateListingId("user123", name); // Replace "user123" appropriately.
    const { data, error } = await supabase.from("listings").insert([
      {
        id: listingId,
        name,
        description: content, // stored as HTML
        in_stock: inStock,
        images: [imageUrl],
        price: parseFloat(price),
        condition,
        category,
        location,
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
          {/* Left Column: Listing Name and Description */}
          <Grid item xs={12} md={8}>
            <Typography fontWeight="bold" mb={1}>
              Listing Name:
            </Typography>
            <TextField
              fullWidth
              value={name}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setName(e.target.value)
              }
            />
            <Typography fontWeight="bold" mt={2} mb={1}>
              Description:
            </Typography>
            <ReactQuill
              theme="snow"
              value={content}
              onChange={setContent}
              style={{ height: 200, marginBottom: 16, width: "100%" }}
            />
          </Grid>
          {/* Right Column: Price, Condition, Category, Location */}
          <Grid item xs={12} md={4}>
            <Typography fontWeight="bold" mb={1}>
              Price:
            </Typography>
            <TextField
              type="number"
              fullWidth
              value={price}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setPrice(e.target.value)
              }
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
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setCondition(e.target.value)
              }
            />
            <Typography fontWeight="bold" mt={2} mb={1}>
              Category:
            </Typography>
            <TextField
              fullWidth
              value={category}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setCategory(e.target.value)
              }
            />
            <Typography fontWeight="bold" mt={2} mb={1}>
              Location:
            </Typography>
            <TextField
              fullWidth
              value={location}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setLocation(e.target.value)
              }
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
