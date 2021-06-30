import React, { useState } from "react";
import { useFirestore } from "reactfire";

function AddInformation(props) {
  const firestore = useFirestore();
  const aboutRef = firestore.collection("webpage").doc("about_us");
  const contactRef = firestore.collection("webpage").doc("contacts");
  const [information, setInformation] = useState({
    email: "",
    facebook: "",
    instagram: "",
    phoneNumber: "",
    aboutUs: "",
    extraInfo: "",
  });

  const handleChange = (e) => {
    setInformation({
      ...information,
      [e.target.name]: e.target.value,
    });
  };

  const addEmail = (e) => {
    e.preventDefault();
    contactRef
      .update({
        email: information.email,
      })
      .then(function () {
        props.setPopup(
          "Confirmación",
          "Se ha agregado la información con exito."
        );
        props.openPopup();
        e.target.reset();
      });
  }

  const addPhoneNumber = (e) => {
    e.preventDefault();
    contactRef
      .update({
        phone_numbers: information.phoneNumber,
      })
      .then(function () {
        props.setPopup(
          "Confirmación",
          "Se ha agregado la información con exito."
        );
        props.openPopup();
        e.target.reset();
      });
  }

  const addFacebook = (e) => {
    e.preventDefault();
    contactRef
      .update({
        facebook: information.facebook,
      })
      .then(function () {
        props.setPopup(
          "Confirmación",
          "Se ha agregado la información con exito."
        );
        props.openPopup();
        e.target.reset();
      });
  }

  const addInstagram = (e) => {
    e.preventDefault();
    contactRef
      .update({
        instagram: information.instagram,
      })
      .then(function () {
        props.setPopup(
          "Confirmación",
          "Se ha agregado la información con exito."
        );
        props.openPopup();
        e.target.reset();
      });
  }

  const addAboutUs = (e) => {
    e.preventDefault();
    aboutRef
      .update({
        about_us: information.aboutUs,
      })
      .then(function () {
        props.setPopup(
          "Confirmación",
          "Se ha agregado la información con exito."
        );
        props.openPopup();
        e.target.reset();
      });
  }

  const addDetails = (e) => {
    e.preventDefault();
    aboutRef
      .update({
        extra_info: information.extraInfo,
      })
      .then(function () {
        props.setPopup(
          "Confirmación",
          "Se ha agregado la información con exito."
        );
        props.openPopup();
        e.target.reset();
      });
  }

  return (
    <div className="card" id="card-submit">
      <div className="card-body">
        <h4 className="text-center mb-4">Ingresar información de contacto</h4>
        <div className="row">
          <div className="col">
            <label className="form-label">Correo electrónico</label>
            <form className="col-12 justify-content-center dflex" onSubmit={addEmail}>
              <input
                type="email"
                name="email"
                className="form-control"
                onChange={handleChange}
                placeholder="text@gmail.com"
                required
              />
              <div className="text-center mt-3">
                <button type="submit" className="btn raisePrimary btnAccept">
                  Actualizar
                </button>
              </div>
            </form>
          </div>
          <div className="col">
            <label className="form-label">Número telefónico</label>
            <form className="col-12 justify-content-center dflex" onSubmit={addPhoneNumber}>
              <input
                type="number"
                name="phoneNumber"
                className="form-control"
                onChange={handleChange}
                placeholder="88888888"
                required
              />
              <div className="text-center mt-3">
                <button type="submit" className="btn raisePrimary btnAccept">
                  Actualizar
                </button>
              </div>
            </form>
          </div>
        </div>
        <div className="col mt-2">
          <label className="form-label">Link de página de Facebook</label>
          <form className="col-12 justify-content-center dflex" onSubmit={addFacebook}>
            <input
              type="text"
              name="facebook"
              className="form-control"
              onChange={handleChange}
              placeholder="https://www.facebook.com/example"
              required
            />
            <div className="text-center mt-3">
              <button type="submit" className="btn raisePrimary btnAccept">
                Actualizar
              </button>
            </div>
          </form>
        </div>
        <div className="col mt-2">
          <label className="form-label">Link de página de Instagram</label>
          <form className="col-12 justify-content-center dflex" onSubmit={addInstagram}>
            <input
              type="text"
              name="instagram"
              className="form-control"
              onChange={handleChange}
              placeholder="https://www.instagram.com/example/?hl=es-la"
              required
            />
            <div className="text-center mt-3">
              <button type="submit" className="btn raisePrimary btnAccept">
                Actualizar
              </button>
            </div>
          </form>
        </div>
        <div className="col mt-3">
          <label className="form-label">Ingresar información acerca de la tienda</label>
          <form className="col-12 justify-content-center dflex" onSubmit={addAboutUs}>
            <textarea className="form-control" rows="3" name="aboutUs" className="form-control" onChange={handleChange} required />
            <div className="text-center mt-3">
              <button type="submit" className="btn raisePrimary btnAccept">
                Actualizar
              </button>
            </div>
          </form>
        </div>
        <div className="col mt-3">
          <label className="form-label">Ingresar detalles acerca de la tienda</label>
          <form className="col-12 justify-content-center dflex" onSubmit={addDetails}>
            <textarea className="form-control" rows="3" name="extraInfo" className="form-control" onChange={handleChange} required />
            <div className="text-center mt-3">
              <button type="submit" className="btn raisePrimary btnAccept">
                Actualizar
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
export default AddInformation;
