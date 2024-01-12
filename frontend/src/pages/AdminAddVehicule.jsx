import React, { useEffect, useState } from "react";
import Lottie from "react-lottie-player";
import axios from "axios";
import { Link } from "react-router-dom";
import "../scss/admin-add-vehicule.scss";
import ScrollToTop from "./ResetScrollOnPage";
import mailError from "../assets/LottieFiles/EmailError.json";
import Breadcrumb from "../components/breadcrumb";

export default function AdminAddVehicule() {
  const [isAdmin, setIsAdmin] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [vehiculeData, setVehiculeData] = useState([]);
  const urlmarques = `${import.meta.env.VITE_BACKEND_URL}/api/marques`;
  const urlmodeles = `${import.meta.env.VITE_BACKEND_URL}/api/modeles`;

  function Submit() {
    axios
      .get(
        `https://public.opendatasoft.com/api/explore/v2.1/catalog/datasets/all-vehicles-model/records?group_by=id%2Cmake%2C%20model%2Catvtype&limit=20000&offset=0&refine=fueltype%3AElectricity`
      )
      .then((res) => setVehiculeData(res.data.results))
      .catch((err) => console.error(err));

    axios
      .post(urlmarques, vehiculeData)
      .then((res) => console.info(res))
      .catch((err) => console.error(err));

    axios
      .post(urlmodeles, vehiculeData)
      .then((res) => console.info(res))
      .catch((err) => console.error(err));
  }

  useEffect(() => {
    if (localStorage.getItem("UserToken") !== null) {
      axios
        .post(`${import.meta.env.VITE_BACKEND_URL}/api/checktoken`, {
          token: localStorage.getItem("UserToken"),
        })
        .then((res) => {
          if (res.data.message === "OK" && res.data.admin === true) {
            setIsLoggedIn(true);
            setIsAdmin(true);
          } else {
            setIsAdmin(false);
            setTimeout(() => {
              window.location.href = "/";
            }, 3800);
          }
          setIsLoading(false);
        });
    } else {
      setTimeout(() => {
        window.location.href = "/sign-in";
      }, 3800);
      setIsLoading(false);
    }
  }, []);

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

  const arianfil = [{ name: "Admin", link: "/admin" }];

  return (
    <div className="backgroundImageMain">
      <div className="add_vehicule_page">
        <ScrollToTop />
        <Breadcrumb
          data={arianfil}
          currentname="Mise à jour de la base de donnée véhicule"
        />
        <div className="add_vehicule_page_container">
          <div className="upload-card">
            <div className="buttons-container">
              <button
                type="submit"
                className="buttons-container_blue"
                onClick={Submit}
              >
                Mettre à jour la base de donnée des véhicules
              </button>

              <Link to="/admin">
                <button type="button" className="buttons-container_dark">
                  Annuler
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
