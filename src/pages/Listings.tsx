import React, { useState, useEffect } from "react";
import { Box, Grid, Paper, Typography, CardMedia } from "@mui/material";
import ListingsFilter, { FilterValues } from "../components/ListingsFilter";
import { supabase } from "../supabaseClient";
import { useNavigate } from "react-router-dom";

const Listings: React.FC = () => {
  const navigate = useNavigate();
  const [filters, setFilters] = useState<FilterValues>({
    searchTerm: "",
    inStockOnly: false,
    dateFrom: "",
    dateTo: "",
    category: "",
    location: "",
    condition: "",
  });
  const [listings, setListings] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchListings = async () => {
    setLoading(true);

    let query = supabase.from("listings").select(`
        id, 
        name, 
        description, 
        images, 
        price, 
        user_id, 
        users!inner(firstName, lastName, username)
      `);

    if (filters.searchTerm)
      query = query.ilike("name", `%${filters.searchTerm}%`);
    if (filters.inStockOnly) query = query.eq("in_stock", true);
    if (filters.dateFrom) query = query.gte("created_at", filters.dateFrom);
    if (filters.dateTo) query = query.lte("created_at", filters.dateTo);
    if (filters.category)
      query = query.ilike("category", `%${filters.category}%`);
    if (filters.location)
      query = query.ilike("location", `%${filters.location}%`);
    if (filters.condition)
      query = query.ilike("condition", `%${filters.condition}%`);

    const { data, error } = await query;
    if (error) {
      console.error("Error fetching listings:", error);
    } else {
      setListings(data || []);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchListings();
  }, [filters]);

  const handleListingClick = (listing: any) => {
    if (listing.users?.username) {
      navigate(`/u/${listing.users.username}/${listing.id}`);
    } else {
      navigate(`/listing/${listing.id}`);
    }
  };

  return (
    <Box sx={{ display: "flex", p: 2, gap: 2 }}>
      <Box sx={{ width: { xs: "100%", md: "300px" } }}>
        <ListingsFilter onFilterChange={setFilters} />
      </Box>

      <Box sx={{ flexGrow: 1 }}>
        {loading ? (
          <Typography>Loading listings...</Typography>
        ) : (
          <Grid container spacing={2}>
            {listings.map((listing) => (
              <Grid item xs={12} sm={6} md={4} key={listing.id}>
                <Paper
                  onClick={() => handleListingClick(listing)}
                  sx={{ p: 2, cursor: "pointer", position: "relative" }}
                >
                  {listing.images?.length > 0 ? (
                    <CardMedia
                      component="img"
                      image={listing.images[0]}
                      alt={listing.name}
                      sx={{ height: 150, objectFit: "cover", mb: 1 }}
                    />
                  ) : (
                    <CardMedia
                      component="img"
                      image="https://via.placeholder.com/300x150?text=No+Image"
                      alt="No Image Available"
                      sx={{ height: 150, objectFit: "cover", mb: 1 }}
                    />
                  )}
                  <Typography variant="h6" gutterBottom>
                    {listing.name}
                  </Typography>
                  {listing.price && (
                    <Typography variant="body2" color="text.secondary">
                      Price: ${listing.price}
                    </Typography>
                  )}
                  <Typography variant="body2">{listing.description}</Typography>
                  <Typography variant="caption" color="text.secondary">
                    Seller: {listing.users?.first_name}{" "}
                    {listing.users?.last_name} (@{listing.users?.username})
                  </Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>
        )}
      </Box>
    </Box>
  );
};

export default Listings;
