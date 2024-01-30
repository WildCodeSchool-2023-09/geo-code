import { useState, useContext } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import MarqueModeleContext from "../Context/MarqueModeleContext";

function Vehicule({
  vehiculeMarque,
  vehiculeModele,
  vehiculeId,
  id,
  toPushInDB,
  setToPushInDB,
}) {
  const [selectedMarque, setSelectedMarque] = useState(vehiculeMarque);
  const [selectedModele, setSelectedModele] = useState(vehiculeModele);
  const { marque, modele } = useContext(MarqueModeleContext);

  /** Handles */
  // sert à mettre à jour la marque séléctionnée
  const handleSelectedMarque = (e) => {
    setSelectedMarque(e.target.value);
  };

  // sert à mettre à jour la marque séléctionnée
  const handleSelectedModele = (e) => {
    setSelectedModele(e.target.value);
  };

  // Permet de créer une liste avec les véhicules à modifier
  const pushData = () => {
    setToPushInDB([
      ...toPushInDB,
      { id: vehiculeId, modele_id: selectedModele, proprietaire_id: id },
    ]);
  };

  const deleteVehicule = () => {
    axios.delete(
      `${import.meta.env.VITE_BACKEND_URL}/api/vehicules/${vehiculeId}`
    );
  };
  return (
    <form>
      <label className="form_placeholder_title" htmlFor="marque">
        Marque
      </label>
      <select
        onChange={handleSelectedMarque}
        className="form_placeholder_input"
      >
        <option>{vehiculeMarque}</option>
        {marque.map((item) => (
          <option key={item.name} value={item.id} name="marque_id">
            {item.name}
          </option>
        ))}
      </select>

      <label className="form_placeholder_title" htmlFor="model">
        Modèle
      </label>
      <select
        name="marque"
        onChange={handleSelectedModele}
        className="form_placeholder_input"
      >
        <option>{vehiculeModele}</option>
        {modele
          .filter((item) => {
            return +item.marque_id === +selectedMarque;
          })
          .map((item) => (
            <option key={item.id} value={item.id}>
              {item.name}
            </option>
          ))}
      </select>

      <div className="vehicule_card_button_container">
        <button
          type="button"
          className="vehicule_card_button"
          onClick={pushData}
        >
          Modifier ce véhicule
        </button>
        <button
          type="button"
          className="vehicule_card_button"
          onClick={deleteVehicule}
        >
          Supprimer ce véhicule
        </button>
      </div>
    </form>
  );
}
Vehicule.propTypes = {
  vehiculeMarque: PropTypes.string.isRequired,
  vehiculeModele: PropTypes.string.isRequired,
  vehiculeId: PropTypes.number.isRequired,
  id: PropTypes.number.isRequired,
  toPushInDB: PropTypes.func.isRequired,
  setToPushInDB: PropTypes.func.isRequired,
};
export default Vehicule;