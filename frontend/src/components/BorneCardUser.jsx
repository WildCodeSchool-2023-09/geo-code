import "../scss/components/borneCardUser.scss";
import PropTypes from "prop-types";
import { useContext } from "react";
import { Link } from "react-router-dom";
import LocationContext from "../Context/locationContext";
import convertToDistance from "../services/ConvertToDistance";
import ReservationContext from "../Context/ReservationContext";

export default function BorneCard({
  name,
  lat,
  lng,
  code,
  disponible,
  puissance,
  prise,
  id,
}) {
  const { position } = useContext(LocationContext);
  const { setBorneId } = useContext(ReservationContext);

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
        </div>
        <div className="userCardBorne_data_array">
          <p className="userCardBorne_data_array_value">
            Puissance : {puissance}
          </p>

          <p className="userCardBorne_data_array_value">Prise : {prise}</p>
        </div>
      </div>
      <Link
        to="/doReservation"
        className="userCardBorne_button"
        onClick={() => {
          setBorneId({
            borne_id: id,
            borne_name: name,
          });
        }}
      >
        Réservation
      </Link>
    </div>
  );
}

BorneCard.propTypes = {
  name: PropTypes.string.isRequired,
  lat: PropTypes.string.isRequired,
  lng: PropTypes.string.isRequired,
  code: PropTypes.string.isRequired,
  puissance: PropTypes.string.isRequired,
  disponible: PropTypes.string.isRequired,
  prise: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
};
