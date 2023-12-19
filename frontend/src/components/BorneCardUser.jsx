import { useContext } from "react";
import "../scss/components/borne-card.scss";
import PropTypes from "prop-types";
import LocationContext from "../Context/locationContext";

export default function BorneCard({
  name,
  pdc,
  lat,
  lng,
  code,
  puissance,
  tarification,
  disponibilite,
  isBooked,
}) {
  const { position } = useContext(LocationContext);

  function convertToDistance() {
    const radiusEarthkm = 6371.07103;
    const radlat = lat * (Math.PI / 180);
    const radPositionLat = position.lat * (Math.PI / 180);
    const radlatDiff = (lat - position.lat) * (Math.PI / 180);
    const radlngDiff = (lng - position.lng) * (Math.PI / 180);
    const distance =
      2 *
      radiusEarthkm *
      Math.sin(
        Math.sqrt(
          Math.sin(radlatDiff / 2) * Math.sin(radlatDiff / 2) +
            Math.cos(radPositionLat) *
              Math.cos(radlat) *
              Math.sin(radlngDiff / 2) *
              Math.sin(radlngDiff / 2)
        )
      );
    return distance.toFixed(1);
  }
  console.info(isBooked);
  return (
    <div className="userCardBorne">
      <div className="isdisponible">
        <p>{convertToDistance(lat, lng)} km</p>

        <div className={isBooked} />
      </div>

      <h2>{name}</h2>
      <h3>Adresse : {code}</h3>
      <h3>Nombre de prise : {pdc}</h3>
      <h3>Puissance : {puissance}</h3>
      <h3>Tarification : {tarification}</h3>
      <h3>Disponibilité : {disponibilite}</h3>
      <button type="button" className="blue-button">
        Réservation
      </button>
    </div>
  );
}

BorneCard.propTypes = {
  name: PropTypes.string.isRequired,
  lat: PropTypes.number.isRequired,
  lng: PropTypes.number.isRequired,
  pdc: PropTypes.number.isRequired,
  code: PropTypes.string.isRequired,
  puissance: PropTypes.string.isRequired,
  tarification: PropTypes.string.isRequired,
  disponibilite: PropTypes.string.isRequired,
  isBooked: PropTypes.bool.isRequired,
};
