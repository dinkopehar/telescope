import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

function MapModal() {
  const position = [51.505, -0.09];
  return (
    <MapContainer
      center={position}
      zoom={5}
      style={{ height: "500px", width: "100%" }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a> contributors'
      />
      <Marker position={position}>
        <Popup>Location at (0.0872, -0.0076)</Popup>
      </Marker>
    </MapContainer>
  );
}

export default MapModal;
