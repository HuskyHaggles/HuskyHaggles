import React, { useState, useEffect } from "react";
import { Box, Grid, Typography } from "@mui/material";
import { Helmet } from "react-helmet";
import ListingsFilter, { FilterValues } from "../components/ListingsFilter";
import { supabase } from "../supabaseClient";
import { useNavigate } from "react-router-dom";
import ListingCard from "../components/ListingCard";

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
        users ( firstName, lastName, username, profile_picture )
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

  return (
    <>
      <Helmet>
        <title>All Listings - Husky Haggles</title>
      </Helmet>
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
                  <ListingCard listing={listing} />
                </Grid>
              ))}
            </Grid>
          )}
        </Box>
      </Box>
    </>
  );
};

export default Listings;
