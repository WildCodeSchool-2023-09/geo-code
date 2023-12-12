import { MapContainer, TileLayer } from "react-leaflet";
import { useState } from "react";
import LocationMarker from "../components/LocationMarker";
import BornesMarker from "../components/BornesMarker";

import "../scss/components/Map.scss";

function Map() {
  const [research, setResearch] = useState({
    adresse: "Paris",
    enseignes: "Toutes",
    rayon: 25,
    puissance: 1250,
  });
  const handleChange = (e) => {
    setResearch({ ...research, [e.target.name]: e.target.value });
  };

  return (
    <section className="allMap">
      <div className="buttonContainer">
        <button type="button" className="mapButton">
          Map
        </button>
        <button type="button" className="mapButton">
          Liste
        </button>
      </div>
      <div className="mapContainer">
        <div className="filters">
          <h2>Filtres de recherche</h2>
          <label htmlFor="adresse">Adresse</label>
          <input
            value={research.adresse}
            type="text"
            name="adresse"
            id="adresse"
            onChange={handleChange}
          />{" "}
          <label htmlFor="enseigne">Enseigne</label>
          <select>
            <option value="Toutes">Toutes</option>
            <option value="Une">Une</option>
          </select>{" "}
          <label htmlFor="rayon">Rayon de recherche</label>
          <input
            value={research.rayon}
            type="number"
            name="rayon"
            id="rayon"
            onChange={handleChange}
          />{" "}
          <label htmlFor="puissance">Puissance</label>
          <input
            value={research.puissance}
            type="number"
            name="puissance"
            id="puissance"
            onChange={handleChange}
          />{" "}
          <label htmlFor="prix">Prix</label>
          <div>
            <button type="button">Payant</button>
            <button type="button">Gratuit</button>
            <button type="button">Toutes</button>
          </div>
          <label htmlFor="prix">Disponibilité</label>
          <div>
            <button type="button">Semaine</button>
            <button type="button">24/24-7/7</button>
            <button type="button">Toutes</button>
          </div>
          <label htmlFor="prix">Type de Prise</label>
          <div className="priseButton">
            <button type="button">Type 1</button>
            <button type="button">Type 2</button>
            <button type="button">Type3</button>
            <button type="button">CHadeMO</button>
            <button type="button">Combo CCS</button>
          </div>
          <button type="submit" className="submitResearch">
            Recherche
          </button>
        </div>
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
    </section>
  );
}

export default Map;
