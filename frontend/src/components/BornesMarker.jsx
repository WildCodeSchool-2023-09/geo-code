import { Marker } from "react-leaflet";
import L from "leaflet";
import { useContext } from "react";
import FilterContext from "../Context/ResearchContext";
import iconMarker from "../assets/borne-marker-black.svg";

function GetIcon(_iconSize) {
  return L.icon({
    iconUrl: iconMarker,
    iconSize: [_iconSize],
  });
}

function BornesMarker() {
  const { research } = useContext(FilterContext);
  const bornes = [
    {
      names: "Paris",
      lat: 48.852969,
      lng: 2.349903,
      code: "75000",
      enseigne: "Une",
      puissance: "1250",
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
      enseigne: "Deux",
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
      enseigne: "Deux",
      prise: "Type 1",
      tarification: "gratuit",
      disponible: "true",
      pdc: 12,
    },
  ];

  return (
    <div>
      {bornes
        .filter(
          (borne) =>
            borne.code.includes(research.code) &&
            borne.enseigne.includes(research.enseigne) &&
            borne.tarification.includes(research.tarification) &&
            borne.puissance.includes(research.puissance) &&
            borne.prise.includes(research.prise)
        )
        .map((borne) => (
          <Marker position={borne} key={borne.name} icon={GetIcon()} />
        ))}
    </div>
  );
}
export default BornesMarker;
