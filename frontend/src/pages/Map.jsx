import { MapContainer, TileLayer } from "react-leaflet";
import LocationMarker from "../components/LocationMarker";
import BornesMarker from "../components/BornesMarker";
import "../App.css";

function Map() {
  return (
    <MapContainer
      center={{ lat: 46.67470283734314, lng: 2.425212152134166 }}
      zoom={10}
      scrollWheelZoom={false}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <LocationMarker />
      <BornesMarker />
    </MapContainer>
  );
}

export default Map;
