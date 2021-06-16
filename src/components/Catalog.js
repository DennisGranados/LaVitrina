import React, { Component } from "react";

class Catalog extends Component {
  render() {
    return (
      <div>
        <div className="col-3 m-auto">
          <div className="card">
            <img
              src="https://i.pinimg.com/originals/ef/fd/4e/effd4edbc9326c98ae2ad16fb263680e.jpg"
              className="card-img-top"
            ></img>
            <div className="card-body">
              <h5 className="card-title">Blusas</h5>
              <a href="#" className="btn btn-primary">
                Ingresar
              </a>
            </div>
          </div>
        </div>
        <div className="col-3 m-auto">
          <div className="card">
            <img
              src="https://i.pinimg.com/originals/ef/fd/4e/effd4edbc9326c98ae2ad16fb263680e.jpg"
              className="card-img-top"
            ></img>
            <div className="card-body">
              <h5 className="card-title">Vestidos</h5>
              <a href="#" className="btn btn-primary">
                Ingresar
              </a>
            </div>
          </div>
        </div>
        <div className="col-3 m-auto">
          <div className="card">
            <img
              src="https://i.pinimg.com/originals/ef/fd/4e/effd4edbc9326c98ae2ad16fb263680e.jpg"
              className="card-img-top"
            ></img>
            <div className="card-body">
              <h5 className="card-title">Pantalones</h5>
              <a href="#" className="btn btn-primary">
                Ingresar
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Catalog;
