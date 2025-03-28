// src/components/ListingsGrid.tsx
import React from "react";
import { Grid } from "@mui/material";
import ListingCard from "./ListingCard";

interface Listing {
  id: string;
  [key: string]: any;
}

interface ListingsGridProps {
  listings: Listing[];
}

/**
 * ListingsGrid
 * Renders a list of listings in a responsive grid layout using ListingCard.
 */
const ListingsGrid: React.FC<ListingsGridProps> = ({ listings }) => {
  return (
    <Grid container spacing={2}>
      {listings.map((listing) => (
        <Grid item xs={12} sm={6} md={4} key={listing.id}>
          <ListingCard listing={listing} />
        </Grid>
      ))}
    </Grid>
  );
};

export default ListingsGrid;
