import React, { Component } from "react";
import firebase from "firebase/app";
import "firebase/auth";

class AdminRegister extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      secondPasword: "",
    };

    this.ChangeEmail = this.ChangeEmail.bind(this);
    this.ChangePassword = this.ChangePassword.bind(this);
    this.ChangeSecondPassword = this.ChangeSecondPassword.bind(this);
    this.RegisterFunction = this.RegisterFunction.bind(this);
  }

  ChangeEmail(event) {
    this.setState({ email: event.target.value });
  }

  ChangePassword(event) {
    this.setState({ password: event.target.value });
  }

  ChangeSecondPassword(event) {
    this.setState({ secondPassword: event.target.value });
  }

  RegisterFunction(event) {
    event.preventDefault();
  }

  RegisterProcess() {
   // if (this.state.password.localeCompare(this.state.secondPasword)) {
      firebase
        .auth()
        .createUserWithEmailAndPassword(this.state.email, this.state.password)
        .then((ucredential)=> {
          var user = ucredential.user;
          console.log(user);
        }).catch((error)=>{
          console.log(error.message);
        })
    //}
  }

  render() {
    return (
      <div className="col-12 justify-content-center dflex">
        <div className="card col-5">
          <div className="card-body">
            <form id="registerForm" onSubmit={this.RegisterFunction}>
              <label for="inputEmail" className="form-label">
                Correo electrónico
              </label>
              <input
                type="email"
                className="form-control"
                id="inputEmail"
                value={this.state.email}
                onChange={this.ChangeEmail}
              />
              <label for="inputPassword" className="form-label topMargin">
                Contraseña
              </label>
              <input
                type="password"
                className="form-control"
                id="inputPassword"
                value={this.state.password}
                onChange={this.ChangePassword}
                required
              />
              <label
                for="inputConfirmPassword"
                className="form-label topMargin"
              >
                Confirme contraseña
              </label>
              <input
                type="password"
                className="form-control"
                id="inputConfirmPassword"
                //value={this.state.secondPasword}
                //onChange={this.ChangeSecondPassword}
                
              />
              <input type="submit" className="btn btn-primary topMargin" value="Registrar"/>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default AdminRegister;
