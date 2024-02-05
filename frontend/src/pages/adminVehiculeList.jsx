import React, { useEffect, useState } from "react";
import Lottie from "react-lottie-player";
import axios from "axios";
import "../scss/admin-borne.scss";
import Breadcrumb from "../components/breadcrumb";

import mailError from "../assets/LottieFiles/EmailError.json";
import VehiculeCard from "../components/VehiculeCard";
import ScrollToTop from "./ResetScrollOnPage";

export default function adminVehiculeList() {
  const [searchForm, setSearchForm] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState();

  const [data, setData] = useState();

  function updateForm(e) {
    e.preventDefault();
    setSearchForm(e.target[0].value);
  }

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/api/checktoken`, {
        withCredentials: true,
      })
      .then((res) => {
        if (res.data.message === "OK" && res.data.admin === true) {
          setIsLoggedIn(true);
          setIsAdmin(true);
        } else {
          setIsLoggedIn(false);
          setIsAdmin(false);
          setTimeout(() => {
            window.location.href = "/";
          }, 3800);
        }
        setIsLoading(false);
      });

    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/api/vehicules`)
      .then((res) => {
        setData(res.data);
      });
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
            <br />
            {` Vous n'avez pas les droits nécéssaire ! Redirection vers l'accueil `}
          </p>
        </div>
      </section>
    ); // or render a login component
  }

  const arianfil = [{ name: "Admin", link: "/admin" }];

  return (
    <div className="admin-borne backgroundImageMain">
      <ScrollToTop />
      <Breadcrumb data={arianfil} currentname="Liste des Véhicules" />
      <h1>Liste des Véhicules</h1>
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
          {data &&
            data
              .filter(
                (vehicule) =>
                  vehicule.modele_name
                    .toLowerCase()
                    .includes(searchForm.toLowerCase()) ||
                  vehicule.marque_name
                    .toLowerCase()
                    .includes(searchForm.toLowerCase()) ||
                  vehicule.nom.toLowerCase().includes(searchForm.toLowerCase())
              )
              .map((vehicule) => (
                <VehiculeCard
                  key={vehicule.id}
                  nom={vehicule.nom}
                  prenom={vehicule.prenom}
                  modeleName={vehicule.modele_name}
                  marqueName={vehicule.marque_name}
                />
              ))}
        </div>
      </div>
    </div>
  );
}
