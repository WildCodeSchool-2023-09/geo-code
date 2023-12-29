/* eslint-disable react/jsx-props-no-spreading */
// Le composant dropzone a besoin des prop spreading pour fonctionner. Vu avec SAM
import "../scss/admin-add-bornes.scss";
import { Link } from "react-router-dom";
import axios from "axios";
import { useDropzone } from "react-dropzone";
import { useCallback, useState } from "react";
import ScrollToTop from "./ResetScrollOnPage";

export default function AdminAddBornes() {
  const [file, setFile] = useState({});
  const handleFileChange = (e) => {
    e.preventDefault();
    const acceptedFile = e.target.files && e.target.files[0];
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
      setFile(acceptedFile);
      console.info(file);
    },
    [file]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  function Submit(e) {
    e.preventDefault();
    const url = "http://localhost:3306/uploadFile";
    const formData = new FormData();
    formData.append("file", file);
    formData.append("fileName", file.name);
    const config = {
      Headers: {
        "content-type": "multipart/form-data",
      },
    };
    axios
      .post(url, formData, config)
      .then((response) => {
        console.info(response.data);
      })
      .catch((err) => console.info(err));
  }
  return (
    <main className="add-bornes-main backgroundImageMain">
      <ScrollToTop />
      <Link to="/admin">Retour</Link>
      <div className="upload-card">
        <h1>Ajouter des Bornes</h1>
        <div className="upload">
          <div {...getRootProps()}>
            <input {...getInputProps()} />
            {isDragActive ? (
              <p>Chargez votre fichier ici ...</p>
            ) : (
              <div>Drag 'n' drop le fichier ici, ou cliquez sur</div>
            )}
          </div>
          <form encType="multipart/form-data" method="post">
            <input
              type="file"
              name="uploadfile"
              accept="csv"
              onChange={handleFileChange}
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
