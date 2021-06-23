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

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const loginUser = (e) => {
    e.preventDefault();

    auth.setPersistence(firebase.auth.Auth.Persistence.SESSION).then(() => {
      auth
        .signInWithEmailAndPassword(user.email.trim().toLowerCase(), user.password)
        .then()
        .catch((error) => {
          props.setPopup(error.code);
          props.openPopup();
        });
    });
  };

  return (
    <div className="col-12 justify-content-center dflex">
      <div className="card col-5">
        <div className="card-body">
          <form id="loginForm" onSubmit={loginUser}>
            <label className="form-label">Correo electrónico</label>
            <input
              type="email"
              name="email"
              className="form-control"
              id="inputEmail"
              onChange={handleChange}
              required
            />
            <label className="form-label topMargin">Contraseña</label>
            <input
              type="password"
              name="password"
              className="form-control"
              id="inputPassword"
              minLength="8"
              onChange={handleChange}
              required
            />
            <div className="text-center">
              <button type="submit" className="btn btn-primary topMargin mx-2">
                Aceptar
              </button>
              <button type="reset" className="btn btn-warning topMargin mx-2">
                Limpiar
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
export default AdminLogin;