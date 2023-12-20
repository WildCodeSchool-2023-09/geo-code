import { useContext } from "react";
import "../scss/components/borneCardUser.scss";
import PropTypes from "prop-types";
import LocationContext from "../Context/locationContext";

export default function BorneCard({
  name,
  pdc,
  lat,
  lng,
  code,
  enseigne,
  puissance,
  tarification,
  disponible,
  prise,
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
  return (
    <div className="userCardBorne">
      <div className="userCardBorne_info">
        <p className="userCardBorne_info_km">
          {convertToDistance(lat, lng)} km
        </p>
        <div className={disponible} />
      </div>

      <p className="userCardBorne_name">{name}</p>
      <div className="userCardBorne_data">
        <div className="userCardBorne_data_array">
          <p className="userCardBorne_data_array_value">Code postal : {code}</p>
          <p className="userCardBorne_data_array_value">
            Enseigne : {enseigne}
          </p>
          <p className="userCardBorne_data_array_value">
            Nombre de prise : {pdc}
          </p>
        </div>
        <div className="userCardBorne_data_array">
          <p className="userCardBorne_data_array_value">
            Puissance : {puissance}
          </p>
          <p className="userCardBorne_data_array_value">
            Tarification : {tarification}
          </p>
          <p className="userCardBorne_data_array_value">Prise : {prise}</p>
        </div>
      </div>
      <button type="button" className="userCardBorne_button">
        Réservation
      </button>
    </div>
  );
}

BorneCard.propTypes = {
  name: PropTypes.string.isRequired,
  lat: PropTypes.string.isRequired,
  lng: PropTypes.string.isRequired,
  enseigne: PropTypes.string.isRequired,
  pdc: PropTypes.string.isRequired,
  code: PropTypes.string.isRequired,
  puissance: PropTypes.string.isRequired,
  tarification: PropTypes.string.isRequired,
  disponible: PropTypes.string.isRequired,
  prise: PropTypes.string.isRequired,
};
