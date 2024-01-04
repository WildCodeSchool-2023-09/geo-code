import axios from "axios";
import "../scss/admin-add-bornes.scss";
import { Link } from "react-router-dom";
import { useRef } from "react";
import ScrollToTop from "./ResetScrollOnPage";

export default function AdminAddBornes() {
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

  const inputRef = useRef(null);

  const handleClick = () => {
    inputRef.current.click();
  };

  const handleFileChange = (e) => {
    const fileObj = e.target.files && e.target.files[0];
    if (!fileObj) {
      return;
    }
    e.target.value = null;
    console.info(fileObj);
  };

  function dropHandler(e) {
    e.preventDefault();
    console.info(e.dataTransfer.files[0]);
  }

  function dragOverHandler(e) {
    e.preventDefault();
  }

  return (
    <main className="add-bornes-main backgroundImageMain">
      <ScrollToTop />
      <Link to="/admin">Retour</Link>
      <div className="upload-card">
        <h1>Ajouter des Bornes</h1>
        <div
          className="upload"
          onDrop={dropHandler}
          onDragOver={dragOverHandler}
        />
        <div className="buttons-container">
          <input
            style={{ display: "none" }}
            ref={inputRef}
            type="file"
            onChange={handleFileChange}
            accept=".csv"
          />
          <button type="button" onClick={handleClick} className="blue-button">
            Charger
          </button>
          <Link to="/admin">
            <button type="button" className="dark-blue-button">
              Annuler
            </button>
          </Link>
        </div>
      </div>
    </main>
  );
}
