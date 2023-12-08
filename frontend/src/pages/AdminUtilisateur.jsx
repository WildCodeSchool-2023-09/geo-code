import "../scss/admin-utilisateur.scss";

import UserCard from "../components/UserCard";

export default function AdminUtilisateur() {
  return (
    <div>
      <h1>Liste des Utilisateurs</h1>
      <div className="search">
        <div className="search-bar">
          <div className="search-icon" />
          <form>
            <input
              className="search-input"
              type="text"
              placeholder="Recherche"
            />
          </form>
        </div>
        <button className="search-button" type="submit">
          Rechercher
        </button>
      </div>

      <div className="card-list">
        <UserCard
          firstname="Baptiste"
          lastname="Save"
          img="https://picsum.photos/200"
          sexe="Homme"
          code_postal="75000"
          ville="Paris"
          email="baptiste.save@test.com"
          nb_vehicule="1"
        />
      </div>
    </div>
  );
}
