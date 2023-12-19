import { Link } from "react-router-dom";
import { useContext, useEffect } from "react";
import FilterContext from "../Context/ResearchContext";
import BorneCardUser from "../components/BorneCardUser";
import SecondaryButton from "../components/buttons/SecondaryButton";
import Filtre from "../components/Filtre";
import "../scss/bornesList.scss";
import bornes from "../data/BorneUser";

function BornesListe() {
  const { research } = useContext(FilterContext);
  useEffect(() => {
    console.info(research);
  }, [research]);

  return (
    <div className="borneListPage">
      <div className="buttonContainer">
        <Link to="/map">
          <div className="buttonContainer">
            <SecondaryButton btnText="Carte" btnLink="/Map" />
          </div>
        </Link>
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
                borne.prise.includes(research.prise)
            )
            .map((borne) => (
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
            ))}
        </div>
      </div>
    </div>
  );
}

export default BornesListe;
