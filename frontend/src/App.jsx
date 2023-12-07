import { MapContainer, TileLayer } from "react-leaflet";
import DraggableMarker from "./DraggableMarker";
import LocationMarker from "./LocationMarker";
import "./App.css";

function App() {
  return (
    <MapContainer
      center={{ lat: 51.505, lng: -0.09 }}
      zoom={13}
      scrollWheelZoom={false}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <DraggableMarker center={{ lat: 51.505, lng: -0.09 }} />
      <LocationMarker />
    </MapContainer>
  );
}

export default App;
