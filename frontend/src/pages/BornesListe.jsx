import { useContext, useEffect } from "react";
import convertToDistance from "../services/ConvertToDistance";
import FilterContext from "../Context/ResearchContext";
import BorneCardUser from "../components/BorneCardUser";
import LocationContext from "../Context/locationContext";
import SecondaryButton from "../components/buttons/SecondaryButton";
import Filtre from "../components/Filtre";
import "../scss/bornesList.scss";
import bornes from "../data/BorneUser";
import ScrollToTop from "./ResetScrollOnPage";

function BornesListe() {
  const { research } = useContext(FilterContext);
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
                borne.code.includes(research.code) &&
                borne.enseigne.includes(research.enseigne) &&
                borne.tarification.includes(research.tarification) &&
                borne.puissance.includes(research.puissance) &&
                borne.prise.includes(research.prise) &&
                convertToDistance(
                  borne.lat,
                  borne.lng,
                  position.lat,
                  position.lng
                ) <= parseInt(research.rayon, 10)
            )
            .map((borne) => {
              console.info(borne);
              return (
                <div key={borne.index} className="bornecard">
                  <BorneCardUser
                    name={borne.names}
                    lat={borne.lat}
                    lng={borne.lng}
                    code={borne.code}
                    enseigne={borne.enseigne}
                    tarification={borne.tarification}
                    puissance={borne.puissance}
                    disponible={borne.disponible}
                    pdc={borne.pdc}
                    prise={borne.prise}
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
