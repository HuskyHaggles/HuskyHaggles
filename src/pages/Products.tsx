// src/pages/Products.tsx
import React from "react";
import { Container, Grid, Typography } from "@mui/material";
import ProductCard from "../components/ProductCard";

// Example product data
const sampleProducts = [
  {
    id: "1",
    name: "Wireless Headphones",
    description:
      "High-quality wireless headphones with noise cancellation for an immersive audio experience.",
    inStock: true,
    images: ["https://via.placeholder.com/200"],
    slug: "wireless-headphones",
  },
  {
    id: "2",
    name: "Smart Watch",
    description:
      "Stay connected and track your health with this sleek and stylish smartwatch.",
    inStock: false,
    images: ["https://via.placeholder.com/200"],
    slug: "smart-watch",
  },
  {
    id: "3",
    name: "Portable Charger",
    description:
      "Never run out of battery with this fast-charging portable power bank, perfect for on-the-go.",
    inStock: true,
    images: ["https://via.placeholder.com/200"],
    slug: "portable-charger",
  },
];

const Products: React.FC = () => {
  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Products
      </Typography>
      <Grid container spacing={3}>
        {sampleProducts.map((product) => (
          <Grid item xs={12} sm={6} md={4} key={product.id}>
            <ProductCard product={product} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Products;
