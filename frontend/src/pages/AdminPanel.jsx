import "../scss/admin-panel.scss";
import axios from "axios";
import { Link } from "react-router-dom";
import ScrollToTop from "./ResetScrollOnPage";

export default function AdminPanel() {
  if (localStorage.getItem("EpimeleiaAdminToken") !== null) {
    axios
      .post(`${import.meta.env.VITE_BACKEND_URL}/api/checktoken`, {
        token: localStorage.getItem("UserToken"),
      })
      .then((res) => {
        if (res.data.message === "OK") {
          console.info("Connexion Approuvée");
        } else {
          console.info("Connexion Expirée ! Reconnectez-vous");
          localStorage.removeItem("UserToken");
          window.location.href = "/sign-in";
        }
      });
  } else {
    console.info("no token");
    window.location.href = "/sign-in";
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
