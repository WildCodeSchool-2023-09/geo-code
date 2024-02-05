import { Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import axios from "axios";
import { useContext, useEffect, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import Supercluster from "supercluster";
import convertToDistance from "../services/ConvertToDistance";
import iconMarker from "../assets/borne-marker-white.svg";
import LocationContext from "../Context/locationContext";
import FilterContext from "../Context/ResearchContext";
import ReservationContext from "../Context/ReservationContext";
import BornesContext from "../Context/BornesContext";

function GetIcon() {
  // fonction qui permet de customiser l'icône des bornes
  return L.icon({
    iconUrl: iconMarker,
    iconSize: [30, 30],
    iconAnchor: [30, 15],
  });
}
function BornesMarker() {
  let allBornes = [];

  // import des contexts qui seront utilisés
  const { research } = useContext(FilterContext);
  const { position } = useContext(LocationContext);
  const { bornes, setBornes } = useContext(BornesContext);
  const { setBorneId } = useContext(ReservationContext);

  useEffect(() => {
    // permet de réactualiser le composant reasearch à chaque changement.
    console.info(research);
  }, [research]);

  const API_URL = `${import.meta.env.VITE_BACKEND_URL}/api`;

  useEffect(() => {
    // import des data sur les bornes
    axios
      .get(`${API_URL}/bornes`)
      .then((res) => setBornes(res.data))
      .catch((error) => console.error(error));
  }, []);

  // transformation en geojson pour pouvoir faire le cluster
  allBornes = bornes.map((oneBorne) => ({
    type: "Feature",
    properties: {
      cluster: false,
      ...oneBorne,
    },
    geometry: {
      type: "Point",
      coordinates: [oneBorne.lng, oneBorne.lat],
    },
  }));

  if (research.rayon === "" || research.rayon === "0") {
    research.rayon = "1085";
  }
  let borneFilters = [];

  if (research.prise === "") {
    borneFilters = allBornes.filter(
      (cluster) =>
        cluster.properties.code_postal.startsWith(research.code) &&
        cluster.properties.n_enseigne.includes(research.enseigne) &&
        cluster.properties.puiss_max.includes(research.puissance) &&
        cluster.properties.type_prise.includes(
          research.prise || research.prise.toLowerCase()
        ) &&
        convertToDistance(
          cluster.properties.lat,
          cluster.properties.lng,
          position.lat,
          position.lng
        ) <= parseInt(research.rayon, 10)
    );
  }
  for (let i = 0; i < research.prise.length; i += 1) {
    borneFilters = allBornes.filter(
      (cluster) =>
        cluster.properties.code_postal.startsWith(research.code) &&
        cluster.properties.puiss_max.includes(research.puissance) &&
        cluster.properties.type_prise.includes(
          research.prise[i] || research.prise[i].toLowerCase()
        ) &&
        convertToDistance(
          cluster.properties.lat,
          cluster.properties.lng,
          position.lat,
          position.lng
        ) <= parseInt(research.rayon, 10)
    );
  }

  const supercluster = new Supercluster({ radius: 75, maxZoom: 15 });
  const [bbox, setBbox] = useState([]);
  const [zoom, setZoom] = useState(15);
  const [clusters, setClusters] = useState([]);
  const map = useMap();

  function updateMap() {
    const b = map.getBounds();
    setBbox([
      b.getSouthWest().lng,
      b.getSouthWest().lat,
      b.getNorthEast().lng,
      b.getNorthEast().lat,
    ]);
    setZoom(map.getZoom());
  }
  const onMove = useCallback(() => {
    updateMap();
  }, [map]);

  useEffect(() => {
    updateMap();
  }, [map]);

  useEffect(() => {
    map.on("move", onMove);
  }, [map, onMove]);

  useEffect(() => {
    supercluster.load(borneFilters);
    setClusters(supercluster.getClusters(bbox, zoom));
  }, [zoom, research]);

  return (
    <div>
      {clusters.map((cluster) => {
        // every cluster point has coordinates
        const [lat, lng] = cluster.geometry.coordinates;
        // the point may be either a cluster or a crime point
        const { cluster: isCluster } = cluster.properties;

        if (isCluster) {
          return (
            <Marker
              key={`cluster-${cluster.id}`}
              position={[lng, lat]}
              icon={GetIcon()}
            />
          );
        }

        return (
          <Marker position={[lng, lat]} key={cluster.id} icon={GetIcon()}>
            <Popup>
              <h2>{cluster.properties.n_station}</h2>
              <p>Nombre de prise : {cluster.properties.nbre_pdc}</p>
              <p>Type de prise : {cluster.properties.type_prise}</p>
              <p>
                {" "}
                {convertToDistance(
                  cluster.properties.lat,
                  cluster.properties.lng,
                  position.lat,
                  position.lng
                )}{" "}
                km
              </p>
              <Link
                to="/DoReservation"
                className="doreservation"
                onClick={() => {
                  setBorneId({
                    borne_id: cluster.properties.id,
                    borne_name: cluster.properties.n_station,
                  });
                }}
              >
                <button type="button" className="reservation">
                  Réservez cette borne
                </button>
              </Link>
            </Popup>
          </Marker>
        );
      })}
    </div>
  );
}
export default BornesMarker;
