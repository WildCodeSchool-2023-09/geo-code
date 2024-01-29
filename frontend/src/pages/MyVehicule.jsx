import { useState, useEffect } from "react";
import axios from "axios";
import Lottie from "react-lottie-player";
import SecondaryButton from "../components/buttons/SecondaryButton";
import PrimaryButton from "../components/buttons/PrimaryButton";
import mailError from "../assets/LottieFiles/EmailError.json";
import "../scss/Myvehicule.scss";

function MyVehicule() {
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [id, setId] = useState("");
  const [vehicules, setVehicules] = useState([]);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/api/checktoken`, {
        withCredentials: true,
      })
      .then((res) => {
        if (res.data.message === "OK") {
          setIsLoggedIn(true);
          setId(res.data.id);
        } else {
          setIsLoggedIn(false);
          setTimeout(() => {
            window.location.href = "/sign-in";
          }, 3800);
        }
        setIsLoading(false);
      });

    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/api/checkVehicule/${id}`)
      .then((res) => setVehicules(res.data))
      .catch((err) => console.error(err));
  }, []);
  console.info(vehicules);
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
      <div className="myVehicule_allpage">
        <div className="title_page">
          <h2>Voici la liste de vos véhicules</h2>
        </div>
        <div className="vehicule_card_container">
          {vehicules.map((vehicule) => (
            <div className="vehicule_card">
              <p>Marque : {vehicule.marque_name}</p>
              <p>Modèle : {vehicule.modele_name}</p>
              <div className="vehicule_card_button_container">
                <button type="button" className="vehicule_card_button">
                  Modifier les informations du véhicule
                </button>
                <button type="button" className="vehicule_card_button">
                  Supprimer ce véhicule
                </button>
              </div>
            </div>
          ))}
        </div>
        <div className="final_Button">
          <PrimaryButton
            btnText="Ajouter un nouveau véhicule"
            btnLink="/addYourVehicule"
          />
          <SecondaryButton btnText="Retour à mon profil" btnLink="/profil" />
        </div>
      </div>
    </div>
  );
}

export default MyVehicule;
