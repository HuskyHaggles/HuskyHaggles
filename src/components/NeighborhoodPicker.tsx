import React, { useState } from "react";
import { TextField, Box } from "@mui/material";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { OpenStreetMapProvider } from "leaflet-geosearch";
import { LatLngExpression } from "leaflet";

interface NeighborhoodPickerProps {
  value: string;
  onChange: (
    neighborhood: string,
    coords: { lat: number; lng: number }
  ) => void;
}

const NeighborhoodPicker: React.FC<NeighborhoodPickerProps> = ({
  value,
  onChange,
}) => {
  // Default center: Northeastern University coordinates.
  const [position, setPosition] = useState<{ lat: number; lng: number }>({
    lat: 42.339806,
    lng: -71.089171,
  });
  const provider = new OpenStreetMapProvider();

  const handleSearch = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    if (query.length < 3) return;
    try {
      const results = await provider.search({ query });
      if (results.length > 0) {
        const firstResult = results[0];
        setPosition({ lat: firstResult.y, lng: firstResult.x });
        onChange(firstResult.label, { lat: firstResult.y, lng: firstResult.x });
      }
    } catch (err) {
      console.error("Geocoding error:", err);
    }
  };

  // Define center as a LatLngExpression.
  const center: LatLngExpression = [position.lat, position.lng];

  return (
    <Box>
      <TextField label="Neighborhood" fullWidth onChange={handleSearch} />
      <Box sx={{ mt: 2, height: 200, width: "100%" }}>
        <MapContainer
          center={center as any}
          zoom={13}
          style={{ height: "100%", width: "100%" }}
        >
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          <Marker position={center as any}>
            <Popup>{value}</Popup>
          </Marker>
        </MapContainer>
      </Box>
    </Box>
  );
};

export default NeighborhoodPicker;
