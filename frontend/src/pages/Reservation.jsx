import { Link } from "react-router-dom";

import ScrollToTop from "./ResetScrollOnPage";
import data from "../data/UserDataTest.json";
import "../scss/reservation.scss";
import PrimaryButton from "../components/buttons/PrimaryButton";

export default function Reservation() {
  return (
    <main className="reservation-main">
      <ScrollToTop />
      <div className="reservation-container">
        <Link to="/profil">Retour sur le profil</Link>
        <div className="info-container">
          <img src={data[0].img} alt="" />
          <h1>
            {data[0].firstname} {data[0].lastname}
          </h1>
        </div>
        <div className="next-reservation-container">
          <h2>Réservation à venir</h2>
          <div className="next-reservation">
            <p>Borne Paris 2</p>
            <p>30/12/2023</p>
            <div className="buttons-container">
              <button type="button">Modifier la réservation</button>
              <button type="button">Annuler la réservation</button>
            </div>
          </div>
        </div>
        <div className="past-reservation-container">
          <h2>Réservation passés</h2>
          <div className="past-reservation">
            <p>Borne Paris 2</p>
            <p>30/12/2023</p>
            <PrimaryButton btnLink="#" btnText="Réserver à nouveau" />
          </div>
          <div className="past-reservation">
            <p>Borne Paris 2</p>
            <p>30/12/2023</p>
            <PrimaryButton btnLink="#" btnText="Réserver à nouveau" />
          </div>
          <div className="past-reservation">
            <p>Borne Paris 2</p>
            <p>30/12/2023</p>
            <PrimaryButton btnLink="#" btnText="Réserver à nouveau" />
          </div>
          <div className="past-reservation">
            <p>Borne Paris 2</p>
            <p>30/12/2023</p>
            <PrimaryButton btnLink="#" btnText="Réserver à nouveau" />
          </div>
        </div>
      </div>
    </main>
  );
}
