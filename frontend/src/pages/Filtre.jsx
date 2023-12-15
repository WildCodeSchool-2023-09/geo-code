import { useContext } from "react";
import FilterContext from "../Context/ResearchContext";
import "../scss/components/Filtermobil.scss";

function Filtre() {
  const { research, setResearch } = useContext(FilterContext);
  const handleChange = (e) => {
    setResearch({ ...research, [e.target.name]: e.target.value });
  };

  const selectValue = (e) => {
    setResearch({ ...research, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    console.info(research);
  };
  return (
    <>
      <div className="filters">
        <h2>Filtres de recherche</h2>
        <form onSubmit={handleSubmit}>
          <div className="separate">
            <label htmlFor="code postal">Code Postal</label>
            <input
              value={research.code}
              type="text"
              name="code"
              id="code"
              onChange={handleChange}
            />{" "}
          </div>
          <div className="separate">
            <label htmlFor="enseigne">Enseigne</label>
            <select
              value={research.enseigne}
              onChange={handleChange}
              name="enseigne"
            >
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
            <label htmlFor="disponible">Disponible</label>
            <select
              value={research.disponible}
              onChange={handleChange}
              name="disponible"
            >
              <option value="Toutes">Toutes</option>
              <option value="Oui">Oui</option>
            </select>{" "}
          </div>
          <div className="separates">
            <label htmlFor="tarification">Prix</label>
            <div className="Price">
              <button
                type="button"
                value="Payant"
                name="tarification"
                onClick={selectValue}
              >
                Payant
              </button>
              <button
                type="button"
                value="Gratuit"
                name="tarification"
                onClick={selectValue}
              >
                Gratuit
              </button>
              <button
                type="button"
                value="Toutes"
                name="tarification"
                onClick={selectValue}
              >
                Toutes
              </button>
            </div>
          </div>
          <div className="separates">
            <label htmlFor="prise">Type de Prise</label>
            <div className="priseButton">
              <button
                type="button"
                value="1"
                name="prise"
                onClick={selectValue}
              >
                Type 1
              </button>
              <button
                type="button"
                value="2"
                name="prise"
                onClick={selectValue}
              >
                Type 2
              </button>
              <button
                type="button"
                value="3"
                name="prise"
                onClick={selectValue}
              >
                Type3
              </button>
              <button
                type="button"
                value="deMO"
                name="prise"
                onClick={selectValue}
              >
                CHadeMO
              </button>
              <button
                type="button"
                value="CCS"
                name="prise"
                onClick={selectValue}
              >
                Combo CCS
              </button>
            </div>
          </div>
          <button type="submit" className="submitResearch">
            Recherche
          </button>
        </form>
      </div>{" "}
    </>
  );
}

export default Filtre;
