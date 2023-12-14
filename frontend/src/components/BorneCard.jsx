import { useContext } from "react";
import "../scss/components/borne-card.scss";
import PropTypes from "prop-types";
import LocationContext from "../Context/locationContext";

export default function BorneCard({
  name,
  adresse,
  lat,
  lng,
  code,
  puissance,
  tarification,
  disponibilite,
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
    return distance;
  }

  return (
    <div className="card-borne">
      <h2>{name}</h2>
      <h3>{adresse}</h3>
      <h3>{lat}</h3>
      {lng}
      {code}
      {puissance}
      {tarification}
      {disponibilite}
      {convertToDistance(lat, lng)}
      <button type="button" className="blue-button">
        Plus d’informations
      </button>
    </div>
  );
}

BorneCard.propTypes = {
  name: PropTypes.string.isRequired,
  adresse: PropTypes.string.isRequired,
  lat: PropTypes.number.isRequired,
  lng: PropTypes.number.isRequired,
  code: PropTypes.string.isRequired,
  puissance: PropTypes.string.isRequired,
  tarification: PropTypes.string.isRequired,
  disponibilite: PropTypes.string.isRequired,
};
