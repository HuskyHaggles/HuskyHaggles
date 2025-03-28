// src/pages/ListingDetails.tsx
import React, { useState, useEffect } from "react";
import {
  Container,
  Typography,
  Card,
  Box,
  Divider,
  Button,
  IconButton,
} from "@mui/material";
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
  description: string; // rich HTML
  images: string[];
  price?: number;
  category?: string;
  location?: string;
  condition?: string;
  created_at?: string;
  users?: User;
}

/**
 * ListingDetails Page
 * Displays a single listing's full details, including images and seller info.
 */
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
      } else if (data) {
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

  useEffect(() => {
    if (listing?.name) {
      document.title = `${listing.name} - Husky Haggles`;
    }
  }, [listing]);

  const handlePrevImage = () => {
    if (listing?.images?.length) {
      setCurrentImageIndex((prev) =>
        prev === 0 ? listing.images.length - 1 : prev - 1
      );
    }
  };

  const handleNextImage = () => {
    if (listing?.images?.length) {
      setCurrentImageIndex((prev) =>
        prev === listing.images.length - 1 ? 0 : prev + 1
      );
    }
  };

  if (loading) return <Typography>Loading...</Typography>;
  if (!listing) return <Typography>Listing not found</Typography>;

  return (
    <Container sx={{ mt: 4, mb: 4 }}>
      <Card sx={{ p: 3 }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            gap: 2,
          }}
        >
          {/* Left side: Image carousel + description */}
          <Box sx={{ flex: 1 }}>
            <Box
              sx={{
                position: "relative",
                width: "100%",
                paddingBottom: "75%",
                bgcolor: "grey.200",
                overflow: "hidden",
              }}
            >
              {listing.images && listing.images.length > 0 ? (
                <>
                  <Box
                    component="img"
                    src={listing.images[currentImageIndex]}
                    alt={`${listing.name} - image ${currentImageIndex + 1}`}
                    sx={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                  {listing.images.length > 1 && (
                    <>
                      <IconButton
                        sx={{
                          position: "absolute",
                          top: "50%",
                          left: 0,
                          transform: "translateY(-50%)",
                          backgroundColor: "rgba(0,0,0,0.4)",
                          color: "#fff",
                          "&:hover": { backgroundColor: "rgba(0,0,0,0.6)" },
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
                          "&:hover": { backgroundColor: "rgba(0,0,0,0.6)" },
                        }}
                        onClick={handleNextImage}
                      >
                        <ArrowForwardIosIcon />
                      </IconButton>
                    </>
                  )}
                </>
              ) : (
                <Box
                  sx={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "grey.600",
                  }}
                >
                  <Typography>No images available.</Typography>
                </Box>
              )}
            </Box>

            <Box sx={{ mt: 2 }}>
              <Typography variant="h4" sx={{ fontWeight: "bold", mb: 1 }}>
                {listing.name}
              </Typography>
              {/* Listing's HTML description */}
              <Typography
                variant="body1"
                dangerouslySetInnerHTML={{ __html: listing.description }}
              />
            </Box>
          </Box>

          {/* Right side: Product + Seller info */}
          <Box
            sx={{
              width: { xs: "100%", md: 300 },
              flexShrink: 0,
              position: { xs: "static", md: "sticky" },
              top: 20,
              height: "fit-content",
            }}
          >
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
            </Box>

            <Box sx={{ display: "flex", gap: 2, mt: 2 }}>
              <Button
                variant="outlined"
                fullWidth
                onClick={() => navigate("/listings")}
              >
                Back to Listings
              </Button>
              <Button
                variant="contained"
                fullWidth
                onClick={() => navigate(`/u/${listing.users?.username}`)}
              >
                Get in Contact
              </Button>
            </Box>
          </Box>
        </Box>
      </Card>
    </Container>
  );
};

export default ListingDetails;
