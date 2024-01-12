import React, { useEffect, useState } from "react";
import axios from "axios";

import "../../scss/auth/SignInPage.scss";
import ScrollToTop from "../ResetScrollOnPage";
import SecondaryButton from "../../components/buttons/SecondaryButton";

export default function SignIn() {
  const [details, setDetails] = useState({
    email: "",
  });

  const isEmailValid = (value) => {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{1,4}$/;
    return emailPattern.test(value);
  };

  const handleDetailsChange = (event) => {
    const { name, value } = event.target;

    setDetails((prevDetails) => {
      return {
        ...prevDetails,
        [name]: value,
      };
    });
  };

  function escapeHtml(unsafe) {
    return unsafe.replace(/[&<"'>]/g, function toMatch(match) {
      switch (match) {
        case "&":
          return "&amp;";
        case "<":
          return "&lt;";
        case ">":
          return "&gt;";
        case '"':
          return "&quot;";
        case "'":
          return "&#39;";
        default:
          return match;
      }
    });
  }

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      if (!isEmailValid(details.email)) {
        document.getElementById("errorLog").innerText = "";
        document.getElementById("errorEmail").innerText =
          "Votre Email n'est pas valide";
        document.getElementById("email").classList.add("errorOnPlaceholder");
      } else {
        document.getElementById("errorEmail").innerText = "";
        document.getElementById("errorLog").innerText = "";
        document.getElementById("email").classList.remove("errorOnPlaceholder");

        const response = await axios.post(
          `${import.meta.env.VITE_BACKEND_URL}/api/login`,
          {
            email: escapeHtml(details.email),
            password: escapeHtml(details.password),
          },
          { withCredentials: true }
        );

        document.getElementById("successLog").innerText =
          "Authentification en cours...";

        localStorage.setItem("UserToken", response.data.token);
        console.info(response.data);

        setTimeout(() => {
          window.location.href = "/success-auth";
        }, 1000);
      }
    } catch (error) {
      document.getElementById("errorLog").innerText =
        error.response.data.message;
    }
  };
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/api/checktoken`, {
        withCredentials: true,
      })

      .then((res) => {
        if (res.data.message === "OK") {
          setIsLoggedIn(true);
          window.location.href = "/profil";
        } else {
          setIsLoggedIn(false);
        }
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return null;
  }

  if (!isLoggedIn) {
    return (
      <div className="backgroundImageMain SignInMain">
        <ScrollToTop />
        <div className="SignIn_container ">
          <div className="SignIn_container_title">
            <h1>Connexion</h1>
          </div>
          <form className="SignIn_container_form">
            <div className="form_placeholder">
              <p className="form_placeholder_title">Email</p>
              <input
                className="form_placeholder_input"
                name="email"
                id="email"
                value={details.email || ""}
                onChange={handleDetailsChange}
                type="email"
                placeholder="john_doe@exemple.com"
                pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{1,4}$"
                required
              />
            </div>
            <div className="form_placeholder">
              <p className="form_placeholder_title">Mot de Passe</p>
              <input
                className="form_placeholder_input"
                name="password"
                id="password"
                value={details.password || ""}
                onChange={handleDetailsChange}
                maxLength="32"
                minLength="8"
                type="password"
                placeholder="***"
                autoComplete="true"
                aria-current="true"
                required
              />
            </div>
            <div className="form_buttons">
              <SecondaryButton
                className="signUp"
                btnText="Créer un compte"
                btnLink="/register"
              />
              <button
                type="button"
                disabled={!details.email || !details.password}
                onClick={handleSubmit}
                className="signIn"
              >
                Se Connecter
              </button>
            </div>
            <button type="button" className="forgotPassword">
              Mot de passe oublier
            </button>
            <button
              type="button"
              onClick={() => window.location.assign("/")}
              className="cancel"
            >
              Annuler
            </button>
            <p className="error_container" id="errorEmail" />
            <p className="error_container" id="errorLog" />
            <p className="success_container" id="successLog" />
          </form>
        </div>
      </div>
    );
  }
  return null;
}
