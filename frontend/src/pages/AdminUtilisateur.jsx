import axios from "axios";
import "../scss/admin-utilisateur.scss";
import { Link } from "react-router-dom";
import { useState } from "react";
import UserCard from "../components/UserCard";
import ScrollToTop from "./ResetScrollOnPage";

import data from "../data/UserDataTest.json";

export default function AdminUtilisateur() {
  if (localStorage.getItem("UserToken") !== null) {
    axios
      .post(`${import.meta.env.VITE_BACKEND_URL}/api/checktoken`, {
        token: localStorage.getItem("UserToken"),
      })
      .then((res) => {
        if (res.data.message === "OK" && res.data.admin === true) {
          console.info("Connexion Approuvée");
        } else {
          console.info("Connexion Expirée ! Reconnectez-vous");
          localStorage.removeItem("UserToken");
          window.location.href = "/sign-in";
        }
      });
  } else {
    console.info("Connexion Expirée ! Reconnectez-vous");
    window.location.href = "/sign-in";
  }

  const [searchForm, setSearchForm] = useState("");
  function updateForm(e) {
    e.preventDefault();
    setSearchForm(e.target[0].value);
  }

  return (
    <main className="admin-utilisateur backgroundImageMain">
      <ScrollToTop />
      <Link to="/admin">Retour</Link>
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
        {data
          .filter((user) =>
            `${user.firstname.toLowerCase()} ${user.lastname.toLowerCase()}`.includes(
              searchForm.toLowerCase()
            )
          )
          .map((user) => (
            <UserCard
              firstname={user.firstname}
              img={user.img}
              lastname={user.lastname}
            />
          ))}
      </div>
    </main>
  );
}
