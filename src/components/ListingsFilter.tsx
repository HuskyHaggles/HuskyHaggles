import React, { useState } from "react";
import {
  Box,
  Paper,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Typography,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import { SelectChangeEvent } from "@mui/material/Select";

export interface FilterValues {
  searchTerm: string;
  inStockOnly: boolean;
  soldOnly: boolean;
  dateFrom: string;
  dateTo: string;
  category: string;
  location: string;
  condition: string;
  minPrice: number | null;
  maxPrice: number | null;
  sortBy: string;
}

interface ListingsFilterProps {
  onFilterChange: (filters: FilterValues) => void;
}

const ListingsFilter: React.FC<ListingsFilterProps> = ({ onFilterChange }) => {
  const [filters, setFilters] = useState<FilterValues>({
    searchTerm: "",
    inStockOnly: true, // Checked by default
    soldOnly: false,
    dateFrom: "",
    dateTo: "",
    category: "",
    location: "",
    condition: "",
    minPrice: null,
    maxPrice: null,
    sortBy: "",
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    if (type === "checkbox") {
      const target = e.target as HTMLInputElement;
      const newValue = target.checked;
      setFilters((prev) => {
        const newFilters = {
          ...prev,
          [name]: newValue,
        };
        // Ensure mutual exclusivity
        if (name === "inStockOnly" && newValue) {
          newFilters.soldOnly = false;
        } else if (name === "soldOnly" && newValue) {
          newFilters.inStockOnly = false;
        }
        return newFilters;
      });
    } else {
      setFilters((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSelectChange = (
    e: SelectChangeEvent<string>,
    child: React.ReactNode
  ) => {
    const { name, value } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name as string]: value,
    }));
  };

  const handleApply = () => {
    onFilterChange(filters);
  };

  const handleClear = () => {
    const cleared: FilterValues = {
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
      sortBy: "",
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
          label="Search by name"
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
        <FormControlLabel
          control={
            <Checkbox
              name="soldOnly"
              checked={filters.soldOnly}
              onChange={handleInputChange}
            />
          }
          label="Sold Only"
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
        <FormControl fullWidth>
          <InputLabel>Category</InputLabel>
          <Select
            name="category"
            value={filters.category}
            onChange={handleSelectChange}
            label="Category"
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value="Electronics">Electronics</MenuItem>
            <MenuItem value="Furniture">Furniture</MenuItem>
            <MenuItem value="Books">Books</MenuItem>
            <MenuItem value="Clothing">Clothing</MenuItem>
            {/* Add more categories or fetch from a categories table */}
          </Select>
        </FormControl>
        <TextField
          name="minPrice"
          label="Minimum Price"
          type="number"
          variant="outlined"
          value={filters.minPrice || ""}
          onChange={handleInputChange}
          fullWidth
        />
        <TextField
          name="maxPrice"
          label="Maximum Price"
          type="number"
          variant="outlined"
          value={filters.maxPrice || ""}
          onChange={handleInputChange}
          fullWidth
        />
        <FormControl fullWidth>
          <InputLabel>Sort By</InputLabel>
          <Select
            name="sortBy"
            value={filters.sortBy}
            onChange={handleSelectChange}
            label="Sort By"
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value="date_desc">Date Posted (Newest First)</MenuItem>
            <MenuItem value="date_asc">Date Posted (Oldest First)</MenuItem>
            <MenuItem value="price_asc">Price (Low to High)</MenuItem>
            <MenuItem value="price_desc">Price (High to Low)</MenuItem>
          </Select>
        </FormControl>
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
