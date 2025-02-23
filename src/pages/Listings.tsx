import React, { useEffect, useState } from "react";
import { Container, Typography, Grid } from "@mui/material";
import ListingCard from "../components/ListingCard";
import { supabase } from "../supabaseClient";

interface Listing {
  id: string;
  name: string;
  description: string;
  inStock: boolean;
  images: string[];
}

const Listings: React.FC = () => {
  const [listings, setListings] = useState<Listing[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchListings = async () => {
      const { data, error } = await supabase.from("listings").select("*");
      if (error) {
        console.error("Error fetching listings:", error);
      } else {
        setListings(data);
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
