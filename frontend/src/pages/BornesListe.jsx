import { useContext, useEffect, useState } from "react";
import convertToDistance from "../services/ConvertToDistance";
import FilterContext from "../Context/ResearchContext";
import BorneCardUser from "../components/BorneCardUser";
import LocationContext from "../Context/locationContext";
import BornesContext from "../Context/BornesContext";
import SecondaryButton from "../components/buttons/SecondaryButton";
import Filtre from "../components/Filtre";
import "../scss/bornesList.scss";

import ScrollToTop from "./ResetScrollOnPage";

function BornesListe() {
  const { research } = useContext(FilterContext);
  const { bornes } = useContext(BornesContext);
  const [pageActuel, setPageActuel] = useState(0);

  useEffect(() => {
    console.info(
      research
    ); /* le console.info est là pour forcer le re-render */
  }, [research]);

  const { position } = useContext(LocationContext);

  const display = 10;
  let bornesFilters = [];
  const [max, setMax] = useState(bornes.length);

  if (research.rayon === "" || research.rayon === "0") {
    research.rayon = "1085";
  }
  bornesFilters = bornes.filter(
    (cluster) =>
      cluster.code_postal.slice(0, 2).includes(research.code) &&
      cluster.n_enseigne.includes(research.enseigne) &&
      cluster.puiss_max.includes(research.puissance) &&
      cluster.type_prise.includes(
        research.prise || research.prise.toLowerCase()
      ) &&
      convertToDistance(cluster.lat, cluster.lng, position.lat, position.lng) <=
        parseInt(research.rayon, 10)
  );

  useEffect(() => {
    setMax(bornesFilters.length);
  }, [bornesFilters]);

  function handlePageNext(slice) {
    if (!(slice + display > max)) {
      setPageActuel(pageActuel + display);
    }
  }

  function handlePagePrevious(slice) {
    if (!(slice - display < 0)) {
      setPageActuel(pageActuel - display);
    }
  }
  return (
    <div className="borneListPage">
      <ScrollToTop />
      <div className="buttonContainer">
        <div className="buttonContainer">
          <SecondaryButton btnText="Carte" btnLink="/Map" />
        </div>
      </div>
      <div className="filterBorne">
        <div className="filterBorne_Filter">
          <Filtre />
        </div>
        <div className="bornesContainer">
          <div className="prevnext">
            <button
              className="secondary-button"
              type="button"
              onClick={() => {
                handlePagePrevious(pageActuel);
              }}
            >
              Précédent
            </button>
            <button
              className="secondary-button"
              type="button"
              onClick={() => {
                handlePageNext(pageActuel);
              }}
            >
              Suivant
            </button>
          </div>
          {bornesFilters
            .slice(pageActuel, pageActuel + display)
            .map((borne) => {
              return (
                <div>
                  <div key={borne.index} className="bornecard">
                    <BorneCardUser
                      name={borne.n_station}
                      lat={borne.lat}
                      lng={borne.lng}
                      code={borne.code_postal}
                      enseigne={borne.n_enseigne}
                      puissance={borne.puiss_max}
                      prise={borne.type_prise}
                    />
                  </div>
                </div>
              );
            })}
          <div className="prevnext">
            <button
              type="button"
              onClick={() => {
                handlePagePrevious(pageActuel);
              }}
              className="secondary-button"
            >
              Précédent
            </button>
            <button
              type="button"
              onClick={() => {
                handlePageNext(pageActuel);
              }}
              className="secondary-button"
            >
              Suivant
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BornesListe;
