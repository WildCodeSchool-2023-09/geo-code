import "../scss/components/user-card.scss";
import PropTypes from "prop-types";

export default function UserCard({ firstname, lastname, img }) {
  return (
    <div className="card">
      <img src={img} alt="" />
      <h2>
        {firstname} {lastname}
      </h2>
      <button type="button" className="white-button">
        Plus d’informations
      </button>
      <button type="button" className=" blue-button">
        Editer ce profil
      </button>
      <button type="button" className=" dark-blue-button">
        Supprimer ce profil
      </button>
    </div>
  );
}

UserCard.propTypes = {
  firstname: PropTypes.string.isRequired,
  lastname: PropTypes.string.isRequired,
  img: PropTypes.string.isRequired,
};
