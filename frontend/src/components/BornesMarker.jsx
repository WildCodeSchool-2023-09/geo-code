import { Marker } from "react-leaflet";
import L from "leaflet";
import iconMarker from "../assets/borne-marker-black.svg";

function GetIcon(_iconSize) {
  return L.icon({
    iconUrl: iconMarker,
    iconSize: [_iconSize],
  });
}

function BornesMarker() {
  const bornes = [
    { name: "Paris", lat: 48.852969, lng: 2.349903 },
    { name: "Brest", lat: 48.383, lng: -4.5 },
    { name: "Quimper", lat: 48.0, lng: -4.1 },
    { name: "Bayonne", lat: 43.5, lng: -1.467 },
  ];

  return (
    <div>
      {bornes.map((borne) => (
        <Marker position={borne} key={borne.name} icon={GetIcon()} />
      ))}
    </div>
  );
}
export default BornesMarker;
