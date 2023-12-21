import "../scss/components/borneCardUser.scss";
import PropTypes from "prop-types";
import { useContext } from "react";
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
  convertToDistance,
}) {
  const { position } = useContext(LocationContext);
  return (
    <div className="userCardBorne">
      <div className="userCardBorne_info">
        <p className="userCardBorne_info_km">
          {convertToDistance(lat, lng, position.lat, position.lng)} km
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
  enseigne: PropTypes.string.isRequired,
  lat: PropTypes.string.isRequired,
  lng: PropTypes.string.isRequired,
  pdc: PropTypes.string.isRequired,
  code: PropTypes.string.isRequired,
  puissance: PropTypes.string.isRequired,
  tarification: PropTypes.string.isRequired,
  disponible: PropTypes.string.isRequired,
  prise: PropTypes.string.isRequired,
  convertToDistance: PropTypes.func.isRequired,
};
