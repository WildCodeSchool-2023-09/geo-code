import "../scss/pages.scss";
import Lottie from "react-lottie-player";
import animation404 from "../data/404-animation.json";
import PrimaryButton from "../components/buttons/PrimaryButton";

export default function NotFound() {
  return (
    <section>
      <div className="containererror">
        <Lottie
          loop
          animationData={animation404}
          play
          style={{ width: 260, height: 150 }}
        />
        <h1>Oops! Il semble que la page n'existe pas.</h1>
        <p className="message">
          Nous vous conseillons de retourner à la page d'accueil.
        </p>
        <PrimaryButton btnText="Retourner à la page d'accueil" btnLink="/" />
      </div>
    </section>
  );
}
