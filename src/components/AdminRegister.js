/**
 * @fileoverview AdminRegister page, manage the register of administrative users to the website.
 * @version 1.0
 * @author Carlos Cabezas Fallas
 * @author Denilson Granados Solano
 * @author Jahel Jiménez Porras
 * @author Jonathan Orozco Pérez
 * @author María Ramírez Hernández
 * History
 * v1.0 – Initial Release
 * ----
 * The first version of AdminRegister page was written by Carlos Cabezas, Denilson Granados,
 * Jahel Jiménez, Jonathan Orozco, María Ramírez.
 */

import React, { useState } from "react";
import "firebase/auth";
import { useFirestore, useAuth } from "reactfire";
import firebase from "firebase";

function AdminRegister(props) {
  const auth = useAuth();
  const firestore = useFirestore();
  const adminRef = firestore.collection("admin").doc("admins");
  const [user, setUser] = useState({
    email: "",
    password: "",
    secondPassword: "",
    actualCounter: "",
  });

  // This method set the user.
  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value.trim(),
    });
  };

  // This method is responsible for the register of the user.
  const registerUser = (e) => {
    e.preventDefault();

    if (user.password === user.secondPassword) {
      auth
        .createUserWithEmailAndPassword(user.email.toLowerCase(), user.password)
        .then(() => {
          adminRef
            .update({ counter: firebase.firestore.FieldValue.increment(1) })
            .then(() => {
              props.setPopup(
                "¡Alerta!",
                "El usuario ha sido registrado con éxito."
              );
              props.openPopup();
              e.target.reset();
            })
            .catch((error) => {
              props.setPopup(error.code);
              props.openPopup();
            });
        })
        .catch((error) => {
          props.setPopup(error.code);
          props.openPopup();
        });
    } else {
      props.setPopup("auth/non-identical-passwords");
      props.openPopup();
    }
  };

  return (
    <div>
      <div className="col-12 justify-content-center d-flex mt-3">
        <div className="card col-5">
          <div className="card-body">
            <h4 className="text-center mb-4">Añadir cuenta administrativa</h4>
            <form id="registerForm" onSubmit={registerUser}>
              <label className="form-label">Correo electrónico</label>
              <input
                type="email"
                name="email"
                className="form-control"
                onChange={handleChange}
                required
              />
              <label className="form-label topMargin">Contraseña</label>
              <input
                type="password"
                name="password"
                className="form-control"
                minLength="8"
                onChange={handleChange}
                required
              />
              <label className="form-label topMargin">
                Confirme contraseña
              </label>
              <input
                type="password"
                name="secondPassword"
                className="form-control"
                minLength="8"
                onChange={handleChange}
                required
              />
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

export default AdminRegister;
