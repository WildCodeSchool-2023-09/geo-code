import { Link } from "react-router-dom";
import BorneCard from "../components/BorneCard";
import Filtre from "./Filtre";
import "../scss/bornesList.scss";

function BornesListe() {
  const bornes = [
    {
      names: "Paris",
      lat: 48.852969,
      lng: 2.349903,
      code: 75000,
      puissance: 1250,
      prise: "Type 2",
      disponibilité: "24/24-7/7",
      tarification: "payant",
    },
    {
      names: "Brest",
      lat: 48.383,
      lng: -4.5,
      code: "27000",
      puissance: "1200",
      prise: "Type 2",
      disponibilité: "24/24-7/7",
      tarification: "payant",
    },
    {
      names: "Quimper",
      lat: 48.0,
      lng: -4.1,
      code: "22000",
      puissance: "1050",
      prise: "Type 2",
      disponibilité: "24/24-7/7",
      tarification: "payant",
    },
    {
      names: "Bayonne",
      lat: 43.5,
      lng: -1.467,
      code: "44000",
      puissance: "1220",
      prise: "Type 1",
      disponibilite: "24/24-7/7",
      tarification: "gratuit",
    },
  ];
  return (
    <div className="borneListPage">
      <div className="buttonContainer">
        <Link to="/map">
          <button type="button" className="mapButton">
            Map
          </button>
        </Link>
        <Link to="/bornesListe">
          <button type="button" className="mapButton">
            Liste
          </button>
        </Link>
        <Filtre />
      </div>
      <div className="bornesContainer">
        {bornes.map((borne) => (
          <div key={borne.index}>
            <BorneCard
              name={borne.names}
              lat={borne.lat}
              lng={borne.lng}
              code={borne.code}
              tarification={borne.tarification}
              dispnibilite={borne.disponibilite}
              puissance={borne.puissance}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default BornesListe;
