import { MapContainer, TileLayer } from "react-leaflet";
import DraggableMarker from "./DraggableMarker";
import LocationMarker from "./LocationMarker";
import BornesMarker from "./BornesMarker";
import "./App.css";

function App() {
  return (
    <MapContainer
      center={{ lat: 48.852969, lng: 2.349903 }}
      zoom={20}
      scrollWheelZoom={false}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <DraggableMarker center={{ lat: 48.852969, lng: 2.349903 }} />
      <LocationMarker />
      <BornesMarker />
    </MapContainer>
  );
}

export default App;
