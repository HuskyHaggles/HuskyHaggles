import React, { useState } from "react";
import { Button, TextField, Container, Typography, Grid, Box, InputAdornment } from "@mui/material";
import { supabase } from "../supabaseClient";
import { generateListingId } from "../utils/generateListingId";
import { blue } from "@mui/material/colors";

const AddListing: React.FC = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [inStock, setInStock] = useState(true);
  const [imageUrl, setImageUrl] = useState("");
  const [price, setPrice] = useState("");
  const [condition, setCondition] = useState("");
  const [category, setCategory] = useState("");
  const [location, setLocation] = useState("");

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const listingId = generateListingId("user123", name); // Replace with real username

    const { data, error } = await supabase.from("listings").insert([
      {
        id: listingId,
        name,
        description,
        in_stock: inStock,
        images: [imageUrl],
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
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
        <Grid container spacing={3} sx={{ width: "100%", maxWidth: 900 }}>
          {/* Left Column (Bigger) */}
          <Grid item xs={8} sx={{ padding: 3, borderRadius: 2 }}>
            <Typography variant="h4" gutterBottom>
              Add New Listing
            </Typography>

            {/* Title */}
            <Typography fontWeight="bold" mb={1}>Listing Name:</Typography>
            <TextField fullWidth value={name} onChange={(e) => setName(e.target.value)} />

            {/* Description */}
            <Typography fontWeight="bold" mt={2} mb={1}>Description:</Typography>
            <TextField fullWidth multiline rows={3} value={description} onChange={(e) => setDescription(e.target.value)} />

            {/* Image URL */}
            <Typography fontWeight="bold" mt={2} mb={1}>Image:</Typography>
            <TextField fullWidth value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} label="URL" />
          </Grid>

          {/* Right Column (Smaller) */}
          <Grid item xs={4} sx={{ padding: 3, borderRadius: 2 }}>
            <Typography fontWeight="bold" mb={1}>Price:</Typography>
            <TextField type="number" fullWidth value={price} onChange={(e) => setPrice(e.target.value)}  InputProps={{
            startAdornment: <InputAdornment position="start">$</InputAdornment>,
          }}/>

            <Typography fontWeight="bold" mt={2} mb={1}>Condition:</Typography>
            <TextField fullWidth value={condition} onChange={(e) => setCondition(e.target.value)} />

            <Typography fontWeight="bold" mt={2} mb={1}>Category:</Typography>
            <TextField fullWidth value={category} onChange={(e) => setCategory(e.target.value)}/>

            <Typography fontWeight="bold" mt={2} mb={1}>Location:</Typography>
            <TextField fullWidth value={location} onChange={(e) => setLocation(e.target.value)}/>

            <Box mt={3} textAlign="center">
              <Button type="submit" variant="contained" color="primary" onClick={handleSubmit}>
                Add Listing
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default AddListing;
