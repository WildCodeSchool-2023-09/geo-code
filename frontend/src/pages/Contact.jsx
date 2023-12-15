import React, { useState } from "react";
import emailjs from "@emailjs/browser";

import "../scss/contact.scss";

export default function Contact() {
  const [details, setDetails] = useState({
    firstname: "",
    lastname: "",
    email: "",
    category: "",
    subject: "",
    message: "",
  });

  const handleDetailsChange = (event) => {
    const { name, value } = event.target;

    setDetails((prevDetails) => {
      return {
        ...prevDetails,
        [name]: value,
      };
    });
  };

  const handleSendEmail = () => {
    emailjs.init(import.meta.env.VITE_EMAIL_USER_ID);
    emailjs
      .send(
        import.meta.env.VITE_EMAIL_SERVICE_ID,
        import.meta.env.VITE_EMAIL_TEMPLATE_ID,
        {
          firstname: details.firstname,
          lastname: details.lastname,
          category: details.category,
          email: details.email,
          subject: details.subject,
          message: details.message,
        }
      )
      .then((response) => {
        console.info(response);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <main className="backgroundImageMain">
      <div className="from_contact_container">
        <div className="form_placeholder">
          <p className="form_placeholder_title">Nom</p>
          <input
            className="form_placeholder_input"
            name="lastname"
            value={details.lastname}
            onChange={handleDetailsChange}
            type="text"
            placeholder="Doe"
            required
          />
        </div>
        <div className="form_placeholder">
          <p className="form_placeholder_title">Prénom</p>
          <input
            className="form_placeholder_input"
            name="firstname"
            value={details.firstname}
            onChange={handleDetailsChange}
            type="text"
            placeholder="John"
            required
          />
        </div>
        <div className="form_placeholder">
          <p className="form_placeholder_title">Email</p>
          <input
            className="form_placeholder_input"
            name="email"
            value={details.email}
            onChange={handleDetailsChange}
            type="email"
            placeholder="john_doe@exemple.com"
            required
          />
        </div>
        <div className="form_placeholder">
          <label htmlFor="category-selector" className="form_placeholder_title">
            Catégorie
          </label>
          <select
            id="category-selector"
            className="form_placeholder_subject"
            name="category"
            onChange={handleDetailsChange}
            required
          >
            <option value="">-</option>
            <option value="Informations">Demande d'informations</option>
            <option value="Partenariat">Demande de partenariat</option>
            <option value="Assistance">Demande d'assistance</option>
            <option value="Autres">Autres</option>
          </select>
        </div>
        <div className="form_placeholder">
          <p className="form_placeholder_title">Sujet</p>
          <input
            className="form_placeholder_input"
            name="subject"
            value={details.subject}
            onChange={handleDetailsChange}
            type="text"
            placeholder="Demande de ..."
            required
          />
        </div>
        <div className="form_placeholder">
          <p className="form_placeholder_title">Message</p>
          <textarea
            className="form_placeholder_input form_placeholder_textarea"
            name="message"
            value={details.message}
            onChange={handleDetailsChange}
            type="text"
            placeholder="Votre message ici ..."
            required
          />
        </div>
        <button
          type="button"
          disabled={
            !details.firstname ||
            !details.lastname ||
            !details.subject ||
            !details.email ||
            !details.category ||
            !details.message
          }
          onClick={handleSendEmail}
        >
          <span>Envoyer le Message</span>
        </button>
      </div>
    </main>
  );
}
