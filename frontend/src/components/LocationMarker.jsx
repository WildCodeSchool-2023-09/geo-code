import { useState, useEffect } from "react";
import { Marker, Popup, useMap } from "react-leaflet";

function LocationMarker() {
  const [position, setPosition] = useState({ lat: 0, lng: 0 });
  const map = useMap();
  useEffect(() => {
    map.locate().on("locationfound", (e) => {
      setPosition(e.latlng);
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
