import React, { useEffect, useState, useRef, useCallback } from "react";
import Lottie from "react-lottie-player";
import axios from "axios";
import { Link } from "react-router-dom";
/* eslint-disable react/jsx-props-no-spreading */
// Le composant dropzone a besoin des prop spreading pour fonctionner. Vu avec SAM
import "../scss/admin-add-bornes.scss";
import { useDropzone } from "react-dropzone";
import ScrollToTop from "./ResetScrollOnPage";
import mailError from "../assets/LottieFiles/EmailError.json";

import "../scss/admin-add-bornes.scss";

export default function AdminAddBornes() {
  const [isAdmin, setIsAdmin] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const inputRef = useRef(null);

  const handleClick = () => {
    inputRef.current.click();
  };
  
  const [file, setFile] = useState({});
  const handleFileChange = (e) => {
    e.preventDefault();
    const acceptedFile = e.target.files[0];
    if (!acceptedFile) {
      return null;
    }
    console.info(acceptedFile);
    setFile(acceptedFile);
    console.info(file);
    return acceptedFile;
  };

  const onDrop = useCallback(
    (acceptedFile) => {
      console.info(acceptedFile[0]);
      setFile(acceptedFile[0]);
    },
    [file]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });
  const url = "http://localhost:3310/api/uploads";

  function Submit(e) {
    e.preventDefault();
    const formData = new FormData();
    const config = {
      Headers: {
        "content-type": "multipart/form-data",
      },
    };
    formData.append("file", file);
    formData.append("fileName", file.name);
    axios
      .post(url, formData, config)
      .then((response) => {
        console.info(response.data);
      })
      .catch((err) => console.info(err));
  }

  useEffect(() => {
    if (localStorage.getItem("UserToken") !== null) {
      axios
        .post(`${import.meta.env.VITE_BACKEND_URL}/api/checktoken`, {
          token: localStorage.getItem("UserToken"),
        })
        .then((res) => {
          if (res.data.message === "OK" && res.data.admin === true) {
            console.info("Connexion Approuvée");
            setIsLoggedIn(true);
            setIsAdmin(true);
          } else {
            setIsAdmin(false);
            console.info(
              "Vous n'avez pas les droits nécéssaire ! Redirection vers l'accueil"
            );
            setTimeout(() => {
              window.location.href = "/";
            }, 3800);
          }
          setIsLoading(false);
        });
    } else {
      console.info("Connexion Expirée ! Reconnectez-vous");
      setTimeout(() => {
        window.location.href = "/sign-in";
      }, 3800);
      setIsLoading(false);
    }
  }, []);

  if (isLoading) {
    return null;
  }

  if (!isLoggedIn || !isAdmin) {
    return (
      <section>
        <div className="containererror">
          <Lottie
            loop
            animationData={mailError}
            play
            style={{ width: 120, height: 120 }}
          />
          <h1>Accès Impossible</h1>
          <p className="message">
            {`
          Vous n'êtes pas autorisé(e) à acceder a cette page.  `}
            <br />
            {` Vous n'avez pas les droits nécéssaire ! Redirection vers l'accueil `}
          </p>
        </div>
      </section>
    );
  }
  return (
    <main className="add-bornes-main backgroundImageMain">
      <ScrollToTop />
      <Link to="/admin">Retour</Link>
      <div className="upload-card">
        <h1>Ajouter des Bornes</h1>
        <div className="upload">
          <div className="upload_DragDrop" {...getRootProps()}>
            <input {...getInputProps()} />
            {isDragActive ? (
              <p>Chargez votre fichier ici ... </p>
            ) : (
              <div className="upload_DragDrop_text">
                Drag 'n' drop le fichier ici, ou cliquez sur
              </div>
            )}
          </div>
          <form htmlFor="file" className="upload_form">
            <input
              type="file"
              name="file"
              accept="csv"
              onChange={handleFileChange}
              className="upload_form_input"
            />
          </form>
        </div>
        <div className="buttons-container">
          <button
            type="submit"
            className="buttons-container_blue"
            onClick={Submit}
          >
            Charger le CSV
          </button>

          <Link to="/admin">
            <button type="button" className="buttons-container_dark">
              Annuler
            </button>
          </Link>
        </div>
      </div>
    </main>
  );
}
