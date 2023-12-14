import { Link } from "react-router-dom";

import "../scss/profil.scss";
import data from "../data/UserDataTest.json";

export default function Profil() {
  return (
    <main className="profil-main">
      <div className="profil-container">
        <Link to="/" className="back">
          Retour
        </Link>
        <div className="general-container">
          <div className="profil">
            <img src={data[0].img} alt="" />
            <h1>
              {data[0].firstname} {data[0].lastname}
            </h1>
            <div className="buttons">
              <button type="button" className="grey-button">
                Changer la photo de profil
              </button>
              <button type="button" className="blue-button">
                Utiliser l'avatar par default
              </button>
            </div>
          </div>
          <div className="info-container">
            <div className="info-principales">
              <h2>Informations principales</h2>
              <form>
                <input value={data[0].lastname} />
                <input value={data[0].firstname} />
                <input value={data[0].date_naissance} />
                <input value={data[0].email} />
                <input value={data[0].phone} />
              </form>
            </div>
            <div className="info-localisation">
              <h2>Informations de localisation</h2>
              <form>
                <input value={data[0].adresse} />
                <input value={data[0].code_postal} />
                <input value={data[0].ville} />
                <input value={data[0].pays} />
              </form>
            </div>
            <div className="buttons">
              <Link to="/reservation" className="button grey-button">
                Voir les réservations
              </Link>
              <Link to="/profil-vehicule" className="button grey-button">
                Modifier les véhicules
              </Link>
              <button type="button" className="button blue-button">
                Enregistrer les changements
              </button>
              <button type="button" className="no-button">
                Demander un nouveau mot de passe
              </button>
              <button type="button" className="no-button">
                Annuler les changements
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
