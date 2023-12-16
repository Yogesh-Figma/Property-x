'use client'
import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";
import { useMemo } from "react";
import "./style.scss";
import CircularProgress from '@mui/material/CircularProgress';

const Map = ({lat, long, apiKey, className}) => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: apiKey,
  });
  const center = useMemo(() => ({ lat: Number(lat), lng: Number(long) }), []);

  return (
    <div className={`google-map-container d-flex align-items-center justify-content-center ${className}`}>
      {!isLoaded ? (
        <CircularProgress sx={{color:"#DC143C"}} />
      ) : (
        <GoogleMap
          mapContainerClassName="map-container"
          center={center}
          zoom={10}
        >
          <Marker position={center} draggable={false} />
        </GoogleMap>
      )}
    </div>
  );
};

export default Map;