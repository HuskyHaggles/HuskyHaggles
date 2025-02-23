import React, { useState } from "react";
import { Button, TextField, Container } from "@mui/material";
import { supabase } from "../supabaseClient";
import { generateListingId } from "../utils/generateListingId";

const AddListing: React.FC = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [inStock, setInStock] = useState(true);
  const [imageUrl, setImageUrl] = useState("");

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
    <Container>
      <form onSubmit={handleSubmit}>
        <TextField label="Listing Name" fullWidth value={name} onChange={(e) => setName(e.target.value)} />
        <TextField label="Description" fullWidth multiline value={description} onChange={(e) => setDescription(e.target.value)} />
        <TextField label="Image URL" fullWidth value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} />
        <Button type="submit" variant="contained" color="primary">
          Add Listing
        </Button>
      </form>
    </Container>
  );
};

export default AddListing;
