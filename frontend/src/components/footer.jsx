import "../scss/components/footer.scss";
import { NavLink as Link } from "react-router-dom";

export default function Footer() {
  return (
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
            Portail GéoCode, est une Web App développée par la société GéoCode.
            Basée en France à Cergy Pontoise, l’entreprise est leader dans le
            domaine de réservation de borne de recharge de véhicules
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
                to="/contact"
                title="Aller à la page Contact"
              >
                Contact
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
                to="/#"
                title="Aller à la page Mentions Légales"
              >
                Nous Contacter
              </Link>
            </li>
            <li className="section-item">
              <Link
                className="underline-animation"
                to="/#"
                title="Aller à la page Cookies"
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
  );
}
