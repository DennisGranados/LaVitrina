import React, { Component } from "react";
import firebase from "firebase/app";
import "firebase/auth";

class AdminLogin extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
    };

    this.ChangeEmail = this.ChangeEmail.bind(this);
    this.ChangePassword = this.ChangePassword.bind(this);
    this.LoginFunction = this.LoginFunction.bind(this);
  }

  ChangeEmail(event) {
    this.setState({ email: event.target.value });
  }

  ChangePassword(event) {
    this.setState({ password: event.target.value });
  }

  LoginFunction(event) {
    event.preventDefault();
    this.LoginFunction();
  }

  LoginFunction(props) {
    firebase
      .auth()
      .signInWithEmailAndPassword(this.state.email, this.state.password)
      .then((userCredential) => {
        // Signed in
        var user = userCredential.user;
      })
      .catch((error) => {
        props.setPopup(error.code);
        props.openPopup();
      });
  }

  render() {
    return (
      <div className="col-12 justify-content-center dflex">
        <div className="card col-5">
          <div className="card-body">
            <form id="loginForm" onSubmit={this.LoginFunction}>
              <label className="form-label">Correo electrónico</label>
              <input
                type="email"
                className="form-control"
                id="inputEmail"
                onChange={this.ChangeEmail}
                required
              />
              <label className="form-label topMargin">Contraseña</label>
              <input
                type="password"
                className="form-control"
                id="inputPassword"
                minLength="8"
                onChange={this.ChangePassword}
                required
              />
              <button type="submit" className="btn btn-primary topMargin">
                Aceptar
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default AdminLogin;
