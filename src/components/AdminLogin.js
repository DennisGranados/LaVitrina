import React, { Component } from "react";

class AdminLogin extends Component {
  render() {
    return (
      <div className="col-12 justify-content-center dflex">
        <div className="card col-5">
          <div className="card-body">
            <form>
              <label for="inputEmail" className="form-label">
                Correo electrónico
              </label>
              <input
                type="email"
                className="form-control"
                id="inputEmail"
                required
              />
              <label for="inputPassword" className="form-label topMargin">
                Contraseña
              </label>
              <input
                type="password"
                className="form-control"
                id="inputPassword"
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
