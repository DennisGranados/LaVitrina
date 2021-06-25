import React, { useState } from "react";
import firebase from "firebase";
import "firebase/auth";
import { useAuth, useUser } from "reactfire";

function AdminDeleteAccount(props) {
  const auth = useAuth();
  const actualUser = useUser();
  const [user, setUser] = useState({
    password: "",
  });

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const deleteAccount = (e) => {
    e.preventDefault();

    let cred = firebase.auth.EmailAuthProvider.credential(
      actualUser.data.email,
      user.password
    );

    auth.currentUser.reauthenticateWithCredential(cred).then(() => {
      auth.currentUser
        .delete()
        .then(() => {
          props.setPopup("Información", "Usuario eliminado.");
          props.openPopup();
        })
        .catch((error) => {
          props.setPopup(error.code, error.message);
          props.openPopup();
        });
      e.target.reset();
    });
  };

  return (
    <div>
      <div className="col-12 justify-content-center dflex">
        <div className="card col-5">
          <div className="card-body">
            <h4 className="text-center mb-4">
              Eliminar cuenta administrativa
            </h4>
            <form id="loginForm" onSubmit={deleteAccount}>
              <label className="form-label">
                Está a punto de eliminar la cuenta asignada a{" "}
                <strong>{actualUser.data.email}</strong>
              </label>
              <label className="form-label topMargin">
                Ingrese su contraseña
              </label>
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
                <button
                  type="submit"
                  className="btn btn-primary topMargin mx-2"
                >
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
    </div>
  );
}
export default AdminDeleteAccount;
