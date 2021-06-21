import React, { Component } from "react";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="col-12 justify-content-center d-flex mb-3">
      <div className="mt-2">
        <div className="card">
          <img
            src="https://www.ago2.com/wp-content/uploads/2017/07/INTERSPORT_06.jpg"
            className="card-img-top"
          />
          <div className="card-body">
            <h5 className="card-title text-center">Catálogo</h5>
            <p className="card-text text-center">
              Aqui podrá encontrar toda la colección de prendas a su disposición
            </p>
            <div className="text-center">
              <Link to="/catalog" id="home" className="noHype">
                <button className="btn btn-primary px-5">Ver</button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
