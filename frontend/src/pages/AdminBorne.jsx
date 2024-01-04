import axios from "axios";
import "../scss/admin-borne.scss";
import { Link } from "react-router-dom";

import { useState } from "react";
import BorneCard from "../components/BorneCard";
import ScrollToTop from "./ResetScrollOnPage";
import data from "../data/BorneDataTest.json";

export default function AdminBorne() {
  const [searchForm, setSearchForm] = useState("");

  function updateForm(e) {
    e.preventDefault();
    setSearchForm(e.target[0].value);
  }

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
