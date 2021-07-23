/**
 * @fileoverview AdminLogin page, manage the administrative users login.
 * @version 1.0
 * @author Carlos Cabezas Fallas
 * @author Denilson Granados Solano
 * @author Jahel Jiménez Porras
 * @author Jonathan Orozco Pérez
 * @author María Ramírez Hernández
 * History
 * v1.0 – Initial Release
 * ----
 * The first version of AdminLogin page was written by Carlos Cabezas, Denilson Granados,
 * Jahel Jiménez, Jonathan Orozco, María Ramírez.
 */
import React, { useState } from "react";
import firebase from "firebase";
import "firebase/auth";
import { useAuth } from "reactfire";

function AdminLogin(props) {
  const auth = useAuth();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  // This method set the user.
  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value.trim(),
    });
  };

  // This method is responsible for the login.
  const loginUser = (e) => {
    e.preventDefault();

    auth.setPersistence(firebase.auth.Auth.Persistence.SESSION).then(() => {
      auth
        .signInWithEmailAndPassword(user.email.toLowerCase(), user.password)
        .then()
        .catch((error) => {
          props.setPopup(error.code);
          props.openPopup();
        });
    });
  };

  return (
    <div>
      <div className="col-12 justify-content-center d-flex mt-3">
        <div className="card col-5">
          <div className="card-body">
            <h4 className="text-center mb-4">Iniciar sesión</h4>
            <form id="loginForm" onSubmit={loginUser}>
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
export default AdminLogin;
