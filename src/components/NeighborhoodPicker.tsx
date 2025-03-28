// components/NeighborhoodPicker.tsx
import React from "react";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { Typography } from "@mui/material";

interface NeighborhoodPickerProps {
  value: string;
  onChange: (
    neighborhood: string,
    coords: { lat: number; lng: number }
  ) => void;
}

const LocationMarker: React.FC<{
  onChange: NeighborhoodPickerProps["onChange"];
}> = ({ onChange }) => {
  const [position, setPosition] = React.useState<{
    lat: number;
    lng: number;
  } | null>(null);

  useMapEvents({
    click(e: { latlng: { lat: any; lng: any } }) {
      const { lat, lng } = e.latlng;
      setPosition({ lat, lng });
      // Replace the following line with an actual reverse geocoding call if needed.
      onChange("Selected Neighborhood", { lat, lng });
    },
  });

  return position ? <Marker position={[position.lat, position.lng]} /> : null;
};

const NeighborhoodPicker: React.FC<NeighborhoodPickerProps> = ({
  value,
  onChange,
}) => {
  return (
    <div>
      <Typography variant="subtitle1">Current Neighborhood: {value}</Typography>
      <MapContainer
        {...({
          center: [51.505, -0.09],
          zoom: 13,
          style: { height: 300, width: "100%" },
        } as any)}
      >
        <TileLayer
          {...({
            attribution: "&copy; OpenStreetMap contributors",
            url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
          } as any)}
        />
        <LocationMarker onChange={onChange} />
      </MapContainer>
    </div>
  );
};

export default NeighborhoodPicker;
