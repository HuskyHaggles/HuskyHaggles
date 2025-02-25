// Listings.tsx
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
  seller_username: string;
  seller_name: string;
  seller_profile_picture: string;
}

const Listings: React.FC = () => {
  const [listings, setListings] = useState<Listing[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchListings = async () => {
      const { data, error } = await supabase
        .from("listings")
        .select(
          `id, user_id, name, description, in_stock, images, created_at,
           users(username, name, profile_picture)`
        )
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error fetching listings:", error);
      } else if (data) {
        setListings(
          data.map((listing: any) => ({
            id: listing.id,
            user_id: listing.user_id,
            name: listing.name,
            description: listing.description,
            inStock: listing.in_stock,
            images: listing.images,
            created_at: listing.created_at,
            // Calculate seller details from the joined users table
            seller_username: listing.users?.[0]?.username || "Unknown",
            seller_name: listing.users?.[0]?.name || "Unknown",
            seller_profile_picture: listing.users?.[0]?.profile_picture || "",
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
      ) : listings.length > 0 ? (
        <Grid container spacing={3}>
          {listings.map((listing) => (
            <Grid item xs={12} sm={6} md={4} key={listing.id}>
              <ListingCard listing={listing} />
            </Grid>
          ))}
        </Grid>
      ) : (
        <Typography>No listings found.</Typography>
      )}
    </Container>
  );
};

export default Listings;
