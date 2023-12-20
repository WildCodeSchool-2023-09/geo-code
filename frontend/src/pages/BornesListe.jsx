import { useContext, useEffect } from "react";
import FilterContext from "../Context/ResearchContext";
import BorneCardUser from "../components/BorneCardUser";
import LocationContext from "../Context/locationContext";
import SecondaryButton from "../components/buttons/SecondaryButton";
import Filtre from "../components/Filtre";
import "../scss/bornesList.scss";
import bornes from "../data/BorneUser";

function BornesListe() {
  const { research } = useContext(FilterContext);
  useEffect(() => {
    console.info(research);
  }, [research]);

  const { position } = useContext(LocationContext);

  const convertToDistance = (lat, lng, poslat, poslng) => {
    const radiusEarthkm = 6371.07103;
    const radlat = lat * (Math.PI / 180);
    const radPositionLat = poslat * (Math.PI / 180);
    const radlatDiff = (lat - poslat) * (Math.PI / 180);
    const radlngDiff = (lng - poslng) * (Math.PI / 180);
    const distance =
      2 *
      radiusEarthkm *
      Math.sin(
        Math.sqrt(
          Math.sin(radlatDiff / 2) * Math.sin(radlatDiff / 2) +
            Math.cos(radPositionLat) *
              Math.cos(radlat) *
              Math.sin(radlngDiff / 2) *
              Math.sin(radlngDiff / 2)
        )
      );
    return distance.toFixed(1);
  };

  return (
    <div className="borneListPage">
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
                    convertToDistance={convertToDistance}
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
