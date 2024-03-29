import "../../scss/pages.scss";
import Lottie from "react-lottie-player";
import { useEffect } from "react";
import LogInProgress from "../../assets/LottieFiles/LogIn.json";
import ScrollToTop from "../ResetScrollOnPage";

function registerSucces() {
  useEffect(() => {
    setTimeout(() => {
      window.location.href = "/AddYourVehicule";
    }, 3500);
  }, []);

  return (
    <section>
      <ScrollToTop />
      <div className="containererror">
        <Lottie
          loop
          animationData={LogInProgress}
          play
          style={{ width: 120, height: 120 }}
        />
        <h1>Inscription en cours</h1>
      </div>
    </section>
  );
}

export default registerSucces;
