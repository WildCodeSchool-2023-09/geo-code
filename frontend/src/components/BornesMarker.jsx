import { Marker } from "react-leaflet";
import axios from "axios";
import L from "leaflet";
// import useSupercluster from "use-supercluster";
import { useContext, useEffect, useState } from "react";
import convertToDistance from "../services/ConvertToDistance";
import iconMarker from "../assets/borne-marker-white.svg";
import LocationContext from "../Context/locationContext";
import FilterContext from "../Context/ResearchContext";

const API_URL = `${import.meta.env.VITE_BACKEND_URL}/api`;

function GetIcon() {
  return L.icon({
    iconUrl: iconMarker,
    iconSize: [30, 30],
    iconAnchor: [30, 15],
  });
}
function BornesMarker() {
  const [bornes, setBornes] = useState([]);
  const { research } = useContext(FilterContext);
  const { position } = useContext(LocationContext);
  useEffect(() => {
    console.info(research);
  }, [research]);

  useEffect(() => {
    axios
      .get(`${API_URL}/bornes`)
      .then((res) => setBornes(res.data))
      .catch((error) => console.info(error));
  }, [research]);
  if (research.rayon === "" || research.rayon === "0") {
    research.rayon = "1085";
  }
  return (
    <div>
      {bornes
        .filter(
          (borne) =>
            borne.code_postal.includes(research.code) &&
            borne.n_enseigne.includes(research.enseigne) &&
            borne.puiss_max.includes(research.puissance) &&
            borne.type_prise.includes(
              research.prise || research.prise.toLowerCase()
            ) &&
            convertToDistance(
              borne.lat,
              borne.lng,
              position.lat,
              position.lng
            ) <= parseInt(research.rayon, 10)
        )
        .map((borne) => (
          <Marker position={borne} key={borne.id} icon={GetIcon()} />
        ))}
    </div>
  );
}
export default BornesMarker;
