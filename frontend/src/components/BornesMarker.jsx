import { Marker } from "react-leaflet";
import L from "leaflet";
import { useContext, useEffect } from "react";
import FilterContext from "../Context/ResearchContext";
import iconMarker from "../assets/borne-marker-black.svg";
import bornes from "../data/BorneUser";

function GetIcon(_iconSize) {
  return L.icon({
    iconUrl: iconMarker,
    iconSize: [_iconSize],
  });
}

function BornesMarker() {
  const { research } = useContext(FilterContext);
  useEffect(() => {
    console.info(research);
  }, [research]);
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
