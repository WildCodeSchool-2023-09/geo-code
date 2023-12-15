import "../scss/components/borne-card.scss";
import PropTypes from "prop-types";

export default function BorneCard({ name, adresse }) {
  return (
    <div className="card-borne">
      <h2>{name}</h2>
      <h3>{adresse}</h3>
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
