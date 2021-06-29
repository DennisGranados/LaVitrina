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

  const addInformation= (e) => {
    e.preventDefault();

    aboutRef
      .set({
        about_us: information.aboutUs,
        extra_Info: information.extraInfo,
      })
      .then(() => {
        contactRef
          .set({
            email: information.email,
            phone_numbers: information.phoneNumber,
            facebook: information.facebook,
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
      });
  }

  return (
    <form className="col-12 justify-content-center dflex" onSubmit={addInformation}>
      <div className="card" id="card-submit">
        <div className="card-body">
          <h4 className="text-center mb-4">Ingresar información de contacto</h4>
          <div className="row">
            <div className="col">
              <label className="form-label">Correo electrónico</label>
              <input
                type="email"
                name="email"
                className="form-control"
                onChange={handleChange}
                placeholder="text@gmail.com"
                required
              />
            </div>
            <div className="col">
              <label className="form-label">Número telefónico</label>
              <input
                type="number"
                name="phoneNumber"
                className="form-control"
                onChange={handleChange}
                placeholder="88888888"
                required
              />
            </div>
          </div>
          <div className="col mt-2">
            <label className="form-label">Link de página de Facebook</label>
            <input
              type="text"
              name="facebook"
              className="form-control"
              onChange={handleChange}
              placeholder="https://www.facebook.com/example"
              required
            />
          </div>
          <div className="col mt-2">
            <label className="form-label">Link de página de Instagram</label>
            <input
              type="text"
              name="instagram"
              className="form-control"
              onChange={handleChange}
              placeholder="https://www.instagram.com/example/?hl=es-la"
              required
            />
          </div>
          <div className="col mt-3">
            <label className="form-label">Ingresar información acerca de la tienda</label>
            <textarea className="form-control" rows="3" name="aboutUs" className="form-control" onChange={handleChange} required />
          </div>
          <div className="col mt-3">
            <label className="form-label">Ingresar detalles acerca de la tienda</label>
            <textarea className="form-control" rows="3" name="extraInfo" className="form-control" onChange={handleChange} required />
          </div>
          <div className="text-center mt-3">
            <button type="submit" className="btnAccept">
              Aceptar
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}
export default AddInformation;
