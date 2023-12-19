import { useContext } from "react";
import FilterContext from "../Context/ResearchContext";
import "../scss/components/Filtermobil.scss";

function Filtre() {
  const { research, setResearch } = useContext(FilterContext);
  const handleChange = (e) => {
    setResearch({ ...research, [e.target.name]: e.target.value });
  };
  return (
    <>
      <div className="filters">
        <h2>Filtres de recherche</h2>
        <div className="separate">
          <label htmlFor="adresse">Adresse</label>
          <input
            value={research.adresse}
            type="text"
            name="adresse"
            id="adresse"
            onChange={handleChange}
          />{" "}
        </div>
        <div className="separate">
          <label htmlFor="enseigne">Enseigne</label>
          <select value={research.enseigne}>
            <option value="Toutes">Toutes</option>
            <option value="Une">Une</option>
          </select>{" "}
        </div>
        <div className="separate">
          <label htmlFor="rayon">Rayon</label>
          <input
            value={research.rayon}
            type="number"
            name="rayon"
            id="rayon"
            onChange={handleChange}
          />{" "}
        </div>
        <div className="separate">
          <label htmlFor="puissance">Puissance</label>
          <input
            value={research.puissance}
            type="number"
            name="puissance"
            id="puissance"
            onChange={handleChange}
          />{" "}
        </div>
        <div className="separate">
          <label htmlFor="enseigne">Disponible</label>
          <select>
            <option value="Toutes">Oui</option>
          </select>{" "}
        </div>
        <div className="separates">
          <label htmlFor="prix">Prix</label>
          <div className="Price">
            <button type="button">Payant</button>
            <button type="button">Gratuit</button>
            <button type="button">Toutes</button>
          </div>
        </div>
        <div className="separates">
          <label htmlFor="prix">Type de Prise</label>
          <div className="priseButton">
            <button type="button">Type 1</button>
            <button type="button">Type 2</button>
            <button type="button">Type3</button>
            <button type="button">CHadeMO</button>
            <button type="button">Combo CCS</button>
          </div>
        </div>
        <button type="submit" className="submitResearch">
          Recherche
        </button>
      </div>{" "}
    </>
  );
}

export default Filtre;
