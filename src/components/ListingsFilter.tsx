// src/components/ListingsFilter.tsx
import React, { useState } from "react";
import {
  Box,
  Paper,
  TextField,
  FormControlLabel,
  Checkbox,
  Button,
  Typography,
} from "@mui/material";

export interface FilterValues {
  searchTerm: string;
  inStockOnly: boolean;
  dateFrom: string;
  dateTo: string;
  category: string;
  location: string;
  condition: string;
}

interface ListingsFilterProps {
  onFilterChange: (filters: FilterValues) => void;
}

const ListingsFilter: React.FC<ListingsFilterProps> = ({ onFilterChange }) => {
  const [filters, setFilters] = useState<FilterValues>({
    searchTerm: "",
    inStockOnly: false,
    dateFrom: "",
    dateTo: "",
    category: "",
    location: "",
    condition: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleApply = () => {
    onFilterChange(filters);
  };

  const handleClear = () => {
    const cleared = {
      searchTerm: "",
      inStockOnly: false,
      dateFrom: "",
      dateTo: "",
      category: "",
      location: "",
      condition: "",
    };
    setFilters(cleared);
    onFilterChange(cleared);
  };

  return (
    <Paper sx={{ p: 2, mb: 2 }}>
      <Typography variant="h6" gutterBottom>
        Filter Listings
      </Typography>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <TextField
          name="searchTerm"
          label="Search by name or description"
          variant="outlined"
          value={filters.searchTerm}
          onChange={handleInputChange}
          fullWidth
        />
        <FormControlLabel
          control={
            <Checkbox
              name="inStockOnly"
              checked={filters.inStockOnly}
              onChange={handleInputChange}
            />
          }
          label="In Stock Only"
        />
        <TextField
          name="dateFrom"
          label="Date From"
          type="date"
          value={filters.dateFrom}
          onChange={handleInputChange}
          InputLabelProps={{ shrink: true }}
        />
        <TextField
          name="dateTo"
          label="Date To"
          type="date"
          value={filters.dateTo}
          onChange={handleInputChange}
          InputLabelProps={{ shrink: true }}
        />
        <TextField
          name="category"
          label="Category"
          variant="outlined"
          value={filters.category}
          onChange={handleInputChange}
          fullWidth
        />
        <TextField
          name="location"
          label="Location"
          variant="outlined"
          value={filters.location}
          onChange={handleInputChange}
          fullWidth
        />
        <TextField
          name="condition"
          label="Condition"
          variant="outlined"
          value={filters.condition}
          onChange={handleInputChange}
          fullWidth
        />
        <Box sx={{ display: "flex", gap: 1, justifyContent: "flex-end" }}>
          <Button variant="outlined" onClick={handleClear}>
            Clear
          </Button>
          <Button variant="contained" onClick={handleApply}>
            Apply
          </Button>
        </Box>
      </Box>
    </Paper>
  );
};

export default ListingsFilter;
