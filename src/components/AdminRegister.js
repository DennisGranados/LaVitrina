import React, { Component } from "react";

class AdminRegister extends Component {
  render() {
    return (
      <div className="col-12 justify-content-center dflex">
        <div className="card col-5">
          <div className="card-body">
            <form>
              <label for="inputEmail" className="form-label">
                Correo electrónico
              </label>
              <input type="email" className="form-control" id="inputEmail" />
              <label for="inputPassword" className="form-label topMargin">
                Contraseña
              </label>
              <input
                type="password"
                className="form-control"
                id="inputPassword"
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
                required
              />
              <button type="submit" className="btn btn-primary topMargin">
                Registrar
              </button>
            </form>
          </div>
        </div>
        </div>
    );
  }
}

export default AdminRegister;
