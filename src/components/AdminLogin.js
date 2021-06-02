import React, { Component } from "react";

class AdminLogin extends Component {
  render() {
    return (
      <div>
        <form>
          <label for="inputEmail" class="form-label">
            Correo electrónico
          </label>
          <input type="email" class="form-control" id="inputEmail" />
          <label for="inputPassword" class="form-label">
            Contraseña
          </label>
          <input type="password" class="form-control" id="inputPassword" />
          <button type="submit" className="btn btn-primary">
            Aceptar
          </button>
        </form>
      </div>
    );
  }
}

export default AdminLogin;
