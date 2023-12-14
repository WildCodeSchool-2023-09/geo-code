import "../scss/admin-utilisateur.scss";
import { Link } from "react-router-dom";
import { useState } from "react";
import UserCard from "../components/UserCard";

import data from "../data/UserDataTest.json";

export default function AdminUtilisateur() {
  const [searchForm, setSearchForm] = useState("");
  function updateForm(e) {
    e.preventDefault();
    setSearchForm(e.target[0].value);
  }

  return (
    <main className="admin-utilisateur">
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
