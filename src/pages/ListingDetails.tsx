import React, { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Card,
  CardMedia,
  CardContent,
} from "@mui/material";
import { useParams } from "react-router-dom";
import { supabase } from "../supabaseClient";

interface Listing {
  id: string;
  user_id: string;
  name: string;
  description: string;
  images: string[];
  username: string;
}

const ListingDetails: React.FC = () => {
  const { username, listing_uuid } = useParams<{
    username: string;
    listing_uuid: string;
  }>();
  const [listing, setListing] = useState<Listing | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchListing = async () => {
      const { data, error } = await supabase
        .from("listings")
        .select("id, user_id, name, description, images, users(username)")
        .eq("id", listing_uuid)
        .single();

      if (error) {
        console.error("Error fetching listing:", error);
      } else {
        setListing({
          ...data,
          username: data.users?.[0]?.username || "Unknown",
        });
      }
      setLoading(false);
    };

    fetchListing();
  }, [username, listing_uuid]);

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
          <Typography variant="body2">Seller: {listing.username}</Typography>
        </CardContent>
      </Card>
    </Container>
  );
};

export default ListingDetails;
