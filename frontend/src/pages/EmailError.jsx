import "../scss/pages.scss";
import Lottie from "react-lottie-player";
import mailError from "../data/EmailError.json";
import PrimaryButton from "../components/buttons/PrimaryButton";

export default function EmailError() {
  return (
    <section>
      <div className="containererror">
        <Lottie
          loop
          animationData={mailError}
          play
          style={{ width: 120, height: 120 }}
        />
        <h1>Une erreur est survenue</h1>
        <p className="message">
          Il y a eu un soucis lors de l'envoi de votre mail.
          <br /> Contactez-nous plutôt via notre adresse mail :
          <a href="mailto:servermail.bsprod@gmail.com">
            {" "}
            servermail.bsprod@gmail.com
          </a>
        </p>
        <PrimaryButton btnText="retourner à la page d'accueil" btnLink="/" />
      </div>
    </section>
  );
}
