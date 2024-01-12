import React, { useEffect, useState } from "react";
import Lottie from "react-lottie-player";
import axios from "axios";
import { Link } from "react-router-dom";
import ScrollToTop from "./ResetScrollOnPage";

import "../scss/admin-panel.scss";

import mailError from "../assets/LottieFiles/EmailError.json";

export default function AdminPanel() {
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState();
  const [data, setData] = useState([]);
  const [bornesData, setBornesData] = useState([]);
  const [reservationsData, setReservationsData] = useState([]);

  useEffect(() => {
    axios
      .post(`${import.meta.env.VITE_BACKEND_URL}/api/checktoken`, "hello", {
        withCredentials: true,
      })
      .then((res) => {
        if (res.data.message === "OK" && res.data.admin === true) {
          setIsLoggedIn(true);
          setIsAdmin(true);
        } else {
          setIsLoggedIn(false);
          setIsAdmin(false);
          setTimeout(() => {
            window.location.href = "/";
          }, 3800);
        }
        setIsLoading(false);
      });

    axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/users`).then((res) => {
      setData(res.data);
    });

    axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/bornes`).then((res) => {
      setBornesData(res.data);
    });

    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/api/reservations`)
      .then((res) => {
        setReservationsData(res.data);
      });
  }, []);

  const userCreatedLast7Days = data.filter((user) => {
    const userDate = new Date(user.inscription);
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 8);

    if (userDate >= sevenDaysAgo) {
      return user;
    }

    return null;
  });

  const userConnectedLast7Days = data.filter((user) => {
    const userDate = new Date(user.connection);
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 8);

    if (userDate >= sevenDaysAgo) {
      return user;
    }

    return null;
  });

  const reservations7DaysAgo = reservationsData.filter((reservations) => {
    const reservationDate = new Date(reservations.date_reservation);
    const dateOfThisDay = new Date();
    dateOfThisDay.setDate(dateOfThisDay.getDate() - 8);

    if (reservationDate >= dateOfThisDay) {
      return reservations;
    }

    return null;
  });

  if (isLoading) {
    return null;
  }

  if (!isLoggedIn || !isAdmin) {
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
          Vous n'êtes pas autorisé(e) à acceder a cette page.  `}
            <br />
            {` Vous n'avez pas les droits nécéssaire ! Redirection vers l'accueil `}
          </p>
        </div>
      </section>
    );
  }

  return (
    <div className="backgroundImageMain">
      <ScrollToTop />
      <div className="admin_page">
        <div className="admin_page_links">
          <h1 className="admin_containter_links_title">Administration</h1>
          <div className="admin_page_links_btns">
            <Link className="buttons blue-button" to="/liste-utilisateurs">
              Liste des Utilisateurs
            </Link>
            <Link className="buttons blue-button" to="/liste-bornes">
              Liste des Bornes
            </Link>
            <Link className="buttons blue-button" to="/ajout-bornes">
              Ajouter des Bornes
            </Link>
          </div>
        </div>
        <div className="admin_page_infos">
          <div className="admin_page_infos_data">
            <div className="Title">
              <p className="name">Nouveaux Utilisateurs</p>
              <p className="subname">sur les 7 derniers jours</p>
              <p className="TextValue">{userCreatedLast7Days.length}</p>
            </div>
          </div>
          <div className="admin_page_infos_data">
            <div className="Title">
              <p className="name">Utilisateurs connecté(e)s</p>
              <p className="subname"> sur les 7 derniers jours</p>
              <p className="TextValue">{userConnectedLast7Days.length}</p>
            </div>
          </div>
          <div className="admin_page_infos_data">
            <div className="Title">
              <p className="name">Réservations</p>
              <p className="subname"> sur les 7 derniers jours</p>
              <p className="TextValue">{reservations7DaysAgo.length}</p>
            </div>
          </div>
          <div className="admin_page_infos_data">
            <div className="Title">
              <p className="name">Nombre d'utilisateurs</p>
              <p className="subname"> Total</p>
              <p className="TextValue">{data.length}</p>
            </div>
          </div>
          <div className="admin_page_infos_data">
            <div className="Title">
              <p className="name">Nombre de bornes</p>
              <p className="subname"> Total</p>
              <p className="TextValue">{bornesData.length}</p>
            </div>
          </div>
          <div className="admin_page_infos_data">
            <div className="Title">
              <p className="name">Réservations</p>
              <p className="subname"> Total</p>
              <p className="TextValue">{reservationsData.length}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
