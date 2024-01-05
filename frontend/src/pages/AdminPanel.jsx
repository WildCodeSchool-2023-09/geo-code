import React, { useEffect, useState } from "react";
import Lottie from "react-lottie-player";
import axios from "axios";

import { Link } from "react-router-dom";
import ScrollToTop from "./ResetScrollOnPage";

import "../scss/admin-panel.scss";

import mailError from "../assets/LottieFiles/EmailError.json";
import PrimaryButton from "../components/buttons/PrimaryButton";

export default function AdminPanel() {
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState();

  useEffect(() => {
    if (localStorage.getItem("UserToken") !== null) {
      axios
        .post(`${import.meta.env.VITE_BACKEND_URL}/api/checktoken`, {
          token: localStorage.getItem("UserToken"),
        })
        .then((res) => {
          if (res.data.message === "OK" && res.data.admin === true) {
            console.info("Connexion Approuvée");
            setIsLoggedIn(true);
            setIsAdmin(true);
          } else {
            setIsAdmin(false);
            console.info(
              "Vous n'avez pas les droits nécéssaire ! Redirection vers l'accueil"
            );
            setTimeout(() => {
              window.location.href = "/";
            }, 3800);
          }
          setIsLoading(false);
        });
    } else {
      console.info("Connexion Expirée ! Reconnectez-vous");
      setTimeout(() => {
        window.location.href = "/sign-in";
      }, 3800);
      setIsLoading(false);
    }
  }, []);

  if (isLoading) {
    return null;
  }

  if (!isLoggedIn || !isAdmin) {
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
          Vous n'êtes pas autorisé(e) à acceder a cette page.  `}
            <br /> {` Vous allez être redirigé(e) vers la page de connexion. `}
          </p>
          <PrimaryButton btnText="Se connecter" btnLink="/sign-in" />
        </div>
      </section>
    );
  }
  return (
    <main className="backgroundImageMain">
      <ScrollToTop />
      <div className="admin-panel">
        <h1>Panel Admin</h1>
        <Link className="buttons blue-button" to="/liste-utilisateurs">
          Liste des Utilisateurs
        </Link>
        <Link className="buttons blue-button" to="/liste-bornes">
          Liste des Bornes
        </Link>
        <Link className="buttons grey-button" to="/ajout-bornes">
          Ajouter des Bornes
        </Link>
      </div>
    </main>
  );
}
