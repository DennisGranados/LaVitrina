import React, { useEffect, useState } from "react";
import { useFirestore, useFirestoreDocData } from "reactfire";

function AddInformation(props) {
  const contacts = props.data;
  const firestore = useFirestore();
  const aboutRef = firestore.collection("webpage").doc("about_us");
  const contactsRef = firestore.collection("webpage").doc("contacts");
  let { status, data } = useFirestoreDocData(contactsRef);
  const [information, setInformation] = useState({
    email: "",
    facebook: "",
    instagram: "",
    phone_number: "",
    aboutUs: "",
    extraInfo: "",
  });

  useEffect(() => {
    if (status === "success") {
      console.log(contacts.phone_number);

      aboutRef.get().then((snapshot) => {
        let aboutUs = snapshot.data().about_us;
        let extraInfo = snapshot.data().extra_info;

        setInformation({
          ...information,
          aboutUs: aboutUs,
          extraInfo: extraInfo,
        });
      });
    }
  }, [status, data]);

  const handleChange = (e) => {
    setInformation({
      ...information,
      [e.target.name]: e.target.value,
    });
  };

  const addEmail = (e) => {
    e.preventDefault();
    contactsRef
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

  const addphone_number = (e) => {
    e.preventDefault();
    contactsRef
      .update({
        phone_number: information.phone_number,
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
    contactsRef
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
    contactsRef
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
                  placeholder={contacts.email}
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
                onSubmit={addphone_number}
              >
                <input
                  type="number"
                  name="phone_number"
                  className="form-control"
                  onChange={handleChange}
                  placeholder={contacts.phone_number}
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
                placeholder={contacts.facebook}
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
                placeholder={contacts.instagram}
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
