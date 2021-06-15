import React, { useEffect, useState } from "react";
import "firebase/auth";
import { useAuth } from "reactfire";

function AdminRegister(props) {
  const auth = useAuth();
  const [user, setUser] = useState({
    email: "",
    password: "",
    secondPassword: "",
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
        .createUserWithEmailAndPassword(user.email.trim(), user.password)
        .then(() => {
          props.setPopup(
            "¡Alerta!",
            "El usuario ha sido registrado con éxito."
          );
          props.openPopup();
        })
        .catch((error) => {
          console.log(error);
          props.setPopup(error.code);
          props.openPopup();
        });
    } else {
      props.setPopup("auth/non-identical-passwords");
      props.openPopup();
    }
  };

  return (
    <div className="col-12 justify-content-center dflex">
      <div className="card col-5">
        <div className="card-body">
          <form id="registerForm" onSubmit={registerUser}>
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
            <label className="form-label topMargin">Confirme contraseña</label>
            <input
              type="password"
              name="secondPassword"
              className="form-control"
              id="inputPassword"
              minLength="8"
              onChange={handleChange}
              required
            />
            <input
              type="submit"
              className="btn btn-primary topMargin"
              value="Registrar"
            />
          </form>
        </div>
      </div>
    </div>
  );
}

export default AdminRegister;
