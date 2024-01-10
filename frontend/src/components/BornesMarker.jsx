import { Marker, useMap } from "react-leaflet";
import L from "leaflet";
import axios from "axios";
import { useContext, useEffect, useState, useCallback } from "react";
import Supercluster from "supercluster";
import convertToDistance from "../services/ConvertToDistance";
import iconMarker from "../assets/borne-marker-white.svg";
import LocationContext from "../Context/locationContext";
import FilterContext from "../Context/ResearchContext";
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
    ...oneBorne,
    type: "Feature",
    properties: {
      cluster: true,
      point_count: bornes.indexOf(oneBorne),
      clusterId: oneBorne.code_postal.slice(0, 2),
    },
    geometry: {
      type: "Point",
      coordinates: [oneBorne.lat, oneBorne.lng],
    },
  }));

  if (research.rayon === "" || research.rayon === "0") {
    research.rayon = "1085";
  }
  let borneFilters = [];

  if (research.prise === "") {
    borneFilters = allBornes.filter(
      (cluster) =>
        cluster.code_postal.slice(0, 2).includes(research.code) &&
        cluster.n_enseigne.includes(research.enseigne) &&
        cluster.puiss_max.includes(research.puissance) &&
        cluster.type_prise.includes(
          research.prise || research.prise.toLowerCase()
        ) &&
        convertToDistance(
          cluster.lat,
          cluster.lng,
          position.lat,
          position.lng
        ) <= parseInt(research.rayon, 10)
    );
  }
  for (let i = 0; i < research.prise.length; i += 1) {
    borneFilters = allBornes.filter(
      (cluster) =>
        cluster.code_postal.slice(0, 2).includes(research.code) &&
        cluster.n_enseigne.includes(research.enseigne) &&
        cluster.puiss_max.includes(research.puissance) &&
        cluster.type_prise.includes(
          research.prise[i] || research.prise[i].toLowerCase()
        ) &&
        convertToDistance(
          cluster.lat,
          cluster.lng,
          position.lat,
          position.lng
        ) <= parseInt(research.rayon, 10)
    );
  }

  const supercluster = new Supercluster({ radius: 75, maxZoom: 15 });
  const bounds = [
    -36.64988022329375, -4.915832801313164, 51.328635401706265,
    59.84481485969108,
  ];
  const [zoom, setZoom] = useState(20);
  const [clusters, setClusters] = useState([]);
  const map = useMap();

  function updateMap() {
    setZoom(map.getZoom());
  }
  const onMove = useCallback(() => {
    updateMap();
  }, [map]);

  useEffect(() => {
    updateMap();
  }, []);

  useEffect(() => {
    map.on("move", onMove);
  }, [map, onMove]);

  useEffect(() => {
    supercluster.load(borneFilters);
    setClusters(supercluster.getClusters(bounds, zoom));
  }, [zoom, research]);

  return (
    <div>
      {clusters.map((cluster) => {
        // every cluster point has coordinates
        const [lat, lng] = cluster.geometry.coordinates;
        // the point may be either a cluster or a crime point
        const { cluster: isCluster, clusterId } = cluster.properties;

        if (isCluster) {
          return (
            <Marker
              key={`cluster-${cluster.id}`}
              position={[lat, lng]}
              icon={GetIcon()}
              eventHandlers={{
                click: () => {
                  const expansionZoom = Math.min(
                    supercluster.getClusterExpansionZoom(clusterId),
                    15
                  );
                  map.setView([lat, lng], expansionZoom, {
                    animate: true,
                  });
                },
              }}
            />
          );
        }
        return cluster.map((borne) => (
          <Marker position={[lat, lng]} key={borne.id} icon={GetIcon()} />
        ));
      })}
    </div>
  );
}
export default BornesMarker;
