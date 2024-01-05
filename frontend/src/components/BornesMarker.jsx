import { Marker } from "react-leaflet";
// import axios from "axios";
import L from "leaflet";
import { useContext, useEffect } from "react";
import convertToDistance from "../services/ConvertToDistance";
import LocationContext from "../Context/locationContext";
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
  // const bornes = () => {
  //   axios
  //     .get()
  //     .then()
  //     .catch((error) => console.info(error));
  // };
  const { research } = useContext(FilterContext);
  useEffect(() => {
    console.info(research);
  }, [research]);
  const { position } = useContext(LocationContext);
  return (
    <div>
      {bornes
        .filter(
          (borne) =>
            borne.code.includes(research.code) &&
            borne.enseigne.includes(research.enseigne) &&
            borne.tarification.includes(research.tarification) &&
            borne.puissance.includes(research.puissance) &&
            borne.prise.includes(research.prise) &&
            convertToDistance(
              borne.lat,
              borne.lng,
              position.lat,
              position.lng
            ) <= parseInt(research.rayon, 10)
        )
        .map((borne) => (
          <Marker position={borne} key={borne.name} icon={GetIcon()} />
        ))}
    </div>
  );
}
export default BornesMarker;
