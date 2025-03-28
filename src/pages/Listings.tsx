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
    soldOnly: false,
    dateFrom: "",
    dateTo: "",
    category: "",
    location: "",
    condition: "",
    minPrice: null,
    maxPrice: null,
    sortBy: "date_desc", // Default newest first
  });
  const [listings, setListings] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchListings = async () => {
    setLoading(true);
    let query = supabase.from("listings").select(`
        id, 
        name, 
        images, 
        price, 
        created_at,
        user_id,
        users ( firstName, lastName, username, profile_picture )
      `);

    if (filters.searchTerm)
      query = query.ilike("name", `%${filters.searchTerm}%`);
    if (filters.inStockOnly) query = query.eq("in_stock", true);
    if (filters.soldOnly) query = query.eq("in_stock", false);
    if (filters.dateFrom) query = query.gte("created_at", filters.dateFrom);
    if (filters.dateTo) query = query.lte("created_at", filters.dateTo);
    if (filters.category)
      query = query.ilike("category", `%${filters.category}%`);
    if (filters.location)
      query = query.ilike("location", `%${filters.location}%`);
    if (filters.condition)
      query = query.ilike("condition", `%${filters.condition}%`);
    if (filters.minPrice !== null) query = query.gte("price", filters.minPrice);
    if (filters.maxPrice !== null) query = query.lte("price", filters.maxPrice);

    const { data, error } = await query;
    if (error) {
      console.error("Error fetching listings:", error);
    } else {
      let sortedData = data || [];
      if (filters.sortBy === "date_desc") {
        sortedData = sortedData.sort(
          (a, b) =>
            new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
        );
      } else if (filters.sortBy === "date_asc") {
        sortedData = sortedData.sort(
          (a, b) =>
            new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
        );
      } else if (filters.sortBy === "price_asc") {
        sortedData = sortedData.sort((a, b) => a.price - b.price);
      } else if (filters.sortBy === "price_desc") {
        sortedData = sortedData.sort((a, b) => b.price - a.price);
      }
      setListings(sortedData);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchListings();
  }, [filters]);

  return (
    <>
      <Helmet>
        <title>Browse Listings - Husky Haggles</title>
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
