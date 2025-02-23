import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "../supabaseClient";
import {
  Container,
  Typography,
  Card,
  CardMedia,
  CardContent,
} from "@mui/material";

interface Listing {
  id: string;
  name: string;
  description: string;
  inStock: boolean;
  images: string[];
}

const ListingDetails: React.FC = () => {
  const { username, itemID } = useParams<{
    username: string;
    itemID: string;
  }>();
  const [listing, setListing] = useState<Listing | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchListing = async () => {
      const { data, error } = await supabase
        .from("listings")
        .select("*")
        .eq("id", itemID)
        .single();
      if (error) {
        console.error("Error fetching listing:", error);
      } else {
        setListing(data);
      }
      setLoading(false);
    };

    fetchListing();
  }, [itemID]);

  if (loading) return <Typography>Loading...</Typography>;
  if (!listing) return <Typography>Listing not found</Typography>;

  return (
    <Container sx={{ mt: 4 }}>
      <Card>
        <CardMedia
          component="img"
          height="300"
          image={listing.images[0]}
          alt={listing.name}
        />
        <CardContent>
          <Typography variant="h4">{listing.name}</Typography>
          <Typography variant="body1">{listing.description}</Typography>
        </CardContent>
      </Card>
    </Container>
  );
};

export default ListingDetails;
