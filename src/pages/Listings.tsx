// src/pages/Listings.tsx
import React, { useEffect, useState } from "react";
import { Container, Typography, Box } from "@mui/material";
import ListingsGrid from "../components/ListingsGrid";
import ListingsFilter, { FilterValues } from "../components/ListingsFilter";
import { supabase } from "../supabaseClient";

/**
 * Listings Page
 * Shows a filter sidebar and a grid of listings.
 */
const Listings: React.FC = () => {
  const [filters, setFilters] = useState<FilterValues>({
    searchTerm: "",
    inStockOnly: true,
    soldOnly: false,
    dateFrom: "",
    dateTo: "",
    category: "",
    location: "",
    condition: "",
    minPrice: null,
    maxPrice: null,
    sortBy: "date_desc",
  });
  const [listings, setListings] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    document.title = "Browse Listings - Husky Haggles";
  }, []);

  /**
   * Fetch the listings from Supabase, apply filters, then sort locally.
   */
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

    // Apply filters
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
      switch (filters.sortBy) {
        case "date_desc":
          sortedData.sort(
            (a, b) =>
              new Date(b.created_at).getTime() -
              new Date(a.created_at).getTime()
          );
          break;
        case "date_asc":
          sortedData.sort(
            (a, b) =>
              new Date(a.created_at).getTime() -
              new Date(b.created_at).getTime()
          );
          break;
        case "price_asc":
          sortedData.sort((a, b) => a.price - b.price);
          break;
        case "price_desc":
          sortedData.sort((a, b) => b.price - a.price);
          break;
        default:
          // no-op
          break;
      }
      setListings(sortedData);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchListings();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters]);

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h3" sx={{ mb: 2, textAlign: "center" }}>
        Browse Listings
      </Typography>

      <Box sx={{ display: "flex", gap: 2 }}>
        {/* Filter column */}
        <Box sx={{ width: { xs: "100%", md: "300px" } }}>
          <ListingsFilter onFilterChange={setFilters} />
        </Box>

        {/* Listings column */}
        <Box sx={{ flexGrow: 1 }}>
          {loading ? (
            <Typography>Loading listings...</Typography>
          ) : (
            <ListingsGrid listings={listings} />
          )}
        </Box>
      </Box>
    </Container>
  );
};

export default Listings;
