import { MapContainer, TileLayer, Marker } from "react-leaflet";

const MapComponent = ({ lat, lng }) => {
  if (!lat || !lng) {
    return <p className="text-sm text-gray-500">Location not available</p>;
  }

  return (
    <div className="w-full h-20 rounded-lg overflow-hidden">
    <MapContainer
      center={[lat, lng]}
      zoom={13}
      className="w-full h-full"
      style={{ minHeight: "100%", minWidth: "100%" }}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <Marker position={[lat, lng]} />
    </MapContainer>
  </div>
  );
};

export default MapComponent;
