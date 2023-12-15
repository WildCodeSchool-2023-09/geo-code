import { Link } from "react-router-dom";
import { useContext } from "react";
import FilterContext from "../Context/ResearchContext";
import BorneCardUser from "../components/BorneCardUser";
import Filtre from "./Filtre";
import "../scss/bornesList.scss";

function BornesListe() {
  const bornes = [
    {
      names: "Paris",
      lat: 48.852969,
      lng: 2.349903,
      code: "75000",
      enseigne: "Une",
      puissance: 1250,
      prise: "Type 2",
      tarification: "payant",
      disponible: "false",
      pdc: 1,
    },
    {
      names: "Brest",
      lat: 48.383,
      lng: -4.5,
      code: "27000",
      puissance: "1200",
      enseigne: "Toutes",
      prise: "Type 2",
      tarification: "payant",
      disponible: "false",
      pdc: 1,
    },
    {
      names: "Quimper",
      lat: 48.0,
      lng: -4.1,
      code: "22000",
      puissance: "1050",
      enseigne: "Une",
      prise: "Type 2",
      tarification: "payant",
      disponible: "false",
      pdc: 1,
    },
    {
      names: "Bayonne",
      lat: 43.5,
      lng: -1.467,
      code: "44000",
      puissance: "1220",
      enseigne: "Toutes",
      prise: "Type 1",
      tarification: "gratuit",
      disponible: "true",
      pdc: 12,
    },
  ];
  const { research } = useContext(FilterContext);

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
          {bornes
            .filter((borne) => borne.code.includes(research.code))
            .map((borne) => (
              <div key={borne.index} className="bornecard">
                <BorneCardUser
                  name={borne.names}
                  lat={borne.lat}
                  lng={borne.lng}
                  code={borne.code}
                  enseigne={borne.enseigne}
                  tarification={borne.tarification}
                  puissance={borne.puissance}
                  disponible={borne.disponible}
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
