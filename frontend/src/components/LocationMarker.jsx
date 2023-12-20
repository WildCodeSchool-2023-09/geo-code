import { useEffect, useContext } from "react";
import { Marker, Popup, useMap } from "react-leaflet";
import LocationContext from "../Context/locationContext";

function LocationMarker() {
  const { position, setPosition } = useContext(LocationContext);

  const map = useMap();
  const locateMe = () =>
    map.locate().on("locationfound", (e) => {
      map.flyTo(e.latlng, map.getZoom());
    });

  useEffect(() => {
    map.locate().on("locationfound", (e) => {
      setPosition(e.latlng);
      map.flyTo(e.latlng, map.getZoom());
    });
  }, []);
  return (
    <Marker position={position}>
      <div className="locateMe">
        <button type="button" onClick={locateMe}>
          Center
        </button>
      </div>
      <Popup>You are here</Popup>
    </Marker>
  );
}

export default LocationMarker;
