/* eslint-disable jsx-a11y/label-has-associated-control */
import "../scss/register.scss";
import { useState } from "react";
import { Link } from "react-router-dom";

function Register() {
  const [user, setUser] = useState({
    lastname: "",
    firstname: "",
    email: "",
    password: "",
    confirm: "",
    anniversary: "",
    adress: "",
    postalcode: "",
    city: "",
    phone: "",
    vehicule: "",
    marque: "",
    model: "",
    prise: "",
  });

  const handleChange = (event) => {
    setUser({ ...user, [event.target.name]: event.target.value });
  };

  return (
    <main className="register-page">
      <Link to="/register" />
      <img
        className="logo_register"
        src="\assets\svg\logo_black.svg"
        alt="logo_black"
      />
      <h1>Créer un compte</h1>
      <h2> informations personnelles </h2>
      <form className="userInfo">
        <div className="content_input">
          <label className="content_input_label" htmlFor="lastname">
            Nom
          </label>
          <input
            className="content_input_placeholder"
            value={user.lastname}
            type="text"
            name="lastname"
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
            value={user.firstname}
            type="text"
            name="firstname"
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
            value={user.confirm}
            type="password"
            name="confirm"
            id="confirm"
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
            value={user.anniversary}
            type="text"
            name="anniversary"
            id="anniversary"
            onChange={handleChange}
            placeholder="25/12/2023"
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
            name="adress"
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
            value={user.postalcode}
            type="text"
            name="postalcode"
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
            value={user.city}
            type="text"
            name="city"
            id="city"
            onChange={handleChange}
            placeholder="New York"
          />
        </div>
        <div className="content_input">
          <label className="content_input_label" htmlFor="phone">
            Téléphone
          </label>
          <input
            className="content_input_placeholder"
            value={user.phone}
            type="text"
            name="phone"
            id="phone"
            onChange={handleChange}
            placeholder="+33 00 00 00 00 00"
          />
        </div>
        <div className="content_input">
          <label className="content_input_label_space" htmlFor="vehicule">
            Véhicule(s)
          </label>
          <input
            className="content_input_placeholder_space"
            value={user.vehicule}
            type="text"
            name="vehicule"
            id="vehicule"
            onChange={handleChange}
            placeholder="Nombre de véhicules"
          />
        </div>
      </form>
      <form className="vehiculeInfo">
        <h3>informations sur le(s) véhicules</h3>
        <div className="content_input">
          <label className="content_input_label" htmlFor="marque">
            Marque
          </label>
          <input
            className="content_input_placeholder"
            value={user.marque}
            type="text"
            name="marque"
            id="marque"
            onChange={handleChange}
            placeholder="Renault"
          />
        </div>
        <div className="content_input">
          <label className="content_input_label" htmlFor="model">
            Modèle
          </label>
          <input
            className="content_input_placeholder"
            value={user.model}
            type="text"
            name="model"
            id="model"
            onChange={handleChange}
            placeholder="Megane RS"
          />
        </div>
        <div className="content_input">
          <label className="content_input_label" htmlFor="prise">
            Prise
          </label>
          <input
            className="content_input_placeholder"
            value={user.prise}
            type="text"
            name="prise"
            id="prise"
            onChange={handleChange}
            placeholder="Type A"
          />
        </div>
      </form>
      <div className="toggle-button">
        <div className="button_dispose">
          <label className="switch_button">
            <input type="checkbox" />
            <span className="slider round" />
          </label>
          <p>J'accepte les conditions générales d'utilisations</p>
        </div>
        <div className="button_dispose">
          <label className="switch_button">
            <input type="checkbox" />
            <span className="slider round" />
          </label>
          <p>J'accepte les politiques de confidentialité</p>
        </div>
      </div>
      <div className="button-form">
        <div>
          <button className="create_button" type="submit">
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
      </div>
    </main>
  );
}

export default Register;
