import React, { Component } from "react";

function Catalog() {
  return (
    <div className="col-12 mb-3 d-flex">
      <div className="dropdown">
        <button className="btn btn-secondary dropdown-toggle" type="button"  id="categories" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          Categorías
        </button>
        <div className="dropdown-menu " aria-labelledby="categories" >
        <p className="card-text text-center fw-bold" >
          Tipo de prenda   
          <button className="dropdown-item" type="button">Vestidos</button>
          <button className="dropdown-item" type="button">Pantalones</button>
          <button className="dropdown-item" type="button">Blusas</button>
          <li><hr class="dropdown-divider"></hr></li> 
          Color
          <button className="dropdown-item" type="button">Verde</button>
          <button className="dropdown-item" type="button">Rojo</button>
          <button className="dropdown-item" type="button">Azul</button>
          <button className="dropdown-item" type="button">Amarillo</button>
          <li><hr class="dropdown-divider"></hr></li>
          Tallas
          <button className="dropdown-item" type="button">S</button>
          <button className="dropdown-item" type="button">M</button>
          <button className="dropdown-item" type="button">L</button>
          <button className="dropdown-item" type="button">XL</button>
          </p>
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
