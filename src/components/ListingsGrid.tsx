// src/components/ListingsGrid.tsx
import Grid from "@mui/material/Grid";
import ListingCard from "./ListingCard";
import { ComponentType } from "react";

interface Listing {
  id: string;
  name: string;
  images: string[];
  [key: string]: any;
}

interface ListingsGridProps {
  listings: Listing[];
}

// Create a typed version of Grid that includes the required props.
const DivGrid = Grid as ComponentType<{
  component: "div";
  container?: boolean;
  item?: boolean;
  xs?: number;
  sm?: number;
  md?: number;
  spacing?: number;
  children: React.ReactNode;
}>;

const ListingsGrid = ({ listings }: ListingsGridProps) => {
  return (
    <DivGrid container component="div" spacing={2}>
      {listings.map((listing) => (
        <DivGrid key={listing.id} item component="div" xs={12} sm={6} md={4}>
          <ListingCard listing={listing} />
        </DivGrid>
      ))}
    </DivGrid>
  );
};

export default ListingsGrid;
