import { NavLink as Link } from "react-router-dom";
import PropTypes from "prop-types";

import "../scss/components/navbar.scss";
import "../scss/root.scss";

import PrimaryButton from "./buttons/PrimaryButton";
import SettingsPhone from "./popups/popup-slider";

export default function Navbar({ navData }) {
  return (
    <nav className="header-main">
      <Link
        className="logo"
        to="/accueil"
        aria-label="Retourner à la page d'accueil"
        title="Logo GeoCode"
      />
      <div className="navbar">
        <ul className="nav-list">
          {navData.map((navIndex) => {
            if (navIndex.dropdown === undefined) {
              return navIndex.btn === false ? (
                <li key={navIndex.id}>
                  <Link
                    className="mainLink underline-animation"
                    to={navIndex.linkurl}
                  >
                    {navIndex.linkname}
                  </Link>
                </li>
              ) : (
                <li key={navIndex.id}>
                  <PrimaryButton
                    btnText={navIndex.linkname}
                    btnLink={navIndex.linkurl}
                  />
                </li>
              );
            }
            return (
              <li key={navIndex.id} className="dropdown ">
                <Link
                  className="mainLink underline-animation"
                  to={navIndex.linkurl}
                >
                  {navIndex.linkname}

                  <svg
                    className="nav_droplink_arrow"
                    width="16px"
                    height="16px"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M18.2929 15.2893C18.6834 14.8988 18.6834 14.2656 18.2929 13.8751L13.4007 8.98766C12.6195 8.20726 11.3537 8.20757 10.5729 8.98835L5.68257 13.8787C5.29205 14.2692 5.29205 14.9024 5.68257 15.2929C6.0731 15.6835 6.70626 15.6835 7.09679 15.2929L11.2824 11.1073C11.673 10.7168 12.3061 10.7168 12.6966 11.1073L16.8787 15.2893C17.2692 15.6798 17.9024 15.6798 18.2929 15.2893Z"
                      fill="#fefefe"
                    />
                  </svg>
                </Link>
                <div className="dropdown-content">
                  {navIndex.dropdown.map((dropdown) => (
                    <Link
                      key={dropdown.id}
                      className="dropLink"
                      to={navIndex.linkurl + dropdown.linkurl}
                    >
                      <Link
                        className="nav_dropdown_descritpion_title"
                        to={navIndex.linkurl + dropdown.linkurl}
                      >
                        {dropdown.linkname}
                      </Link>
                      {dropdown.description === undefined ? (
                        <p className="nav_dropdown_descritpion_text">
                          Acceder à la page {dropdown.linkname}
                        </p>
                      ) : (
                        <p className="nav_dropdown_descritpion_text">
                          {`${dropdown.description}`.length > 80
                            ? `${dropdown.description}`.slice(0, 80)
                            : `${dropdown.description}`}
                        </p>
                      )}
                    </Link>
                  ))}
                </div>
              </li>
            );
          })}
        </ul>
        <SettingsPhone navData={navData} />
      </div>
    </nav>
  );
}

Navbar.propTypes = {
  navData: PropTypes.arrayOf(
    PropTypes.shape({
      btn: PropTypes.bool,
      id: PropTypes.string,
      linkname: PropTypes.string,
      linkurl: PropTypes.string,
      dropdown: PropTypes.arrayOf(
        PropTypes.shape({
          btn: PropTypes.bool,
          id: PropTypes.string,
          linkname: PropTypes.string,
          linkurl: PropTypes.string,
          description: PropTypes.string,
        })
      ),
    })
  ),
};

Navbar.defaultProps = {
  navData: [],
};
