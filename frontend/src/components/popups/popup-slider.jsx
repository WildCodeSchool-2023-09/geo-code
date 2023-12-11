import { NavLink as Link } from "react-router-dom";
import "../../scss/components/navbar.scss";
import "../../scss/root.scss";
import "../../scss/components/popups/popups-slider.scss";
import "../../scss/components/popups/settings-popup.scss";

export default function SettingsPhone() {
  return (
    <nav className="menuToggle">
      <input type="checkbox" id="SettingsToggleButton" aria-label="Menu" />
      <label htmlFor="SettingsToggleButton" className="settings-icon">
        {}
      </label>
      <ul className="m-nav">
        <li>
          <div className="set-container">
            <div className="section">
              <p className="section-title">Informations</p>
              <span className="separator" />
              <p className="section-text">
                Ce site est un prototype d'exercice dessiné et développé dans le
                cadre d'une formation de Développeur Web et Mobile au sein de la
                Wild Code School sur le campus Remote de Septembre 2023.
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
                    to="/confidentiality"
                    title="Obtenir de l'aide"
                  >
                    Politique de confidentialité
                  </Link>
                </li>
                <li className="section-item">
                  <Link
                    className="underline-animation"
                    to="/deleteaccount"
                    title="Supprimer son compte"
                  >
                    Supprimer son compte
                  </Link>
                </li>
                <li className="section-item">
                  <Link
                    className="underline-animation"
                    to="/help"
                    title="Obtenir de l'aide"
                  >
                    Obtenir de l'aide
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
              <Link
                to="/#home"
                className="set-logo"
                alt="Logo"
                aria-label="Logo Officiel"
                title="Aller à la page d'accueil"
              />

              <p className="copyright">
                © 2024 | GéoCode. Tous droits réservés.
              </p>
            </div>
            <div className="spacer" />
          </div>
        </li>
      </ul>
    </nav>
  );
}
