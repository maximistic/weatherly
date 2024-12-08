import React from "react";
import { GoogleMap, LoadScript } from "@react-google-maps/api";

interface MapProps {
  lat: number;
  lon: number;
}

const MapComponent: React.FC<MapProps> = ({ lat, lon }) => {
  const containerStyle = {
    width: "100%",
    height: "400px",
  };

  const center = {
    lat,
    lng: lon,
  };

  return (
    <LoadScript googleMapsApiKey={process.env.MAPS_API || ""}>
      <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={10}>
        {/* Optional: Add markers or other overlays here */}
      </GoogleMap>
    </LoadScript>
  );
};

export default MapComponent;