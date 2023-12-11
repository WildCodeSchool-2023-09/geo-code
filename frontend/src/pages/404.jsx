import { Link } from "react-router-dom";
import "../scss/pages.scss";
import Lottie from "react-lottie-player";
import animation404 from "../data/404-animation.json";

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
        <Link className="btn-return" to="/">
          retourner à la page d'accueil
        </Link>
      </div>
    </section>
  );
}
