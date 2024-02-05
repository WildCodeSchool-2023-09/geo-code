import "../../scss/pages.scss";
import Lottie from "react-lottie-player";
import LogInProgress from "../../assets/LottieFiles/LogIn.json";
import ScrollToTop from "../ResetScrollOnPage";
import PrimaryButton from "../../components/buttons/PrimaryButton";
import SecondaryButton from "../../components/buttons/SecondaryButton";

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
      <PrimaryButton btnLink="/addYourVehicule" btnText="Ajouter un véhicule" />
      <SecondaryButton btnLink="/profil" btnText="Retour au profil" />
    </section>
  );
}

export default addVehiculeSuccess;
