import { useContext, useEffect } from "react";
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

  useEffect(() => {
    console.info(
      research
    ); /* le console.info est là pour forcer le re-render */
  }, [research]);

  const { position } = useContext(LocationContext);

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
          {bornes
            .filter(
              (borne) =>
                borne.code_postal.includes(research.code) &&
                borne.n_enseigne.includes(research.enseigne) &&
                borne.puiss_max.includes(research.puissance) &&
                borne.type_prise.includes(research.prise) &&
                convertToDistance(
                  borne.lat,
                  borne.lng,
                  position.lat,
                  position.lng
                ) <= parseInt(research.rayon, 10)
            )
            .map((borne) => {
              return (
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
              );
            })}
        </div>
      </div>
    </div>
  );
}

export default BornesListe;
