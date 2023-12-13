import { useContext } from "react";
import "../scss/components/Filtermobil.scss";
import FilterContext from "../Context/ResearchContext";

function Filtre() {
  const { research, setResearch } = useContext(FilterContext);
  const handleChange = (e) => {
    setResearch({ ...research, [e.target.name]: e.target.value });
  };
  return (
    <>
      <div className="filters">
        <h2>Filtres de recherche</h2>
        <label htmlFor="adresse">Adresse</label>
        <input
          value={research.adresse}
          type="text"
          name="adresse"
          id="adresse"
          onChange={handleChange}
        />{" "}
        <label htmlFor="enseigne">Enseigne</label>
        <select>
          <option value="Toutes">Toutes</option>
          <option value="Une">Une</option>
        </select>{" "}
        <label htmlFor="rayon">Rayon de recherche</label>
        <input
          value={research.rayon}
          type="number"
          name="rayon"
          id="rayon"
          onChange={handleChange}
        />{" "}
        <label htmlFor="puissance">Puissance</label>
        <input
          value={research.puissance}
          type="number"
          name="puissance"
          id="puissance"
          onChange={handleChange}
        />{" "}
        <label htmlFor="prix">Prix</label>
        <div>
          <button type="button">Payant</button>
          <button type="button">Gratuit</button>
          <button type="button">Toutes</button>
        </div>
        <label htmlFor="prix">Disponibilité</label>
        <div>
          <button type="button">Semaine</button>
          <button type="button">24/24-7/7</button>
          <button type="button">Toutes</button>
        </div>
        <label htmlFor="prix">Type de Prise</label>
        <div className="priseButton">
          <button type="button">Type 1</button>
          <button type="button">Type 2</button>
          <button type="button">Type3</button>
          <button type="button">CHadeMO</button>
          <button type="button">Combo CCS</button>
        </div>
        <button type="submit" className="submitResearch">
          Recherche
        </button>
      </div>{" "}
    </>
  );
}

export default Filtre;
