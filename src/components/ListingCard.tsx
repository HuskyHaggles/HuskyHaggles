// src/components/ListingCard.tsx
import React from "react";
import {
  Card,
  CardActionArea,
  CardContent,
  Typography,
  CardMedia,
  Box,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

interface User {
  firstName: string;
  lastName: string;
  username: string;
  profile_picture: string;
}

interface Listing {
  id: string;
  name: string;
  images: string[];
  price?: number;
  created_at?: string;
  users?: User;
}

interface ListingCardProps {
  listing: Listing;
}

/**
 * ListingCard
 * Renders a single listing item with an image, name, price, and seller info.
 */
const ListingCard: React.FC<ListingCardProps> = ({ listing }) => {
  const navigate = useNavigate();

  /**
   * On card click:
   * - If listing has a user with a username, go to /u/<username>/<listingId>
   * - Otherwise, go to /listing/<listingId>
   */
  const handleCardClick = () => {
    if (listing.users?.username) {
      navigate(`/u/${listing.users.username}/${listing.id}`);
    } else {
      navigate(`/listing/${listing.id}`);
    }
  };

  /**
   * On seller username click, stop event propagation and go to user’s page.
   */
  const handleUsernameClick = (
    e: React.MouseEvent<HTMLSpanElement, MouseEvent>
  ) => {
    e.stopPropagation();
    navigate(`/u/${listing.users?.username}`);
  };

  return (
    <Card variant="outlined" sx={{ m: 1 }}>
      <CardActionArea onClick={handleCardClick}>
        {listing.images && listing.images.length > 0 ? (
          <CardMedia
            component="img"
            image={listing.images[0]}
            alt={listing.name}
            sx={{
              height: 150,
              objectFit: "cover",
              objectPosition: "center",
              width: "100%",
            }}
          />
        ) : (
          <CardMedia
            component="img"
            image="https://via.placeholder.com/300x150?text=No+Image"
            alt="No Image Available"
            sx={{
              height: 150,
              objectFit: "cover",
              objectPosition: "center",
              width: "100%",
            }}
          />
        )}

        <CardContent>
          <Typography variant="h6" gutterBottom>
            {listing.name}
          </Typography>
          {listing.price && (
            <Typography variant="body2" color="text.secondary">
              Price: ${listing.price}
            </Typography>
          )}
          {listing.created_at && (
            <Typography
              variant="caption"
              color="text.secondary"
              display="block"
            >
              Posted on: {new Date(listing.created_at).toLocaleString()}
            </Typography>
          )}

          {listing.users && (
            <Typography variant="caption" color="text.secondary">
              Seller: {listing.users.firstName} {listing.users.lastName} (
              <Box
                component="span"
                sx={{
                  color: "primary.main",
                  cursor: "pointer",
                  textDecoration: "underline",
                }}
                onClick={handleUsernameClick}
              >
                @{listing.users.username}
              </Box>
              )
            </Typography>
          )}
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default ListingCard;
