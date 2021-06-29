import React, { useState } from "react";
import { remoteConfig } from "reactfire";

function Item() {
  return (
    <div>
      <div className="dropdown">
        <button
          className="btn btn-secondary dropdown-toggle"
          type="button"
          id="categories"
          data-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded="false"
        >
          Categorías
        </button>
        <div className="dropdown-menu " aria-labelledby="categories">
          <p className="card-text text-center fw-bold">
            Color
            <button className="dropdown-item" type="button">
              Verde
            </button>
            <button className="dropdown-item" type="button">
              Rojo
            </button>
            <button className="dropdown-item" type="button">
              Azul
            </button>
            <button className="dropdown-item" type="button">
              Amarillo
            </button>
            <li>
              <hr className="dropdown-divider"></hr>
            </li>
            Tallas
            <button className="dropdown-item" type="button">
              S
            </button>
            <button className="dropdown-item" type="button">
              M
            </button>
            <button className="dropdown-item" type="button">
              L
            </button>
            <button className="dropdown-item" type="button">
              XL
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Item;
