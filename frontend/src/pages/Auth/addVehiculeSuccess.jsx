import "../../scss/pages.scss";
import { Link } from "react-router-dom";
import Lottie from "react-lottie-player";
import LogInProgress from "../../assets/LottieFiles/LogIn.json";
import ScrollToTop from "../ResetScrollOnPage";

function addVehiculeSuccess() {
  return (
    <section>
      <ScrollToTop />
      <div className="containererror">
        <Lottie
          loop={false}
          animationData={LogInProgress}
          play
          style={{ width: 120, height: 120 }}
        />
        <h1>Ajout de votre véhicule</h1>
      </div>
      <Link to="/addYourVehicule">Ajouter un véhicule</Link>
      <Link to="/profil">Aller sur votre profil</Link>
    </section>
  );
}

export default addVehiculeSuccess;
