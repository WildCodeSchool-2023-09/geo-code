import { MapContainer, TileLayer } from "react-leaflet";
import { Link } from "react-router-dom";
import Filtre from "./Filtre";
import LocationMarker from "../components/LocationMarker";
import BornesMarker from "../components/BornesMarker";
import "../scss/root.scss";
import "../scss/components/Map.scss";

function Map() {
  return (
    <div className="allMap">
      <div className="buttonContainer">
        <button type="button" className="mapButton">
          Map
        </button>
        <Link to="/bornesListe">
          <button type="button" className="mapButton">
            Liste
          </button>
        </Link>
      </div>
      <div className="mapContainer">
        <Filtre />
        <div>
          <MapContainer
            className="Map"
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
        </div>
      </div>
    </div>
  );
}

export default Map;
