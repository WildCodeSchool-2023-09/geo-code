import { Link } from "react-router-dom";
import { useState } from "react";
import ScrollToTop from "./ResetScrollOnPage";
import "../scss/profil.scss";

import data from "../data/UserDataTest.json";

export default function Profil() {
  const [lastname, setLastname] = useState(data[0].lastname);
  const [firstname, setFirstname] = useState(data[0].firstname);
  const [birthday, setBirthday] = useState(data[0].date_naissance);
  const [email, setEmail] = useState(data[0].email);
  const [phone, setPhone] = useState(data[0].phone);
  const [adresse, setAdresse] = useState(data[0].adresse);
  const [codePostal, setCodePostal] = useState(data[0].code_postal);
  const [ville, setVille] = useState(data[0].ville);
  const [pays, setPays] = useState(data[0].pays);

  return (
    <main className="profil-main">
      <ScrollToTop />
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
                <input
                  value={lastname}
                  onChange={(e) => setLastname(e.target.value)}
                />
                <input
                  value={firstname}
                  onChange={(e) => setFirstname(e.target.value)}
                />
                <input
                  type="date"
                  value={birthday}
                  onChange={(e) => setBirthday(e.target.value)}
                />
                <input
                  value={email}
                  type="email"
                  onChange={(e) => setEmail(e.target.value)}
                />
                <input
                  value={phone}
                  type="number"
                  onChange={(e) => setPhone(e.target.value)}
                />
              </form>
            </div>
            <div className="info-localisation">
              <h2>Informations de localisation</h2>
              <form>
                <input
                  value={adresse}
                  onChange={(e) => setAdresse(e.target.value)}
                />
                <input
                  value={codePostal}
                  type="number"
                  onChange={(e) => setCodePostal(e.target.value)}
                />
                <input
                  value={ville}
                  onChange={(e) => setVille(e.target.value)}
                />
                <input value={pays} onChange={(e) => setPays(e.target.value)} />
              </form>
            </div>
            <div className="buttons">
              <Link to="/reservations" className="button grey-button">
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
