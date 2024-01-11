import React, { useEffect, useState } from "react";
import Lottie from "react-lottie-player";
import axios from "axios";

import "../scss/admin-utilisateur.scss";

import UserCard from "../components/UserCard";
import ScrollToTop from "./ResetScrollOnPage";
import mailError from "../assets/LottieFiles/EmailError.json";
import Breadcrumb from "../components/breadcrumb";

export default function AdminUtilisateur() {
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState();
  const [searchForm, setSearchForm] = useState("");
  const [data, setData] = useState();

  function updateForm(e) {
    e.preventDefault();
    setSearchForm(e.target[0].value);
  }

  useEffect(() => {
    axios
      .post(`${import.meta.env.VITE_BACKEND_URL}/api/checktoken`, "hello", {
        withCredentials: true,
      })
      .then((res) => {
        console.info(res.data);
        if (res.data.message === "OK" && res.data.admin === true) {
          setIsLoggedIn(true);
          setIsAdmin(true);
          axios
            .get(`${import.meta.env.VITE_BACKEND_URL}/api/users`)
            .then((resp) => {
              setData(resp.data);
            });
        } else {
          setIsLoggedIn(false);
          setIsAdmin(false);
          setTimeout(() => {
            window.location.href = "/";
          }, 3800);
        }
        setIsLoading(false);
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
    );
  }
  const arianfil = [{ name: "Admin", link: "/admin" }];
  return (
    <div className="backgroundImageMain">
      <div className="admin-utilisateur">
        <Breadcrumb data={arianfil} currentname="Utilisateurs" />
        <ScrollToTop />
        <h1>Liste des Utilisateurs</h1>
        <div className="userSearch">
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

        <div className="card-list">
          {data &&
            data
              .filter((user) =>
                `${user.prenom.toLowerCase()} ${user.nom.toLowerCase()}`.includes(
                  searchForm.toLowerCase()
                )
              )
              .map((user) => (
                <UserCard
                  firstname={user.prenom}
                  img={user.avatar || "https://i.imgur.com/5Nc6WY0.png"}
                  lastname={user.nom}
                />
              ))}
        </div>
      </div>
    </div>
  );
}
