/**
 * @fileoverview AddStyles page, add a style to the database.
 * @version 1.0
 * @author Carlos Cabezas Fallas
 * @author Denilson Granados Solano
 * @author Jahel Jiménez Porras
 * @author Jonathan Orozco Pérez
 * @author María Ramírez Hernández
 * History
 * v1.0 – Initial Release
 * ----
 * The first version of AddStyles page was written by Carlos Cabezas, Denilson Granados,
 * Jahel Jiménez, Jonathan Orozco, María Ramírez.
 */

import { useState } from "react";
import { useFirestore } from "reactfire";
import Capitalize from "../Tools";
import imageCompression from "browser-image-compression";

function AddStyles(props) {
  const firestore = useFirestore();
  const stylesRef = firestore.collection("catalog").doc("styles");
  const [style, setStyle] = useState({
    styleName: "",
    styleImage: "",
    styleVisible: false,
  });

  const options = {
    maxSizeMB: 0.6,
    maxWidthOrHeight: 1920,
    useWebWorker: true,
  };

  //This method set the style to add.
  const handleChange = (e) => {
    setStyle({
      ...style,
      [e.target.name]: e.target.value.trim(),
    });
  };

  // This method handles if style is visible or not.
  const handleVisible = (e) => {
    let visible;

    visible = e.target.value === "true" ? true : false;
    setStyle({ ...style, [e.target.name]: visible });
  };

  // This method handles the image selected to add the style.
  const handleImage = (e) => {
    try {
      imageCompression(e.target.files[0], options).then(function (
        compressedFile
      ) {
        imageCompression
          .getDataUrlFromFile(compressedFile)
          .then(function (image) {
            setStyle({
              ...style,
              styleImage: image,
            });
          });
      });
    } catch (error) {
      props.setPopup("image-not-found");
      props.openPopup();
    }
  };

  // This method reset the space of the added image in the form.
  const resetImage = (e) => {
    setStyle({ ...style, styleImage: "" });
    e.target.reset();
  };

  // This method is responsible to add an item.
  const addStyle = (e) => {
    e.preventDefault();

    let date = new Date();
    const collectionName =
      Capitalize(style.styleName) +
      "_" +
      date.getDate() +
      "_" +
      (date.getMonth() + 1) +
      "_" +
      date.getFullYear();

    stylesRef
      .collection(collectionName)
      .doc("settings")
      .set({
        name: Capitalize(style.styleName),
        image: style.styleImage,
        length: 0,
        visible: style.styleVisible,
      })
      .then(() => {
        stylesRef.get(collectionName).then(function (content) {
          if (content.exists) {
            let newStyles = content.data()["styles"];
            newStyles.push(collectionName);
            stylesRef.update({ styles: newStyles });

            props.setPopup(
              "Confirmación",
              "Se ha agregado la categoría con éxito."
            );
            props.openPopup();
            e.target.reset();
            setStyle({ ...style, styleImage: "" });
          }
        });
      })
      .catch((error) => {
        props.setPopup(error.code);
        props.openPopup();
      });
  };

  return (
    <div>
      <div className="col-12 justify-content-center d-flex mt-3">
        <div className="card" id="card-submit">
          <div className="card-body">
            <h4 className="text-center mb-4">Añadir nuevo estilo</h4>
            <form id="addStyle" onSubmit={addStyle} onReset={resetImage}>
              <label className="form-label">Nombre del estilo</label>
              <input
                type="text"
                name="styleName"
                className="form-control"
                onChange={handleChange}
                required
              />
              <label className="form-label topMargin">Imagen del estilo</label>
              <input
                type="file"
                accept="image/*"
                name="styleImage"
                className="form-control"
                onChange={handleImage}
                required
              />
              <div className="text-center my-3">
                {style.styleImage ? (
                  <img
                    src={style.styleImage}
                    alt="Imagen de la prenda"
                    width="250"
                  />
                ) : (
                  <p>No se ha cargado una imagen.</p>
                )}
              </div>
              <div className="mb-3">
                <label htmlFor="InputCategoryImage" className="form-label me-3">
                  Visible:
                </label>
                <div className="form-check form-check-inline">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="styleVisible"
                    onChange={handleVisible}
                    value="true"
                    required
                  />
                  <label className="form-check-label" htmlFor="inlineRadio1">
                    Si
                  </label>
                </div>
                <div className="form-check form-check-inline">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="styleVisible"
                    onChange={handleVisible}
                    value="false"
                    defaultChecked
                    required
                  />
                  <label className="form-check-label" htmlFor="inlineRadio2">
                    No
                  </label>
                </div>
              </div>
              <div className="text-center">
                <button type="submit" className="btn btnAccept topMargin mx-2">
                  Aceptar
                </button>
                <button type="reset" className="btn btnClear topMargin mx-2">
                  Limpiar
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddStyles;
