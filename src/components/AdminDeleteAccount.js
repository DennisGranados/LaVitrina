import React, { useState } from "react";
import firebase from "firebase";
import "firebase/auth";
import { useAuth, useFirestore, useUser } from "reactfire";

function AdminDeleteAccount(props) {
  const auth = useAuth();
  const firestore = useFirestore();
  const actualUser = useUser();
  const adminRef = firestore.collection("admin").doc("admins");
  const [user, setUser] = useState({
    password: "",
    secondPassword: "",
    actualCounter: "",
  });

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const deleteAccount = (e) => {
    e.preventDefault();

    if (user.password === user.secondPassword) {
      adminRef.get().then((snapshot) => {
        let actualCounter = snapshot.data().counter;
        if (actualCounter > 1) {
          let cred = firebase.auth.EmailAuthProvider.credential(
            actualUser.data.email,
            user.password
          );
          adminRef.set({ counter: actualCounter - 1 }).then(() => {
            auth.currentUser
              .reauthenticateWithCredential(cred)
              .then(() => {
                auth.currentUser
                  .delete()
                  .then(() => {
                    props.setPopup("Información", "Usuario eliminado.");
                    props.openPopup();
                  })
                  .catch((error) => {
                    props.setPopup(error.code);
                    props.openPopup();
                  });
              })
              .catch((error) => {
                props.setPopup(error.code, error.message);
                props.openPopup();
              });
            e.target.reset();
          });
        } else {
          props.setPopup("auth/only-account");
          props.openPopup();
        }
      });
    } else {
      props.setPopup("auth/non-identical-passwords");
      props.openPopup();
    }
  };

  return (
    <div>
      <div className="col-12 justify-content-center dflex">
        <div className="card col-5">
          <div className="card-body">
            <h4 className="text-center mb-4">Eliminar cuenta administrativa</h4>
            <form id="loginForm" onSubmit={deleteAccount}>
              <label className="form-label">
                {actualUser.data.email !== null ? (
                  <p>
                    Está a punto de eliminar la cuenta asignada a{" "}
                    <strong>{actualUser.data.email}</strong>
                  </p>
                ) : (
                  "No hay cuenta registrada."
                )}
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
                <button
                  type="submit"
                  className="btn btnAccept topMargin mx-2"
                >
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
export default AdminDeleteAccount;
