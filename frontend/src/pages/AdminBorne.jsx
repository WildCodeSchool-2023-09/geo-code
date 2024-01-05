import React, { useEffect, useState } from "react";
import Lottie from "react-lottie-player";
import { Link } from "react-router-dom";
import axios from "axios";
import "../scss/admin-borne.scss";

import PrimaryButton from "../components/buttons/PrimaryButton";
import mailError from "../assets/LottieFiles/EmailError.json";
import BorneCard from "../components/BorneCard";
import ScrollToTop from "./ResetScrollOnPage";

import data from "../data/BorneDataTest.json";

export default function AdminBorne() {
  const [searchForm, setSearchForm] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState();

  function updateForm(e) {
    e.preventDefault();
    setSearchForm(e.target[0].value);
  }

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
    ); // or render a login component
  }
  return (
    <main className="admin-borne backgroundImageMain">
      <ScrollToTop />
      <Link to="/admin">Retour</Link>
      <h1>Liste des Bornes</h1>
      <div className="borneSearch">
        <form onSubmit={updateForm}>
          <div className="search-bar">
            <div className="search-icon" />
            <input
              className="search-input"
              type="text"
              placeholder="Recherche"
            />
          </div>
          <input className="search-button" type="submit" value="Rechercher" />
        </form>
      </div>

      <div className="card-container">
        <div className="card-list">
          {data
            .filter((borne) =>
              borne.name.toLowerCase().includes(searchForm.toLowerCase())
            )
            .map((borne) => (
              <BorneCard name={borne.name} adresse={borne.adresse} />
            ))}
        </div>
      </div>
    </main>
  );
}
