/**
 * @fileoverview AdminAboutUs page, manage the contact methods that the store has.
 * @version 1.0
 * @author Carlos Cabezas Fallas
 * @author Denilson Granados Solano
 * @author Jahel Jiménez Porras
 * @author Jonathan Orozco Pérez
 * @author María Ramírez Hernández
 * History
 * v1.0 – Initial Release
 * ----
 * The first version of AdminAboutUs page was written by Carlos Cabezas, Denilson Granados,
 * Jahel Jiménez, Jonathan Orozco, María Ramírez.
 */

import React, { useState } from "react";
import { useFirestore } from "reactfire";

function AddInformation(props) {
  const information = props.data;
  const firestore = useFirestore();
  const informationRef = firestore.collection("webpage").doc("information");
  const [newInformation, setNewInformation] = useState({
    email: "",
    facebook: "",
    instagram: "",
    phoneNumber: "",
    aboutUs: "",
    extraInfo: "",
    flag: false,
  });

  // This method is responsible to add the information.
  function fillNewInformation() {
    if (information.email === "") {
    } else if (!newInformation.flag) {
      setNewInformation({
        email: information.email,
        facebook: information.facebook,
        instagram: information.instagram,
        phoneNumber: information.phoneNumber,
        aboutUs: information.aboutUs,
        extraInfo: information.extraInfo,
        flag: true,
      });
    }
  }

  // This method set the information to add.
  const handleChange = (e) => {
    setNewInformation({
      ...newInformation,
      [e.target.name]: e.target.value.trim(),
    });
  };

  // This method update the contact information of the store.
  const updateInformation = (e) => {
    e.preventDefault();
    informationRef
      .update({
        email: newInformation.email.toLowerCase(),
        phoneNumber: newInformation.phoneNumber,
        facebook: newInformation.facebook.toLowerCase(),
        instagram: newInformation.instagram.toLowerCase(),
        aboutUs: newInformation.aboutUs,
        extraInfo: newInformation.extraInfo,
      })
      .then(function () {
        props.setPopup(
          "Confirmación",
          "Se ha agregado la información con éxito."
        );
        props.openPopup();
        e.target.reset();
      });
  };

  return (
    <div className="col-12 d-flex justify-content-center">
      {fillNewInformation()}
      <div className="card mt-3" id="card-submit">
        <div className="card-body">
          <h4 className="text-center mb-4">Editar información de contacto</h4>
          <form onSubmit={updateInformation}>
            <label className="form-label">Correo electrónico</label>
            <input
              type="email"
              name="email"
              className="form-control"
              onChange={handleChange}
              value={newInformation.email}
              placeholder={information.email}
              required
            />
            <label className="form-label topMargin">Número telefónico</label>
            <input
              type="number"
              name="phoneNumber"
              min="11111111"
              max="99999999"
              className="form-control"
              onChange={handleChange}
              value={newInformation.phoneNumber}
              placeholder={information.phoneNumber}
              required
            />
            <label className="form-label topMargin">
              Link de página de Facebook
            </label>
            <input
              type="url"
              name="facebook"
              className="form-control"
              onChange={handleChange}
              value={newInformation.facebook}
              placeholder={information.facebook}
              required
            />
            <label className="form-label topMargin">
              Link de página de Instagram
            </label>
            <input
              type="url"
              name="instagram"
              className="form-control"
              onChange={handleChange}
              value={newInformation.instagram}
              placeholder={information.instagram}
              required
            />
            <label className="form-label topMargin">
              Ingresar información acerca de la tienda
            </label>
            <textarea
              className="form-control"
              rows="5"
              name="aboutUs"
              onChange={handleChange}
              value={newInformation.aboutUs}
              placeholder={information.aboutUs}
              required
            />
            <label className="form-label topMargin">
              Ingresar detalles adicionales acerca de la tienda (puede dejarse
              en blanco)
            </label>
            <textarea
              className="form-control"
              rows="5"
              name="extraInfo"
              onChange={handleChange}
              value={newInformation.extraInfo}
              placeholder={information.extraInfo}
            />
            <div className="text-center">
              <button type="submit" className="btn btnAccept topMargin mx-2">
                Aceptar
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
export default AddInformation;
