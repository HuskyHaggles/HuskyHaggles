// components/NeighborhoodPicker.tsx
import React, { useState, useEffect } from "react";
import {
  Autocomplete,
  TextField,
  Box,
  CircularProgress,
  Typography,
} from "@mui/material";
import {
  MapContainer,
  TileLayer,
  Marker,
  Circle,
  useMap,
  useMapEvents,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";

interface Suggestion {
  lat: string;
  lon: string;
  display_name: string;
  type: string;
}

interface NeighborhoodPickerProps {
  value: string;
  latitude: number;
  longitude: number;
  onChange: (
    neighborhood: string,
    coords: { lat: number; lng: number }
  ) => void;
}

const allowedTypes = ["city", "town", "village", "neighbourhood", "suburb"];

function debounce<T extends (...args: any[]) => void>(fn: T, delay: number) {
  let timeout: ReturnType<typeof setTimeout>;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => fn(...args), delay);
  };
}

const Recenter: React.FC<{ center: [number, number] }> = ({ center }) => {
  const map = useMap();
  useEffect(() => {
    map.setView(center, 15);
  }, [center, map]);
  return null;
};

const MapClickHandler: React.FC<{
  onChange: NeighborhoodPickerProps["onChange"];
}> = ({ onChange }) => {
  useMapEvents({
    click(e) {
      const { lat, lng } = e.latlng;
      // Reverse geocode the clicked point
      (async () => {
        try {
          const res = await fetch(
            `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json&addressdetails=1`
          );
          const data = await res.json();
          const display_name = data.display_name || "Selected Location";
          onChange(display_name, { lat, lng });
        } catch (error) {
          onChange("Selected Location", { lat, lng });
        }
      })();
    },
  });
  return null;
};

const NeighborhoodPicker: React.FC<NeighborhoodPickerProps> = ({
  value,
  latitude,
  longitude,
  onChange,
}) => {
  const [inputValue, setInputValue] = useState<string>(value);
  const [options, setOptions] = useState<Suggestion[]>([]);
  const [center, setCenter] = useState<[number, number]>([latitude, longitude]);
  const [loading, setLoading] = useState<boolean>(false);

  // On mount, attempt to use current location; fallback if denied.
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat = position.coords.latitude;
          const lng = position.coords.longitude;
          setCenter([lat, lng]);
          onChange("Current Location", { lat, lng });
          setInputValue("Current Location");
        },
        () => {
          setCenter([latitude, longitude]);
          onChange("Northeastern University, Boston", {
            lat: latitude,
            lng: longitude,
          });
          setInputValue("Northeastern University, Boston");
        }
      );
    } else {
      setCenter([latitude, longitude]);
      onChange("Northeastern University, Boston", {
        lat: latitude,
        lng: longitude,
      });
      setInputValue("Northeastern University, Boston");
    }
  }, [latitude, longitude, onChange]);

  const fetchSuggestions = async (query: string) => {
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
      // Only keep results with allowed types.
      const filtered = data.filter((item) => allowedTypes.includes(item.type));
      setOptions(filtered);
    } catch (error) {
      console.error("Error fetching suggestions", error);
      setOptions([]);
    }
    setLoading(false);
  };

  const debouncedFetch = debounce(fetchSuggestions, 500);

  const handleInputChange = (
    _event: React.SyntheticEvent,
    newInputValue: string
  ) => {
    setInputValue(newInputValue);
    debouncedFetch(newInputValue);
  };

  const handleSelection = (
    _event: React.SyntheticEvent,
    newValue: Suggestion | null
  ) => {
    if (newValue) {
      const lat = parseFloat(newValue.lat);
      const lng = parseFloat(newValue.lon);
      setCenter([lat, lng]);
      onChange(newValue.display_name, { lat, lng });
      setInputValue(newValue.display_name);
    }
  };

  return (
    <Box>
      <Autocomplete
        freeSolo
        disableClearable
        options={options}
        getOptionLabel={(option) =>
          typeof option === "string" ? option : option.display_name || ""
        }
        inputValue={inputValue}
        onInputChange={handleInputChange}
        onChange={handleSelection}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Search Neighborhood/City"
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
      <Box sx={{ mt: 2 }}>
        <MapContainer
          center={center}
          zoom={15}
          style={{ height: 300, width: "100%" }}
        >
          <Recenter center={center} />
          <TileLayer
            attribution="&copy; OpenStreetMap contributors"
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={center} />
          <Circle center={center} radius={500} />
          <MapClickHandler onChange={onChange} />
        </MapContainer>
      </Box>
    </Box>
  );
};

export default NeighborhoodPicker;
