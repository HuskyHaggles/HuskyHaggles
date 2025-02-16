// src/components/ProductCard.tsx
import React from "react";
import { Link } from "react-router-dom";
import {
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
  Button,
} from "@mui/material";
import MessageButton from "../components/buttons/MessageButton";

interface Product {
  id: string;
  name: string;
  description: string;
  inStock: boolean;
  images: string[];
  slug: string;
}

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <Card sx={{ maxWidth: 345, m: 2 }}>
      <CardMedia
        component="img"
        height="200"
        image={product.images[0]}
        alt={product.name}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {product.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {product.description.length > 100
            ? product.description.substring(0, 100) + "..."
            : product.description}
        </Typography>
        <Typography
          variant="subtitle2"
          color={product.inStock ? "success.main" : "error.main"}
          sx={{ mt: 1 }}
        >
          {product.inStock ? "In Stock" : "Out of Stock"}
        </Typography>
      </CardContent>
      <CardActions>
        <MessageButton disabled={!product.inStock}>Message</MessageButton>
        <Button
          component={Link}
          to={`/products/${product.slug}`}
          variant="outlined"
        >
          View Details
        </Button>
      </CardActions>
    </Card>
  );
};

export default ProductCard;
