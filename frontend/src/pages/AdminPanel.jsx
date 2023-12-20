import "../scss/admin-panel.scss";
import { Link } from "react-router-dom";

export default function AdminPanel() {
  return (
    <main className="backgroundImageMain">
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
