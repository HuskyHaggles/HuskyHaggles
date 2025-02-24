import React, { useEffect, useState } from "react";
import { Container, Typography, Grid } from "@mui/material";
import ListingCard from "../components/ListingCard";
import { supabase } from "../supabaseClient";

interface Listing {
  id: string;
  user_id: string;
  name: string;
  description: string;
  inStock: boolean;
  images: string[];
  created_at: string;
  username: string;
}

const Listings: React.FC = () => {
  const [listings, setListings] = useState<Listing[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchListings = async () => {
      const { data, error } = await supabase
        .from("listings")
        .select(
          "id, user_id, name, description, in_stock, images, created_at, users(username)"
        )
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error fetching listings:", error);
      } else {
        setListings(
          data.map((listing) => ({
            ...listing,
            inStock: listing.in_stock,
            username: listing.users?.[0]?.username || "Unknown",
          }))
        );
      }
      setLoading(false);
    };

    fetchListings();
  }, []);

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Listings
      </Typography>
      {loading ? (
        <Typography>Loading listings...</Typography>
      ) : (
        <Grid container spacing={3}>
          {listings.map((listing) => (
            <Grid item xs={12} sm={6} md={4} key={listing.id}>
              <ListingCard listing={listing} />
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
};

export default Listings;
