import React, { Component } from "react";

class Footer extends Component {
  render() {
    return (
      <div className="col-12 backgroundHeader mt-4">
        <div className="row mt-4">
        <div className="col-6 text-center">
          <h4>Otros datos</h4>
        </div>

        <div className="col-6 text-center">
          <div>
            <h4>Métodos de contacto</h4>
            <p>Número de telefono</p>
            <p>Correo Electrónico</p>
          </div>
        </div>
        </div>
      </div>
    );
  }
}

export default Footer;
