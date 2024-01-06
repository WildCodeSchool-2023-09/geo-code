import { useContext, useState } from "react";
import FilterContext from "../Context/ResearchContext";
import "../scss/components/Filter.scss";

function Filtre() {
  const { setResearch } = useContext(FilterContext);

  const [valueDefault, setValueDefault] = useState({
    code: "",
    enseigne: "",
    rayon: "",
    puissance: "",
    disponible: "",
    prise: "",
  });
  const handleChange = (e) => {
    setValueDefault({ ...valueDefault, [e.target.name]: e.target.value });
  };

  const selectValue = (e) => {
    setValueDefault({ ...valueDefault, [e.target.name]: e.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setResearch(valueDefault);
  };
  return (
    <div>
      <div className="filters_container">
        <h2>Filtres de recherche</h2>
        <form className="filters_container_form" onSubmit={handleSubmit}>
          <div className="separate">
            <label htmlFor="code postal">Code Postal</label>
            <input
              value={valueDefault.code}
              type="text"
              name="code"
              id="code"
              placeholder="93000"
              onChange={handleChange}
            />
          </div>
          <div className="separate">
            <label htmlFor="enseigne">Enseigne</label>
            <select
              value={valueDefault.enseigne}
              onChange={handleChange}
              name="enseigne"
            >
              <option value="Toutes">Toutes</option>
              <option value="Une">Une</option>
              <option value="Deux">Deux</option>
            </select>
          </div>
          <div className="separate">
            <label htmlFor="rayon">Rayon (Km)</label>
            <input
              value={valueDefault.rayon}
              type="number"
              name="rayon"
              id="rayon"
              placeholder="10"
              onChange={handleChange}
            />
          </div>
          <div className="separate">
            <label htmlFor="puissance">Puissance (Kw/h)</label>
            <input
              value={valueDefault.puissance}
              type="string"
              name="puissance"
              id="puissance"
              placeholder="1.5"
              onChange={handleChange}
            />
          </div>
          <div className="separate">
            <label htmlFor="disponible">Disponible</label>
            <select
              value={valueDefault.disponible}
              onChange={handleChange}
              name="disponible"
            >
              <option value="Toutes">Toutes</option>
              <option value="Oui">Oui</option>
            </select>
          </div>
          <div className="prise_container">
            <label htmlFor="prise">Type de Prise</label>
            <div className="prise_container_content">
              <button
                type="button"
                value="A"
                name="prise"
                onClick={selectValue}
              >
                AC
              </button>
              <button
                type="button"
                value="E"
                name="prise"
                onClick={selectValue}
              >
                EF
              </button>
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
                Type 3
              </button>
              <button
                type="button"
                value="CHA"
                name="prise"
                onClick={selectValue}
              >
                CHADEMO
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
      </div>
    </div>
  );
}

export default Filtre;
