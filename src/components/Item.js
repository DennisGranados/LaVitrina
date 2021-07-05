import React from "react";

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
          Tallas
        </button>
        <div className="dropdown-menu " aria-labelledby="categories">
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
        </div>
      </div>
      <div className="dropdown">
        <button
          className="btn btn-secondary dropdown-toggle"
          type="button"
          id="categories"
          data-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded="false"
        >
          Color
        </button>
        <div className="dropdown-menu " aria-labelledby="categories">
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
        </div>
      </div>
    </div>

    
  );
}
export default Item;
