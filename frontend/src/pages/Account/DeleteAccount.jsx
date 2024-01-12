import React, { useEffect, useState } from "react";
import axios from "axios";
import Lottie from "react-lottie-player";

import "../../scss/auth/SignInPage.scss";
import ScrollToTop from "../ResetScrollOnPage";
import mailError from "../../assets/LottieFiles/EmailError.json";

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
          `${import.meta.env.VITE_BACKEND_URL}/api/delete`,
          {
            email: escapeHtml(details.email),
            password: escapeHtml(details.password),
          },
          { withCredentials: true }
        );

        if (response.data.message === "Compte supprimé") {
          document.getElementById("errorLog").innerText = "";
          document.getElementById("successLog").innerText =
            "Supression en cours...";
          setTimeout(() => {
            window.location.href = "/account-deleted";
          }, 3800);
        } else if (response.data.message === "Token incorrect") {
          document.getElementById("successLog").innerText = "";
          document.getElementById("errorLog").innerText =
            "Une erreur est survenue, reconnectez-vous";
          setTimeout(() => {
            window.location.href = "/sign-in";
          }, 3800);
        } else if (
          response.data.message ===
          "Impossible de supprimer vous avez des réservations en cours veuillez les annuler si vous souhaitez supprimer votre compte de notre site de type internet merci de votre compréhension"
        ) {
          document.getElementById("successLog").innerText = "";
          document.getElementById("errorLog").innerText =
            "Vous avez des réservations en cours, suppression du compte impossible";
        } else if (response.data.message === "Password incorrect") {
          document.getElementById("successLog").innerText = "";
          document.getElementById("errorLog").innerText =
            "Votre mot de passe est incorrect";
        } else if (response.data.message === "Email incorrect") {
          document.getElementById("successLog").innerText = "";
          document.getElementById("errorLog").innerText =
            "Votre email est incorrect";
        } else {
          document.getElementById("successLog").innerText = "";
          document.getElementById("errorLog").innerText =
            "Une erreur est survenue, veuillez réessayer plus tard";
        }
      }
    } catch (error) {
      document.getElementById("successLog").innerText = "";
      document.getElementById("errorLog").innerText =
        error.response.data.message;
    }
  };
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    axios
      .post(`${import.meta.env.VITE_BACKEND_URL}/api/checktoken`, "hello", {
        withCredentials: true,
      })
      .then((res) => {
        if (res.data.message === "OK") {
          console.info("Connexion Approuvée");
          setIsLoggedIn(true);
        } else {
          setIsLoggedIn(false);
          setTimeout(() => {
            window.location.href = "/sign-in";
          }, 3800);
        }
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return null;
  }

  if (!isLoggedIn) {
    return (
      <section>
        <div className="containererror">
          <Lottie
            loop
            animationData={mailError}
            play
            style={{ width: 120, height: 120 }}
          />
          <h1>Connectez-vous</h1>
          <p className="message">
            {`
        Pour supprimer votre compte vous devez d'abord vous connecter.  `}
            <br />
            {` Redirection vers la page de connexion en cours ... `}
          </p>
        </div>
      </section>
    );
  }
  return (
    <main className="backgroundImageMain SignInMain">
      <ScrollToTop />
      <div className="SignIn_container ">
        <div className="SignIn_container_title">
          <h1>Supprimer votre compte</h1>
        </div>
        <form className="SignIn_container_form">
          <div className="form_placeholder">
            <p>
              Afin de supprimer votre compte, nous vous demandons de vous nous
              fournir les information suivantes. <br />
              Attention, nous ne pouvons pas supprimer votre compte si vous avez
              des réservation en cours.
            </p>
          </div>
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
            <button
              type="button"
              disabled={!details.email || !details.password}
              onClick={handleSubmit}
              className="signIn"
            >
              Supprimer mon compte
            </button>
          </div>
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
    </main>
  );
}
