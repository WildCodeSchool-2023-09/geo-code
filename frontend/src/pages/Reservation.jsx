import React, { useEffect, useState } from "react";
import Lottie from "react-lottie-player";
import axios from "axios";

import data from "../data/UserDataTest.json";

import "../scss/reservation.scss";

import mailError from "../assets/LottieFiles/EmailError.json";
import PrimaryButton from "../components/buttons/PrimaryButton";
import ScrollToTop from "./ResetScrollOnPage";

export default function Reservation() {
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("UserToken") !== null) {
      axios
        .post(`${import.meta.env.VITE_BACKEND_URL}/api/checktoken`, {
          token: localStorage.getItem("UserToken"),
        })
        .then((res) => {
          if (res.data.message === "OK") {
            console.info("Connexion Approuvée");
            setIsLoggedIn(true);
          } else {
            setIsLoggedIn(false);
            console.info(
              "Vous devez vous connecter pour acceder à cette page !"
            );
            setTimeout(() => {
              window.location.href = "/sign-in";
            }, 3800);
          }
          setIsLoading(false);
        });
    } else {
      console.info("Connexion Expirée ! Reconnectez-vous");
      setTimeout(() => {
        window.location.href = "/sign-in";
      }, 3800);
      setIsLoading(false);
    }
  }, []);

  if (isLoading) {
    return null;
  }

  if (!isLoggedIn) {
    return (
      <section>
        <div className="containererror">
          <Lottie
            loop
            animationData={mailError}
            play
            style={{ width: 120, height: 120 }}
          />
          <h1>Accès Impossible</h1>
          <p className="message">
            {`
          Vous devez vous connecter pour acceder à cette page.  `}
            <br /> {` Vous allez être redirigé(e) vers la page de connexion. `}
          </p>
          <PrimaryButton btnText="Se connecter" btnLink="/sign-in" />
        </div>
      </section>
    );
  }
  return (
    <div className="backgroundImageMain">
      <div className="reservation-main">
        <ScrollToTop />
        <div className="reservation-container">
          <div className="info-container">
            <img src={data[0].img} alt="" />
            <h1>
              {data[0].firstname} {data[0].lastname}
            </h1>
          </div>
          <div className="next-reservation-container">
            <h2>Réservation à venir</h2>
            <div className="reservation_card">
              <p className="nameborne">Borne Paris 2</p>
              <p className="date">30/12/2023</p>
              <div className="buttons-container">
                <button type="button">Modifier la réservation</button>
                <button type="button">Annuler la réservation</button>
              </div>
            </div>
          </div>

          <div className="past-reservation-container">
            <h2>Réservation passés</h2>
          </div>
        </div>
      </div>
    </div>
  );
}
