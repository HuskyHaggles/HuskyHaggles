import React, { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Card,
  CardMedia,
  CardContent,
  Box,
  Divider,
  Chip,
} from "@mui/material";
import { useParams } from "react-router-dom";
import { supabase } from "../supabaseClient";

interface User {
  firstName: string;
  lastName: string;
  username: string;
}

interface Listing {
  id: string;
  name: string;
  description: string;
  images: string[];
  price?: number;
  category?: string;
  location?: string;
  condition?: string;
  created_at?: string;
  users?: User;
}

const ListingDetails: React.FC = () => {
  const { listing_id } = useParams<{ listing_id: string }>();
  const [listing, setListing] = useState<Listing | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchListing = async () => {
      if (!listing_id) return setLoading(false);

      const { data, error } = await supabase
        .from("listings")
        .select(
          `
          id,
          name,
          description,
          images,
          price,
          category,
          location,
          condition,
          created_at,
          users ( firstName, lastName, username )
        `
        )
        .eq("id", listing_id)
        .single();

      if (error) {
        console.error("Error fetching listing:", error.message);
      } else {
        setListing({ ...data, users: data.users });
      }
      setLoading(false);
    };

    fetchListing();
  }, [listing_id]);

  if (loading) return <Typography>Loading...</Typography>;
  if (!listing) return <Typography>Listing not found</Typography>;

  return (
    <Container sx={{ mt: 4, mb: 4 }}>
      <Card sx={{ p: 3, borderRadius: 4, boxShadow: 3 }}>
        <Box display="flex" flexDirection="column" gap={3}>
          {/* Images */}
          {listing.images?.length > 0 && (
            <Box display="flex" gap={2} overflow="auto">
              {listing.images.map((imgUrl, idx) => (
                <CardMedia
                  key={idx}
                  component="img"
                  image={imgUrl}
                  alt={`Image ${idx + 1}`}
                  sx={{
                    height: 300,
                    width: 400,
                    objectFit: "cover",
                    borderRadius: 2,
                  }}
                />
              ))}
            </Box>
          )}

          {/* Title and Price */}
          <Box>
            <Typography variant="h4" fontWeight={700} gutterBottom>
              {listing.name}
            </Typography>
            <Typography variant="h6" color="primary">
              {listing.price ? `$${listing.price}` : "Price not available"}
            </Typography>
          </Box>

          {/* Description */}
          <Typography variant="body1" sx={{ whiteSpace: "pre-line" }}>
            {listing.description}
          </Typography>

          <Divider />

          {/* Metadata */}
          <Box display="flex" flexWrap="wrap" gap={2}>
            <Chip label={`Category: ${listing.category || "N/A"}`} />
            <Chip label={`Location: ${listing.location || "N/A"}`} />
            <Chip label={`Condition: ${listing.condition || "N/A"}`} />
            <Chip
              label={`Created: ${
                listing.created_at
                  ? new Date(listing.created_at).toLocaleString()
                  : "N/A"
              }`}
            />
          </Box>

          <Divider />

          {/* Seller Info */}
          <Box>
            <Typography variant="h6" gutterBottom>
              Seller Information
            </Typography>
            <Typography variant="body2">
              {listing.users?.firstName} {listing.users?.lastName} (@
              {listing.users?.username})
            </Typography>
          </Box>
        </Box>
      </Card>
    </Container>
  );
};

export default ListingDetails;
