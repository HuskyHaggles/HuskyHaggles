// components/ListingCard.tsx
import React from "react";
import {
  Card,
  CardContent,
  Typography,
  CardActionArea,
  Box,
} from "@mui/material";

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
  return (
    <Card variant="outlined" sx={{ mb: 2 }}>
      <CardActionArea>
        {listing.images && listing.images.length > 0 && (
          <Box
            component="img"
            src={listing.images[0]}
            alt={listing.name}
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
