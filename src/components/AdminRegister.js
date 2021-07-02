import React, { useState } from "react";
import "firebase/auth";
import { useFirestore, useAuth } from "reactfire";

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

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const registerUser = (e) => {
    e.preventDefault();

    if (user.password === user.secondPassword) {
      auth
        .createUserWithEmailAndPassword(
          user.email.trim().toLowerCase(),
          user.password
        )
        .then(() => {
          adminRef.get().then((snapshot) => {
            let actualCounter = snapshot.data().counter;
            adminRef
              .set({ counter: actualCounter + 1 })
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
      <div className="col-12 justify-content-center d-flex">
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

export default AdminRegister;
