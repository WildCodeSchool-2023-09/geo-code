import React, { useState } from "react";
import emailjs from "@emailjs/browser";

import "../scss/contact.scss";

export default async function Contact() {
  const [details, setDetails] = useState({
    subject: "",
    message: "",
    to_email: "",
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
          to_email: details.to_email,
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
    <div className="main">
      <div>
        <span>To :</span>
        <input
          name="to_email"
          value={details.to_email}
          onChange={handleDetailsChange}
          type="email"
          placeholder="Required .. "
        />
      </div>
      <div>
        <span>Subject :</span>
        <input
          name="subject"
          value={details.subject}
          onChange={handleDetailsChange}
          type="text"
          placeholder="Required"
        />
      </div>
      <div>
        <span>Message</span>
        <textarea
          name="message"
          value={details.message}
          onChange={handleDetailsChange}
          placeholder="Required .. "
        />
      </div>
      <button
        type="button"
        disabled={!details.to_email || !details.subject || !details.message}
        onClick={handleSendEmail}
      >
        <span>Send Email</span>
      </button>
    </div>
  );
}
