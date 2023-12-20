import React, { useState } from "react";
import "../../scss/auth/SignInPage.scss";

import SecondaryButton from "../../components/buttons/SecondaryButton";

export default function SignIn() {
  const [details, setDetails] = useState({
    email: "",
  });

  const isEmailValid = (value) => {
    const emailPattern = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{1,4}$/;
    return emailPattern.test(value);
  };
  const isPasswordValid = (value) => {
    const messagePattern =
      /(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/;
    return messagePattern.test(value);
  };

  const handleDetailsChange = (event) => {
    const { name, value } = event.target;

    if (!isEmailValid(details.email)) {
      document.getElementById("errorEmail").innerText =
        "Votre Email n'est pas valide";
      document.getElementById("email").classList.add("errorOnPlaceholder");
    } else {
      document.getElementById("errorEmail").innerText = "";
      document.getElementById("email").classList.remove("errorOnPlaceholder");
    }
    if (!isPasswordValid(details.password)) {
      document.getElementById("errorPassword").innerText =
        "Votre mot de passe n'est pas valide !";
      document.getElementById("password").classList.add("errorOnPlaceholder");
    } else {
      document.getElementById("errorPassword").innerText = "";
      document
        .getElementById("password")
        .classList.remove("errorOnPlaceholder");
    }

    setDetails((prevDetails) => {
      return {
        ...prevDetails,
        [name]: value,
      };
    });
  };

  return (
    <main className="backgroundImageMain">
      <div className="SignIn_container ">
        <div className="SignIn_container_title">
          <h1>Connexion</h1>
        </div>
        <div className="SignIn_container_form">
          <div className="form_placeholder">
            <p className="form_placeholder_title">Email</p>
            <input
              className="form_placeholder_input"
              name="email"
              id="email"
              value={details.email}
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
              value={details.password}
              onChange={handleDetailsChange}
              maxLength="32"
              minLength="8"
              type="password"
              placeholder="***"
              required
            />
          </div>
          <div className="form_buttons">
            <SecondaryButton
              className="signUp"
              btnText="Créer un compte"
              btnLink="/sign-up"
            />
            <button
              type="button"
              disabled={!details.email || !details.password}
              onClick=""
              className="signIn"
            >
              Se Connecter
            </button>
          </div>
          <button type="button" className="forgotPassword">
            Mot de passe oublier
          </button>
          <p className="error_container" id="errorEmail" />
          <p className="error_container" id="errorPassword" />
        </div>
      </div>
    </main>
  );
}
