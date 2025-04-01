// src/components/NeighborhoodPicker.tsx
import {
  Autocomplete,
  TextField,
  Box,
  CircularProgress,
  Typography,
  AutocompleteChangeReason,
  AutocompleteChangeDetails,
} from "@mui/material";
import { useState } from "react";

/**
 * Nominatim result type
 */
interface Suggestion {
  lat: string;
  lon: string;
  display_name: string;
  type: string;
}

interface NeighborhoodPickerProps {
  value: string;
  onChange: (
    neighborhood: string,
    coords: { lat: number; lng: number }
  ) => void;
}

const allowedTypes = ["city", "town", "village", "neighbourhood", "suburb"];

/**
 * Debounce helper
 */
function debounce<T extends (...args: any[]) => void>(fn: T, delay: number) {
  let timeout: ReturnType<typeof setTimeout>;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => fn(...args), delay);
  };
}

/**
 * NeighborhoodPicker
 * Provides an autocomplete for searching city/neighborhood via Nominatim.
 */
const NeighborhoodPicker = ({ value, onChange }: NeighborhoodPickerProps) => {
  const [inputValue, setInputValue] = useState<string>(value);
  const [options, setOptions] = useState<Suggestion[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const debouncedFetch = debounce(async (query: string) => {
    if (!query) {
      setOptions([]);
      return;
    }
    setLoading(true);
    try {
      const res = await fetch(
        `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(
          query
        )}&format=json&addressdetails=1`
      );
      const data: Suggestion[] = await res.json();
      const filtered = data.filter((item) => allowedTypes.includes(item.type));
      setOptions(filtered);
    } catch (error) {
      console.error("Error fetching suggestions", error);
      setOptions([]);
    }
    setLoading(false);
  }, 500);

  const handleInputChange = (
    _event: React.SyntheticEvent,
    newInputValue: string
  ) => {
    setInputValue(newInputValue);
    debouncedFetch(newInputValue);
  };

  const handleChange = (
    _event: React.SyntheticEvent,
    newValue: string | Suggestion,
    _reason: AutocompleteChangeReason,
    _details?: AutocompleteChangeDetails<string | Suggestion>
  ) => {
    if (typeof newValue === "string") {
      // If a raw string is returned, update inputValue only
      setInputValue(newValue);
      return;
    }
    const lat = parseFloat(newValue.lat);
    const lng = parseFloat(newValue.lon);
    onChange(newValue.display_name, { lat, lng });
    setInputValue(newValue.display_name);
  };

  return (
    <Box>
      <Autocomplete<Suggestion, false, true, true>
        freeSolo
        disableClearable
        options={options}
        getOptionLabel={(option) =>
          typeof option === "string" ? option : option.display_name
        }
        inputValue={inputValue}
        onInputChange={handleInputChange}
        onChange={handleChange}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Neighborhood/City"
            variant="outlined"
            onKeyDown={(e) => {
              if (e.key === "Enter") e.preventDefault();
            }}
            InputProps={{
              ...params.InputProps,
              endAdornment: (
                <>
                  {loading && <CircularProgress color="inherit" size={20} />}
                  {params.InputProps.endAdornment}
                </>
              ),
            }}
          />
        )}
      />
      <Typography variant="subtitle1" sx={{ mt: 1 }}>
        Selected: {value}
      </Typography>
    </Box>
  );
};

export default NeighborhoodPicker;
