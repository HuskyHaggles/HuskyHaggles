import React, { useState, useEffect } from "react";
import {
  Container,
  Typography,
  Card,
  CardMedia,
  CardContent,
  Grid,
  Box,
  Divider,
  Button,
  IconButton,
} from "@mui/material";
import { Helmet } from "react-helmet";
import { useNavigate, useParams } from "react-router-dom";
import { supabase } from "../supabaseClient";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

interface User {
  firstName: string;
  lastName: string;
  username: string;
  profile_picture: string;
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
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchListing = async () => {
      if (!listing_id) {
        setLoading(false);
        return;
      }
      const { data, error } = await supabase
        .from("listings")
        .select(
          `
          id, name, description, images, price, category, location, condition, created_at, user_id,
          users ( firstName, lastName, username, profile_picture )
        `
        )
        .eq("id", listing_id)
        .single();

      if (error) {
        console.error("Error fetching listing:", error.message);
      } else {
        const listingData: Listing = {
          ...data,
          users:
            data.users && Array.isArray(data.users) && data.users.length > 0
              ? data.users[0]
              : data.users,
        };
        setListing(listingData);
      }
      setLoading(false);
    };

    fetchListing();
  }, [listing_id]);

  const handlePrevImage = () => {
    if (listing?.images && listing.images.length > 0) {
      setCurrentImageIndex((prev) =>
        prev === 0 ? listing.images.length - 1 : prev - 1
      );
    }
  };

  const handleNextImage = () => {
    if (listing?.images && listing.images.length > 0) {
      setCurrentImageIndex((prev) =>
        prev === listing.images.length - 1 ? 0 : prev + 1
      );
    }
  };

  if (loading) return <Typography>Loading...</Typography>;
  if (!listing) return <Typography>Listing not found</Typography>;

  return (
    <>
      <Helmet>
        <title>{listing.name} - Husky Haggles</title>
      </Helmet>
      <Container sx={{ mt: 4 }}>
        <Card sx={{ p: 3 }}>
          <Grid container spacing={2}>
            {/* Left Column: Image Carousel, Title and Description */}
            <Grid item xs={12} md={6}>
              <Box sx={{ position: "relative" }}>
                {listing.images && listing.images.length > 0 ? (
                  <CardMedia
                    component="img"
                    height="300"
                    image={listing.images[currentImageIndex]}
                    alt={`${listing.name} - image ${currentImageIndex + 1}`}
                    sx={{
                      width: "100%",
                      objectFit: "cover",
                      objectPosition: "center",
                      mb: 2,
                    }}
                  />
                ) : (
                  <Typography>No images available.</Typography>
                )}
                {listing.images && listing.images.length > 1 && (
                  <>
                    <IconButton
                      sx={{
                        position: "absolute",
                        top: "50%",
                        left: 0,
                        transform: "translateY(-50%)",
                        backgroundColor: "rgba(0,0,0,0.4)",
                        color: "#fff",
                      }}
                      onClick={handlePrevImage}
                    >
                      <ArrowBackIosNewIcon />
                    </IconButton>
                    <IconButton
                      sx={{
                        position: "absolute",
                        top: "50%",
                        right: 0,
                        transform: "translateY(-50%)",
                        backgroundColor: "rgba(0,0,0,0.4)",
                        color: "#fff",
                      }}
                      onClick={handleNextImage}
                    >
                      <ArrowForwardIosIcon />
                    </IconButton>
                  </>
                )}
              </Box>
              <Typography variant="h4" sx={{ fontWeight: "bold", mb: 1 }}>
                {listing.name}
              </Typography>
              <Typography variant="body1" sx={{ mb: 2 }}>
                {listing.description}
              </Typography>
            </Grid>

            {/* Right Column: Product and Seller Info */}
            <Grid item xs={12} md={6}>
              <Box sx={{ p: 2, border: "1px solid #ddd", borderRadius: 2 }}>
                <Typography variant="h6" gutterBottom>
                  Product Information
                </Typography>
                <Typography variant="body2">
                  <strong>Price:</strong>{" "}
                  {listing.price ? `$${listing.price}` : "N/A"}
                </Typography>
                <Typography variant="body2">
                  <strong>Category:</strong> {listing.category || "N/A"}
                </Typography>
                <Typography variant="body2">
                  <strong>Location:</strong> {listing.location || "N/A"}
                </Typography>
                <Typography variant="body2">
                  <strong>Condition:</strong> {listing.condition || "N/A"}
                </Typography>
                <Typography variant="body2" sx={{ mt: 1 }}>
                  <strong>Posted on:</strong>{" "}
                  {listing.created_at
                    ? new Date(listing.created_at).toLocaleString()
                    : "N/A"}
                </Typography>

                <Divider sx={{ my: 2 }} />

                <Typography variant="h6" gutterBottom>
                  Seller Information
                </Typography>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  {listing.users?.profile_picture && (
                    <Box
                      component="img"
                      src={listing.users.profile_picture}
                      alt={listing.users.username}
                      sx={{
                        width: 60,
                        height: 60,
                        borderRadius: "8px",
                        objectFit: "cover",
                        objectPosition: "center",
                        mr: 2,
                      }}
                    />
                  )}
                  <Box>
                    <Typography variant="body2">
                      <strong>Full Name:</strong> {listing.users?.firstName}{" "}
                      {listing.users?.lastName}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{
                        cursor: "pointer",
                        color: "primary.main",
                        textDecoration: "underline",
                      }}
                      onClick={() => navigate(`/u/${listing.users?.username}`)}
                    >
                      @{listing.users?.username}
                    </Typography>
                  </Box>
                </Box>

                <Box sx={{ display: "flex", gap: 2, mt: 2 }}>
                  <Button
                    variant="outlined"
                    onClick={() => navigate("/listings")}
                  >
                    Back to Listings
                  </Button>
                  <Button
                    variant="contained"
                    onClick={() => navigate(`/u/${listing.users?.username}`)}
                  >
                    Get in Contact
                  </Button>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Card>
      </Container>
    </>
  );
};

export default ListingDetails;
