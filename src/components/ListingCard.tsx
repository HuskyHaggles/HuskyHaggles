// components/ListingCard.tsx
import React from "react";
import {
  Card,
  CardContent,
  Typography,
  CardActionArea,
  Box,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

interface Listing {
  id: string;
  name: string;
  description: string;
  inStock: boolean;
  images: string[];
  created_at: string;
  seller_username: string;
  seller_name: string;
  seller_profile_picture: string;
}

interface ListingCardProps {
  listing: Listing;
}

const ListingCard: React.FC<ListingCardProps> = ({ listing }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    // Navigate to /u/username/listing_uuid
    navigate(`/u/${listing.seller_username}/${listing.id}`);
  };

  return (
    <Card variant="outlined" sx={{ mb: 2 }}>
      <CardActionArea onClick={handleClick}>
        {listing.images && listing.images.length > 0 ? (
          <Box
            component="img"
            src={listing.images[0]}
            alt={listing.name}
            sx={{ width: "100%", height: 150, objectFit: "cover" }}
          />
        ) : (
          <Box
            component="img"
            src="https://via.placeholder.com/300x150?text=No+Image"
            alt="No Image Available"
            sx={{ width: "100%", height: 150, objectFit: "cover" }}
          />
        )}
        <CardContent>
          <Typography variant="h6">{listing.name}</Typography>
          <Typography variant="body2">{listing.description}</Typography>
          <Typography variant="caption" color="text.secondary">
            Seller: {listing.seller_name}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default ListingCard;
