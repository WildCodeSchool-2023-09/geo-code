import React, { useEffect, useState } from "react";
import Lottie from "react-lottie-player";
import axios from "axios";
import { Link } from "react-router-dom";

import data from "../data/UserDataTest.json";

import "../scss/reservation.scss";

import mailError from "../assets/LottieFiles/EmailError.json";
import PrimaryButton from "../components/buttons/PrimaryButton";
import ScrollToTop from "./ResetScrollOnPage";
import ReservationCard from "../components/ReservationCard";
import PastReservationCard from "../components/PastReservationCard";

export default function Reservation() {
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [lastname, setLastname] = useState();
  const [firstname, setFirstname] = useState();
  const [avatar, setAvatar] = useState(data[0].img);

  const [reservation, setReservation] = useState();

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/api/checktoken`, {
        withCredentials: true,
      })
      .then((res) => {
        if (res.data.message === "OK") {
          setIsLoggedIn(true);

          axios
            .get(`${import.meta.env.VITE_BACKEND_URL}/api/takedata`, {
              withCredentials: true,
            })
            .then((resp) => {
              setLastname(resp.data[0].nom);
              setFirstname(resp.data[0].prenom);
              setAvatar(data[0].img);
            });

          axios
            .get(
              `${import.meta.env.VITE_BACKEND_URL}/api/reservationsBrowse`,

              {
                withCredentials: true,
              }
            )
            .then((respo) => {
              setReservation(respo.data);
            });
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
  return (
    <main className="reservation-main">
      <ScrollToTop />
      <div className="reservation-container">
        <Link to="/profil">Retour sur le profil</Link>
        <div className="info-container">
          <img src={avatar} alt="" />
          <h1>
            {firstname} {lastname}
          </h1>
        </div>
        <div className="next-reservation-container">
          <h2>Réservation à venir</h2>
          <div className="reservation-card-container">
            {reservation &&
              reservation.map((res) => {
                return res.map((r) => {
                  const hour = r.heure.split(":")[0];
                  const minutes = r.heure.split(":")[1];
                  const seconds = r.heure.split(":")[2];

                  const reservationDate = new Date(r.date_reservation);
                  reservationDate.setHours(hour);
                  reservationDate.setMinutes(minutes);
                  reservationDate.setSeconds(seconds);

                  if (reservationDate >= new Date()) {
                    return (
                      <ReservationCard
                        key={r.id}
                        id={r.id}
                        borneId={r.borne_id}
                        date={r.date_reservation}
                      />
                    );
                  }
                  return null;
                });
              })}
          </div>
        </div>

        <div className="past-reservation-container">
          <h2>Réservation passés</h2>
          {reservation &&
            reservation.map((res) => {
              return res.map((r) => {
                const hour = r.heure.split(":")[0];
                const minutes = r.heure.split(":")[1];
                const seconds = r.heure.split(":")[2];

                const reservationDate = new Date(r.date_reservation);
                reservationDate.setHours(hour);
                reservationDate.setMinutes(minutes);
                reservationDate.setSeconds(seconds);

                if (reservationDate < new Date()) {
                  return (
                    <PastReservationCard
                      key={r.id}
                      borneId={r.borne_id}
                      date={r.date_reservation}
                    />
                  );
                }
                return null;
              });
            })}
        </div>
      </div>
    </main>
  );
}
