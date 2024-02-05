import "../scss/register.scss";
import { useContext } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import UserContext from "../Context/UserContext";

function Register() {
  const { user, setUser } = useContext(UserContext);

  const isEmailValid = (value) => {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{1,4}$/;
    return emailPattern.test(value);
  };
  function escapeHtml(unsafe) {
    return unsafe.replace(/[&<"'>]/g, function toMatch(match) {
      switch (match) {
        case "&":
          return "&amp;";
        case "<":
          return "&lt;";
        case ">":
          return "&gt;";
        case '"':
          return "&quot;";
        case "'":
          return "&#39;";
        default:
          return match;
      }
    });
  }

  const handleChange = (event) => {
    setUser({ ...user, [event.target.name]: event.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!isEmailValid(user.email)) {
        document.getElementById("errorLog").innerText = "";
        document.getElementById("errorEmail").innerText =
          "Votre Email n'est pas valide";
        document.getElementById("email").classList.add("errorOnPlaceholder");
      } else {
        document.getElementById("errorEmail").innerText = "";
        document.getElementById("errorLog").innerText = "";
        document.getElementById("email").classList.remove("errorOnPlaceholder");

        await axios
          .post(
            `${import.meta.env.VITE_BACKEND_URL}/api/users`,
            {
              nom: escapeHtml(user.nom),
              prenom: escapeHtml(user.prenom),
              email: escapeHtml(user.email),
              password: escapeHtml(user.password),
              anniversaire: escapeHtml(user.anniversaire),
              rue: escapeHtml(user.rue),
              code_postal: escapeHtml(user.code_postal),
              ville: escapeHtml(user.ville),
              nb_vehicule: user.nb_vehicule,
              connexion: user.connexion,
              inscription: user.inscription,
              derniere_maj: user.derniere_maj,
            },
            { withCredentials: true }
          )
          .then((res) => {
            if (res.data.message === "Authentification réussie") {
              setTimeout(() => {
                window.location.href = "/registerSuccess";
              }, 500);
            } else {
              document.getElementById("errorLog").innerText = "";
              document.getElementById("errorEmail").innerText =
                res.data.message;
              document
                .getElementById("email")
                .classList.add("errorOnPlaceholder");
            }
          })
          .catch((err) => console.error(err));
      }
    } catch (error) {
      console.info("il y a une erreur");
    }
  };

  return (
    <div className="register-page">
      <div className="registerbox">
        <h1>Créer un compte</h1>
        <h2> Informations personnelles </h2>
        <form className="userInfo">
          <div className="content_input">
            <label className="content_input_label" htmlFor="lastname">
              Nom
            </label>
            <input
              className="content_input_placeholder"
              value={user.nom}
              type="text"
              name="nom"
              id="lastname"
              onChange={handleChange}
              placeholder="Carpenter"
            />
          </div>
          <div className="content_input">
            <label className="content_input_label" htmlFor="firstname">
              Prénom
            </label>
            <input
              className="content_input_placeholder"
              value={user.prenom}
              type="text"
              name="prenom"
              id="firstname"
              onChange={handleChange}
              placeholder="John"
            />
          </div>
          <div className="content_input">
            <label className="content_input_label" htmlFor="email">
              Email
            </label>
            <input
              className="content_input_placeholder"
              value={user.email}
              type="email"
              name="email"
              id="email"
              onChange={handleChange}
              placeholder="example@gmail.com"
            />
          </div>
          <div className="content_input">
            <label className="content_input_label" htmlFor="password">
              Mot de passe
            </label>
            <input
              className="content_input_placeholder"
              value={user.password}
              type="password"
              name="password"
              id="password"
              onChange={handleChange}
              placeholder="Entrer votre mot de passe"
            />
          </div>
          <div className="content_input">
            <label className="content_input_label" htmlFor="confirm">
              Confirmez
            </label>
            <input
              className="content_input_placeholder"
              value={user.confirmPassword}
              type="password"
              name="confirmPassword"
              id="confirmconfirmPassword"
              onChange={handleChange}
              placeholder="Confirmez le mot de passe"
            />
          </div>
          <div className="content_input">
            <label className="content_input_label_space" htmlFor="anniversary">
              Anniversaire
            </label>
            <input
              className="content_input_placeholder_space"
              value={user.anniversaire}
              type="date"
              name="anniversaire"
              id="anniversary"
              onChange={handleChange}
              placeholder="2023-12-25"
            />
          </div>
          <div className="content_input">
            <label className="content_input_label" htmlFor="adress">
              Adresse
            </label>
            <input
              className="content_input_placeholder"
              value={user.adress}
              type="text"
              name="rue"
              id="adress"
              onChange={handleChange}
              placeholder="Votre adresse"
            />
          </div>
          <div className="content_input">
            <label className="content_input_label" htmlFor="postalcode">
              Code postal
            </label>
            <input
              className="content_input_placeholder"
              value={user.code_postal}
              type="text"
              name="code_postal"
              id="postalcode"
              onChange={handleChange}
              placeholder="00000"
            />
          </div>
          <div className="content_input">
            <label className="content_input_label" htmlFor="city">
              Ville
            </label>
            <input
              className="content_input_placeholder"
              value={user.ville}
              type="text"
              name="ville"
              id="city"
              onChange={handleChange}
              placeholder="New York"
            />
          </div>
        </form>

        <div>
          En cliquant sur Créer mon compte, vous acceptez :{" "}
          <ul>
            <li>- notre politique de confidentialité </li>
            <li>- nos conditions générales d'utilisation</li>
          </ul>
        </div>
        <div className="button-form">
          <div>
            <button
              className="create_button"
              type="submit"
              onClick={handleSubmit}
            >
              Créer mon compte
            </button>
          </div>
          <div>
            <Link to="/">
              <button className="cancel_button" type="button">
                Annuler
              </button>
            </Link>
          </div>
          <p className="error_container" id="errorEmail" />
          <p className="error_container" id="errorLog" />
          <p className="success_container" id="successLog" />
          {user.confirmPassword !== user.password ? (
            <div className="errorOnPlaceholder">
              Le mot de passe de confirmation ne match pas
            </div>
          ) : (
            <p />
          )}
        </div>
      </div>
    </div>
  );
}

export default Register;
