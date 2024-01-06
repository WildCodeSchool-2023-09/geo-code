import "../scss/components/borne-card.scss";
import PropTypes from "prop-types";

export default function BorneCard({ name, adresse }) {
  return (
    <div className="card_borne">
      <p className="card_borne_name">{name}</p>
      <p className="card_borne_adresse">{adresse}</p>
      <button type="button" className="blue-button">
        Plus d’informations
      </button>
    </div>
  );
}

BorneCard.propTypes = {
  name: PropTypes.string.isRequired,
  adresse: PropTypes.string.isRequired,
};
