import { useEffect, useState, useContext } from "react";
import Lottie from "react-lottie-player";
import axios from "axios";
import { Link } from "react-router-dom";
import PrimaryButton from "../../components/buttons/PrimaryButton";
import ReservationContext from "../../Context/ReservationContext";

import mailError from "../../assets/LottieFiles/EmailError.json";

function AddYourVehicule() {
  const [marque, setMarque] = useState([]);
  const [modele, setModele] = useState([]);
  const [selectedMarque, setSelectedMarque] = useState({});
  const [selectedModele, setSelectedModele] = useState({});
  const { reservation, setReservation } = useContext(ReservationContext);

  const [isLoading, setIsLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleSelectedMarque = (event) => {
    setSelectedMarque({
      id: event.target.value,
    });
  };

  const handleSelectedModele = (event) => {
    setSelectedModele({
      id: event.target.value,
    });
  };

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/api/checktoken`, {
        withCredentials: true,
      })
      .then((res) => {
        if (res.data.message === "OK") {
          setIsLoggedIn(true);
          setReservation(res.data.id);
        } else {
          setIsLoggedIn(false);
          setTimeout(() => {
            window.location.href = "/sign-in";
          }, 3800);
        }
        setIsLoading(false);
      });
  }, []);
  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/api/marques`)
      .then((resp) => {
        setMarque(resp.data);
      })
      .catch((err) => console.error(err));
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/api/modeles`)
      .then((res) => {
        setModele(res.data);
      })
      .catch((err) => console.error(err));
  }, []);

  const vehiculeData = {
    proprietaire_id: reservation,
    modele_id: selectedModele.id,
  };
  const handleSubmit = () => {
    axios
      .post(`${import.meta.env.VITE_BACKEND_URL}/api/vehicules`, vehiculeData, {
        withCredentials: true,
      })
      .catch((err) => console.error(err));
    setTimeout(() => {
      window.location.href = "/addVehiculeSuccess";
    }, 1000);
  };

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
    <form className="vehiculeInfo">
      <h3>Informations sur le véhicule</h3>
      <div className="content_input">
        <label className="content_input_label" htmlFor="marque">
          Marque
        </label>
        <select onChange={handleSelectedMarque}>
          <option>Selectionnez la marque de votre voiture</option>
          {marque.map((item) => (
            <option key={item.name} value={item.id} name={item.name}>
              {item.name}
            </option>
          ))}
        </select>
      </div>
      <div className="content_input">
        <label className="content_input_label" htmlFor="model">
          Modèle
        </label>
        <select name="marque" onChange={handleSelectedModele}>
          <option>Sélectionnez le modèle de votre véhicule</option>
          {modele
            .filter((item) => {
              return +item.marque_id === +selectedMarque.id;
            })
            .map((item) => (
              <option key={item.id} value={item.id}>
                {item.name}
              </option>
            ))}
        </select>
      </div>

      <div className="addYourVehicule_buttonContainer">
        <button type="button" onClick={handleSubmit}>
          Enregistrer cette voiture
        </button>
        <Link to="/">
          <button type="button">Annuler</button>
        </Link>
      </div>
    </form>
  );
}

export default AddYourVehicule;
