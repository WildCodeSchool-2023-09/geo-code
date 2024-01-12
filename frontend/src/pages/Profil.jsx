import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Lottie from "react-lottie-player";

import ScrollToTop from "./ResetScrollOnPage";
import "../scss/profil.scss";

import data from "../data/UserDataTest.json";
import mailError from "../assets/LottieFiles/EmailError.json";
import PrimaryButton from "../components/buttons/PrimaryButton";

export default function Profil() {
  const [lastname, setLastname] = useState();
  const [firstname, setFirstname] = useState();
  const [birthday, setBirthday] = useState();
  const [email, setEmail] = useState();
  const [adresse, setAdresse] = useState();
  const [codePostal, setCodePostal] = useState();
  const [ville, setVille] = useState();
  const [avatar, setAvatar] = useState(data[0].img);

  const [isLoading, setIsLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    axios
      .post(`${import.meta.env.VITE_BACKEND_URL}/api/checktoken`, "hello", {
        withCredentials: true,
      })
      .then((res) => {
        if (res.data.message === "OK") {
          setIsLoggedIn(true);
        } else {
          setIsLoggedIn(false);
          setTimeout(() => {
            window.location.href = "/sign-in";
          }, 3800);
        }
        setIsLoading(false);
      });

    axios
      .post(`${import.meta.env.VITE_BACKEND_URL}/logout`, "hello", {
        withCredentials: true,
      })
      .then((res) => {
        setLastname(res.data[0].nom);
        setFirstname(res.data[0].prenom);
        setBirthday(res.data[0].anniversaire);
        setEmail(res.data[0].email);
        setAdresse(res.data[0].rue);
        setCodePostal(res.data[0].code_postal);
        setVille(res.data[0].ville);
      });
  }, []);

  function Deconnexion() {
    axios
      .post(`${import.meta.env.VITE_BACKEND_URL}/api/logout`, "hello", {
        withCredentials: true,
      })
      .then((res) => {
        if (res.data.message === "OK") {
          console.info("Déconnexion Approuvée");
          setIsLoggedIn(false);
          setTimeout(() => {
            window.location.href = "/sign-in";
          }, 500);
        } else {
          setIsLoggedIn(true);
        }
        setIsLoading(false);
      });
  }

  if (isLoading) {
    return null;
  }

  const handleChange = (e) => {
    e.preventDefault();
    const date = `${new Date().getFullYear()}-${
      new Date().getMonth() + 1 < 10
        ? `0${new Date().getMonth() + 1}`
        : new Date().getMonth() + 1
    }-${
      new Date().getDay() < 10 ? `0${new Date().getDay()}` : new Date().getDay()
    }`;

    axios.post(
      `${import.meta.env.VITE_BACKEND_URL}/api/edituser`,
      {
        nom: lastname,
        prenom: firstname,
        anniversaire: birthday,
        email,
        rue: adresse,
        codePostal,
        ville,
        derniereMaj: date,
      },
      { withCredentials: true }
    );
  };

  if (!isLoggedIn) {
    return (
      <section>
        <div className="containererror">
          <Lottie
            loop
            animationData={mailError}
            play
            style={{ width: 120, height: 120 }}
          />
          <h1>Accès Impossible</h1>
          <p className="message">
            {`
          Vous devez vous connecter pour acceder à cette page.  `}
            <br /> {` Vous allez être redirigé(e) vers la page de connexion. `}
          </p>
          <PrimaryButton btnText="Se connecter" btnLink="/sign-in" />
        </div>
      </section>
    );
  }

  return (
    <div className="backgroundImageMain">
      <div className="profil-main">
        <ScrollToTop />
        <div className="profil-container">
          <div className="general-container">
            <div className="profil">
              <img src={avatar} alt="" />
              <h1>
                {firstname} {lastname}
              </h1>
              <div className="buttons">
                <form htmlFor="file" className="upload_form">
                  <input
                    type="file"
                    name="file"
                    accept=".png, .jpg, .jpeg"
                    onChange={(e) =>
                      setAvatar(URL.createObjectURL(e.target.files[0]))
                    }
                    className="upload_form_input"
                  />
                </form>
                <button
                  type="button"
                  className="blue-button"
                  onClick={() => {
                    URL.revokeObjectURL(avatar);
                    setAvatar(data[0].img);
                  }}
                >
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
                  <input value={email} readOnly={email} type="email" />
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
                </form>
              </div>
              <div className="buttons">
                <Link to="/reservations" className="button grey-button">
                  Voir les réservations
                </Link>
                <Link to="/profil-vehicule" className="button grey-button">
                  Modifier les véhicules
                </Link>
                <button
                  type="submit"
                  className="button blue-button"
                  onClick={handleChange}
                >
                  Enregistrer les changements
                </button>
                <button type="button" className="no-button">
                  Demander un nouveau mot de passe
                </button>
                <button
                  type="button"
                  className="no-button"
                  onClick={() => window.location.reload()}
                >
                  Annuler les changements
                </button>
              </div>
            </div>
            <button
              className="Logout-button"
              type="button"
              id="LogOut"
              onClick={() => {
                Deconnexion();
              }}
            >
              Déconnexion
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
