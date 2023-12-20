import "../scss/admin-add-bornes.scss";
import { Link } from "react-router-dom";
import { useRef } from "react";

export default function AdminAddBornes() {
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
