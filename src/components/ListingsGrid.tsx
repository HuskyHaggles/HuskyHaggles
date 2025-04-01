// src/components/ListingsGrid.tsx
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
 * Renders a list of listings in a responsive grid layout.
 */
const ListingsGrid = ({ listings }: ListingsGridProps) => {
  return (
    <Grid container spacing={2}>
      {listings.map((listing) => (
        // Using new MUI Grid v2 syntax: remove "item" prop; responsive props go directly
        <Grid key={listing.id} xs={12} sm={6} md={4}>
          <ListingCard listing={listing} />
        </Grid>
      ))}
    </Grid>
  );
};

export default ListingsGrid;
