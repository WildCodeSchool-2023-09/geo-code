import { MapContainer, TileLayer } from "react-leaflet";
import Filtre from "../components/Filtre";
import BornesMarker from "../components/BornesMarker";
import LocationMarker from "../components/LocationMarker";
import SecondaryButton from "../components/buttons/SecondaryButton";
import ScrollToTop from "./ResetScrollOnPage";
import "../scss/root.scss";
import "../scss/components/Map.scss";

function Map() {
  window.scrollTo(0, 0);
  return (
    <div className="allMap">
      <ScrollToTop />
      <div className="Container">
        <div className="Container_Filter">
          <Filtre />
        </div>
        <div className="Leaflet_Map">
          <MapContainer
            className="Map"
            center={{ lat: 46.67470283734314, lng: 2.425212152134166 }}
            zoom={10}
            scrollWheelZoom={window.innerWidth > 980}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <LocationMarker />
            <BornesMarker />
            <div className="buttonContainer">
              <SecondaryButton btnText="Liste" btnLink="/bornesListe" />
            </div>
          </MapContainer>
        </div>
      </div>
    </div>
  );
}

export default Map;
