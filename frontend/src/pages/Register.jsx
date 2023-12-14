import "../scss/register.scss";
import { useState } from "react";
import { Link } from "react-router-dom";

function Register() {
  const [user, setUser] = useState({
    name: "",
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
    <div className="wrapper">
      <Link to="/register" />
      <h1>Créer un compte</h1>
      <p>informations personnelles</p>
      <form className="userInfo">
        <div>
          <label htmlFor="lastname">Nom</label>
          <input
            value={user.lastname}
            type="text"
            name="lastname"
            id="lastname"
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="firstname">Prénom</label>
          <input
            value={user.firstname}
            type="text"
            name="firstname"
            id="firstname"
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <input
            value={user.email}
            type="email"
            name="email"
            id="email"
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            value={user.password}
            type="password"
            name="password"
            id="password"
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="confirm">Confirm</label>
          <input
            value={user.confirm}
            type="password"
            name="confirm"
            id="confirm"
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="anniversary">Anniversary</label>
          <input
            value={user.anniversary}
            type="text"
            name="anniversary"
            id="anniversary"
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="adress">Adresse</label>
          <input
            value={user.adress}
            type="text"
            name="adress"
            id="adress"
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="postalcode">Code postal</label>
          <input
            value={user.postalcode}
            type="text"
            name="postalcode"
            id="postalcode"
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="city">Ville</label>
          <input
            value={user.city}
            type="text"
            name="city"
            id="city"
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="phone">Téléphone</label>
          <input
            value={user.phone}
            type="text"
            name="phone"
            id="phone"
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="vehicule">Véhicule</label>
          <input
            value={user.vehicule}
            type="text"
            name="vehicule"
            id="vehicule"
            onChange={handleChange}
          />
        </div>
      </form>
      <p>informations sur le(s) véhicules</p>
      <form className="vehiculeInfo">
        <div>
          <label htmlFor="marque">Marque</label>
          <input
            value={user.marque}
            type="text"
            name="marque"
            id="marque"
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="model">Modèle</label>
          <input
            value={user.model}
            type="text"
            name="model"
            id="model"
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="prise">Prise</label>
          <input
            value={user.prise}
            type="text"
            name="prise"
            id="prise"
            onChange={handleChange}
          />
        </div>
        <div>
          <input type="checkbox" id="cgu-toggle" />
          <label htmlFor="cgu-toggle" className="register-button">
            J'accepte les conditions générales d'utilisations
          </label>
        </div>
        <div>
          <input type="checkbox" id="conf-toggle" />
          <label htmlFor="conf-toggle" className="register-button">
            J'accepte les politiques de confidentialité
          </label>
        </div>
        <div>
          <button type="submit">Créer mon compte</button>
        </div>
        <div>
          <Link to="/">
            <button type="button">Annuler</button>
          </Link>
        </div>
      </form>
    </div>
  );
}

export default Register;
