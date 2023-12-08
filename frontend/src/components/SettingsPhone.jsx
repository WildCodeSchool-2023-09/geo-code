import { NavLink as Link } from "react-router-dom";
import "../scss/components/navbar.scss";

import "../scss/root.scss";
import "../scss/components/settings-popup.scss";
import "../scss/components/footer.scss";

export default function SettingsPhone() {
  return (
    <nav className="menuToggle">
      <input type="checkbox" id="SettingsToggleButton" aria-label="Menu" />
      <label htmlFor="SettingsToggleButton" className="settings-icon">
        {}
      </label>
      <ul className="m-nav">
        <li>
          <div className="footer-container">
            <Link
              to="/#home"
              className="footer-logo"
              alt="Logo"
              aria-label="Logo Officiel"
              title="Aller à la page d'accueil"
            />
            <div className="section">
              <p className="section-title">Informations</p>
              <span className="separator" />
              <p className="section-text">
                XXX
                <br />
                XXX
                <br />
                XXX
                <br />
                XXX
              </p>
            </div>
            <div className="section">
              <p className="section-title">A propos</p>
              <span className="separator" />
              <p className="section-text">Description</p>
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
            <div className="spacing" />
          </div>
          <div className="footer-section">
            <p className="copyright">© 2023 | XX. Tous droits réservés.</p>
          </div>
        </li>
      </ul>
    </nav>
  );
}
