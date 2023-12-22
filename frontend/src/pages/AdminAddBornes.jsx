/* eslint-disable react/jsx-props-no-spreading */
// Le composant dropzone a besoin des prop spreading pour fonctionner. Vu avec SAM

import "../scss/admin-add-bornes.scss";
import { Link } from "react-router-dom";
import { useDropzone } from "react-dropzone";
import { useCallback } from "react";

export default function AdminAddBornes() {
  const handleFileChange = (e) => {
    e.preventDefault();
    const fileObj = e.target.files && e.target.files[0];
    if (!fileObj) {
      return null;
    }
    console.info(fileObj);
    return fileObj;
  };

  const onDrop = useCallback((acceptedFiles) => {
    console.info(acceptedFiles[0]);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });
  return (
    <main className="add-bornes-main backgroundImageMain">
      <Link to="/admin">Retour</Link>
      <div className="upload-card">
        <h1>Ajouter des Bornes</h1>
        <div className="upload">
          <div {...getRootProps()}>
            <input {...getInputProps()} />
            {isDragActive ? (
              <p>Chargez votre fichier ici ...</p>
            ) : (
              <p>
                Drag 'n' drop le fichier ici, ou cliquez sur
                <form encType="multipart/form-data" method="post">
                  <input
                    type="file"
                    name="uploadfile"
                    accept="csv"
                    onChange={handleFileChange}
                  />
                </form>
              </p>
            )}
          </div>
        </div>
        <div className="buttons-container">
          <button type="submit" className="buttons-container_blue">
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
