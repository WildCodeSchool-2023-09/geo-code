import React, { useContext, useEffect, useState } from "react";
import Lottie from "react-lottie-player";
import axios from "axios";

import ReservationContext from "../Context/ReservationContext";

import "../scss/reservation.scss";

import mailError from "../assets/LottieFiles/EmailError.json";
import PrimaryButton from "../components/buttons/PrimaryButton";

function DoReservation() {
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // import des data sur les bornes
  const { reservation, setReservation, borneId, setBorneId } =
    useContext(ReservationContext);
  console.info(reservation, setBorneId, setReservation, borneId);
  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/api/checktoken`, {
        withCredentials: true,
      })
      .then((res) => {
        if (res.data.message === "OK") {
          setIsLoggedIn(true);
        } else {
          setIsLoggedIn(false);
          setTimeout(() => {
            window.location.href = "/sign-in";
          }, 3800);
        }
        setIsLoading(false);
      });
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
}
export default DoReservation;
