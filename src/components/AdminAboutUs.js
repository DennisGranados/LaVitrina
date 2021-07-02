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
  });

  const handleChange = (e) => {
    setNewInformation({
      ...newInformation,
      [e.target.name]: e.target.value,
    });
  };

  const addEmail = (e) => {
    e.preventDefault();
    informationRef
      .update({
        email: newInformation.email,
      })
      .then(function () {
        props.setPopup(
          "Confirmación",
          "Se ha agregado la información con exito."
        );
        props.openPopup();
        e.target.reset();
      });
  };

  const addphoneNumber = (e) => {
    e.preventDefault();
    informationRef
      .update({
        phoneNumber: newInformation.phoneNumber,
      })
      .then(function () {
        props.setPopup(
          "Confirmación",
          "Se ha agregado la información con exito."
        );
        props.openPopup();
        e.target.reset();
      });
  };

  const addFacebook = (e) => {
    e.preventDefault();
    informationRef
      .update({
        facebook: newInformation.facebook,
      })
      .then(function () {
        props.setPopup(
          "Confirmación",
          "Se ha agregado la información con exito."
        );
        props.openPopup();
        e.target.reset();
      });
  };

  const addInstagram = (e) => {
    e.preventDefault();
    informationRef
      .update({
        instagram: newInformation.instagram,
      })
      .then(function () {
        props.setPopup(
          "Confirmación",
          "Se ha agregado la información con exito."
        );
        props.openPopup();
        e.target.reset();
      });
  };

  const addAboutUs = (e) => {
    e.preventDefault();
    informationRef
      .update({
        aboutUs: newInformation.aboutUs,
      })
      .then(function () {
        props.setPopup(
          "Confirmación",
          "Se ha agregado la información con exito."
        );
        props.openPopup();
        e.target.reset();
      });
  };

  const addDetails = (e) => {
    e.preventDefault();
    informationRef
      .update({
        extraInfo: newInformation.extraInfo,
      })
      .then(function () {
        props.setPopup(
          "Confirmación",
          "Se ha agregado la información con exito."
        );
        props.openPopup();
        e.target.reset();
      });
  };

  return (
    <div className="col-12 d-flex justify-content-center">
      <div className="card" id="card-submit">
        <div className="card-body">
          <h4 className="text-center mb-4">Ingresar información de contacto</h4>
          <div className="row">
            <div className="col">
              <label className="form-label">Correo electrónico</label>
              <form className="col-12 d-flex" onSubmit={addEmail}>
                <input
                  type="email"
                  name="email"
                  className="form-control"
                  onChange={handleChange}
                  placeholder={information.email}
                  required
                />
                <div className="text-center mt-3">
                  <button type="submit" className="btn btnAccept ms-2">
                    Actualizar
                  </button>
                </div>
              </form>
            </div>
            <div className="col">
              <label className="form-label">Número telefónico</label>
              <form
                className="col-12 justify-content-center d-flex"
                onSubmit={addphoneNumber}
              >
                <input
                  type="number"
                  name="phoneNumber"
                  className="form-control"
                  onChange={handleChange}
                  placeholder={information.phoneNumber}
                  required
                />
                <div className="text-center mt-3">
                  <button type="submit" className="btn btnAccept ms-2">
                    Actualizar
                  </button>
                </div>
              </form>
            </div>
          </div>
          <div className="col mt-2">
            <label className="form-label">Link de página de Facebook</label>
            <form
              className="col-12 justify-content-center d-flex"
              onSubmit={addFacebook}
            >
              <input
                type="url"
                name="facebook"
                className="form-control"
                onChange={handleChange}
                placeholder={information.facebook}
                required
              />
              <div className="text-center mt-3">
                <button type="submit" className="btn btnAccept ms-2">
                  Actualizar
                </button>
              </div>
            </form>
          </div>
          <div className="col mt-2">
            <label className="form-label">Link de página de Instagram</label>
            <form
              className="col-12 justify-content-center d-flex"
              onSubmit={addInstagram}
            >
              <input
                type="url"
                name="instagram"
                className="form-control"
                onChange={handleChange}
                placeholder={information.instagram}
                required
              />
              <div className="text-center mt-3">
                <button type="submit" className="btn btnAccept ms-2">
                  Actualizar
                </button>
              </div>
            </form>
          </div>
          <div className="col mt-3">
            <label className="form-label">
              Ingresar información acerca de la tienda
            </label>
            <form
              className="col-12 justify-content-center d-flex"
              onSubmit={addAboutUs}
            >
              <textarea
                className="form-control"
                rows="3"
                name="aboutUs"
                onChange={handleChange}
                placeholder={information.aboutUs}
                required
              />
              <div className="text-center mt-3">
                <button type="submit" className="btn btnAccept ms-2">
                  Actualizar
                </button>
              </div>
            </form>
          </div>
          <div className="col mt-3">
            <label className="form-label">
              Ingresar detalles acerca de la tienda
            </label>
            <form
              className="col-12 justify-content-center d-flex"
              onSubmit={addDetails}
            >
              <textarea
                className="form-control"
                rows="3"
                name="extraInfo"
                onChange={handleChange}
                placeholder={information.extraInfo}
                required
              />
              <div className="text-center mt-3">
                <button type="submit" className="btn btnAccept ms-3">
                  Actualizar
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
export default AddInformation;
