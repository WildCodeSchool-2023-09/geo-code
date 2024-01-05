import "../scss/components/footer.scss";
import { NavLink as Link } from "react-router-dom";

export default function Footer() {
  return (
    <div className="footermain">
      <svg
        className="footer-wave"
        viewBox="0 0 1920 136"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect width="1920" height="138" />
        <path
          d="M0 0L64 2C128 4 256 8.00001 384 16.2C512 24.3 640 36.7 768 43.3C896 50 1024 51 1152 44.7C1280 38.3 1408 24.7 1536 23.7C1664 22.7 1792 34.3 1856 40.2L1920 46V138H1856C1792 138 1664 138 1536 138C1408 138 1280 138 1152 138C1024 138 896 138 768 138C640 138 512 138 384 138C256 138 128 138 64 138H0L0 0Z"
          fill="#19776D"
        />
        <path
          d="M0 0L64 2C128 4 256 8.00001 384 16.2C512 24.3 640 36.7 768 43.3C896 50 1024 51 1152 44.7C1280 38.3 1408 24.7 1536 23.7C1664 22.7 1792 34.3 1856 40.2L1920 46V138H1856C1792 138 1664 138 1536 138C1408 138 1280 138 1152 138C1024 138 896 138 768 138C640 138 512 138 384 138C256 138 128 138 64 138H0L0 0Z"
          fill="#19776D"
        />
        <path
          d="M0 106L64 102.2C128 98.3 256 90.7 384 87C512 83.3 640 83.7 768 81.2C896 78.7 1024 73.3 1152 72.7C1280 72 1408 76 1536 76.2C1664 76.3 1792 72.7 1856 70.8L1920 69V138H1856C1792 138 1664 138 1536 138C1408 138 1280 138 1152 138C1024 138 896 138 768 138C640 138 512 138 384 138C256 138 128 138 64 138H0L0 106Z"
          fill="#19776D"
        />
      </svg>

      <footer className="footer">
        <div className="footer-container">
          <Link
            to="/#home"
            className="footer-logo"
            alt="Logo"
            aria-label="Logo Officiel"
            title="Aller à la page d'accueil"
          />
          <div className="section">
            <p className="section-title">A Propos</p>
            <span className="separator" />
            <p className="section-text">
              Portail GéoCode, est une Web App développée par la société
              GéoCode. Basée en France à Cergy Pontoise, l’entreprise est leader
              dans le domaine de réservation de borne de recharge de véhicules
              électriques.
            </p>
          </div>
          <div className="section">
            <p className="section-title">Légale</p>
            <span className="separator" />
            <ul className="section-list">
              <li className="section-item">
                <Link
                  className="underline-animation"
                  to="/mentionslegales"
                  title="Aller à la page Mentions Légales"
                >
                  Mentions Légales
                </Link>
              </li>
              <li className="section-item">
                <Link
                  className="underline-animation"
                  to="/cookies"
                  title="Aller à la page Cookies"
                >
                  Cookies
                </Link>
              </li>
              <li className="section-item">
                <Link
                  className="underline-animation"
                  to="/account/delete"
                  title="Supprimer son compte"
                >
                  Supprimer son compte
                </Link>
              </li>
            </ul>
          </div>
          <div className="section">
            <p className="section-title">Réseaux Sociaux</p>
            <span className="separator" />
            <ul className="section-list">
              <li className="section-item">
                <Link
                  className="underline-animation"
                  to="/#"
                  title="Aller à la page Mentions Légales"
                >
                  Instagram
                </Link>
              </li>
              <li className="section-item">
                <Link
                  className="underline-animation"
                  to="/#"
                  title="Aller à la page Cookies"
                >
                  Facebook
                </Link>
              </li>
              <li className="section-item">
                <Link
                  className="underline-animation"
                  to="/#"
                  title="Aller à la page Contact"
                >
                  LinkedIn
                </Link>
              </li>
              <li className="section-item">
                <Link
                  className="underline-animation"
                  to="/#"
                  title="Aller à la page Contact"
                >
                  Twitter
                </Link>
              </li>
            </ul>
          </div>
          <div className="section">
            <p className="section-title">Informations</p>
            <span className="separator" />
            <ul className="section-list">
              <li className="section-item">
                <Link
                  className="underline-animation"
                  to="/contact"
                  title="Aller à la page Contact"
                >
                  Nous Contacter
                </Link>
              </li>
              <li className="section-item">
                <Link
                  className="underline-animation"
                  to="/partenaires"
                  title="Aller à la page Partenaires"
                >
                  Devenir Partenaire
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="footer-section">
          <p className="copyright">© 2024 | GéoCode. Tous droits réservés.</p>
        </div>
      </footer>
    </div>
  );
}
