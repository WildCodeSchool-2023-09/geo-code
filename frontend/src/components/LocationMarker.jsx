import { useEffect, useContext } from "react";
import { Marker, Popup, useMap } from "react-leaflet";
import LocationContext from "../Context/locationContext";

function LocationMarker() {
  const { position, setPosition } = useContext(LocationContext);

  const map = useMap();
  useEffect(() => {
    map.locate().on("locationfound", (e) => {
      setPosition(e.latlng);
      console.info(position);
      map.flyTo(e.latlng, map.getZoom());
    });
  }, []);

  return (
    <Marker position={position}>
      <Popup>You are here</Popup>
    </Marker>
  );
}

export default LocationMarker;
