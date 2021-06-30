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
  };

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
  };

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
  };

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
  };

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
  };

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
  };

  function generateInformation() {
    contactRef.get().then((snapshot) => {
      let email = snapshot.data().email;
      let phoneNumber = snapshot.data().phone_numbers;
      let facebook = snapshot.data().facebook;
      let instagram = snapshot.data().instagram;

      setInformation({
        ...information,
        phoneNumber: phoneNumber,
        email: email,
        facebook: facebook,
        instagram: instagram,
      });
    });

    aboutRef.get().then((snapshot) => {
      let aboutUs = snapshot.data().about_us;
      let extraInfo = snapshot.data().extra_Info;

      setInformation({
        ...information,
        aboutUs: aboutUs,
        extraInfo: extraInfo,
      });
    });
  }

  return (
    <div className="col-12 d-flex justify-content-center">
      <div className="card" id="card-submit">
        {generateInformation()}
        <div className="card-body">
          <h4 className="text-center mb-4">Ingresar información de contacto</h4>
          <div className="row">
            <div className="col">
              <label className="form-label">Correo electrónico</label>
              <form
                className="col-12 d-flex"
                onSubmit={addEmail}
              >
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
                className="col-12 justify-content-center dflex"
                onSubmit={addPhoneNumber}
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
              className="col-12 justify-content-center dflex"
              onSubmit={addFacebook}
            >
              <input
                type="text"
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
              className="col-12 justify-content-center dflex"
              onSubmit={addInstagram}
            >
              <input
                type="text"
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
              className="col-12 justify-content-center dflex"
              onSubmit={addAboutUs}
            >
              <textarea
                className="form-control"
                rows="3"
                name="aboutUs"
                className="form-control"
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
              className="col-12 justify-content-center dflex"
              onSubmit={addDetails}
            >
              <textarea
                className="form-control"
                rows="3"
                name="extraInfo"
                className="form-control"
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
