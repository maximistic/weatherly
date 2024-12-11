import React from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

interface MapProps {
  lat: number;
  lon: number;
}

const MapComponent: React.FC<MapProps> = ({ lat, lon }) => {
  const containerStyle = {
    width: "100%",
    height: "300px",
  };

  const center = {
    lat,
    lng: lon,
  };

  return (
    <LoadScript
      googleMapsApiKey={process.env.REACT_APP_MAPS_API || ""}
      onError={(error) => {
        console.error("Google Maps API Error:", error);
        return <div>Error loading Google Maps. Please try again later.</div>;
      }}
    >
      <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={10}>
        <Marker position={center} />
      </GoogleMap>
    </LoadScript>
  );
};

export default MapComponent;