import React, { Component } from "react";

function Catalog() {
  return (
    <div className="col-12 mb-3 d-flex">

      <div class="dropdown">
        <button class="btn btn-secondary dropdown-toggle" type="button" id="categories" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          Categorías
        </button>
        <div class="dropdown-menu" aria-labelledby="categories">
          <button class="dropdown-item" type="button">Action</button>
          <button class="dropdown-item" type="button">Another action</button>
          <button class="dropdown-item" type="button">Something else here</button>
        </div>
      </div>

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

export default Catalog;
