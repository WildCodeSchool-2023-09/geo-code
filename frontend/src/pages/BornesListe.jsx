import { Link } from "react-router-dom";
import BorneCardUser from "../components/BorneCardUser";
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
      disponibilite: "24/24-7/7",
      tarification: "payant",
      isBooked: "false",
      pdc: 1,
    },
    {
      names: "Brest",
      lat: 48.383,
      lng: -4.5,
      code: "27000",
      puissance: "1200",
      prise: "Type 2",
      disponibilite: "24/24-7/7",
      tarification: "payant",
      isBooked: "false",
      pdc: 1,
    },
    {
      names: "Quimper",
      lat: 48.0,
      lng: -4.1,
      code: "22000",
      puissance: "1050",
      prise: "Type 2",
      disponibilite: "24/24-7/7",
      tarification: "payant",
      isBooked: "false",
      pdc: 1,
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
      isBooked: "true",
      pdc: 12,
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
      </div>
      <div className="filterBorne">
        <Filtre />
        <div className="bornesContainer">
          {bornes.map((borne) => (
            <div key={borne.index} className="bornecard">
              <BorneCardUser
                name={borne.names}
                lat={borne.lat}
                lng={borne.lng}
                code={borne.code}
                tarification={borne.tarification}
                disponibilite={borne.disponibilite}
                puissance={borne.puissance}
                isBooked={borne.isBooked}
                pdc={borne.pdc}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default BornesListe;
