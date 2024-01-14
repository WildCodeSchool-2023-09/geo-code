import "../../scss/pages.scss";
import Lottie from "react-lottie-player";
import LogInProgress from "../../assets/LottieFiles/LogIn.json";
import ScrollToTop from "../ResetScrollOnPage";

function addBornesSuccess() {
  setTimeout(() => {
    window.location.href = "/admin";
  }, 3500);

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
        <h1>Importation des bornes</h1>
      </div>
    </section>
  );
}

export default addBornesSuccess;
