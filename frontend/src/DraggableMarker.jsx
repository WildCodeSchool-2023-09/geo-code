import { useState, useRef, useMemo, useCallback } from "react";
import { Marker, Popup } from "react-leaflet";
import PropTypes from "prop-types";

function DraggableMarker({ center }) {
  const [draggable, setDraggable] = useState(false);
  const [position, setPosition] = useState(center);
  const markerRef = useRef(null);
  const eventHandlers = useMemo(
    () => ({
      dragend() {
        const marker = markerRef.current;
        if (marker != null) {
          setPosition(marker.getLatLng());
        }
      },
    }),
    []
  );
  const toggleDraggable = useCallback(() => {
    setDraggable((d) => !d);
  }, []);

  return (
    <Marker
      draggable={draggable}
      eventHandlers={eventHandlers}
      position={position}
      ref={markerRef}
    >
      <Popup minWidth={90}>
        <button type="button" onClick={toggleDraggable}>
          {draggable
            ? "Marker is draggable"
            : "Click here to make marker draggable"}
        </button>
      </Popup>
    </Marker>
  );
}

DraggableMarker.propTypes = {
  center: PropTypes.isRequired,
};
export default DraggableMarker;
