import { render } from "@testing-library/react";
import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

function Nav() {
  return(
    <div>
      <nav className="col-12 navBackground">
        <ul className="navbar navbar-dark col-5">
          <li className="btn">
            <Link to="/" className="noHype">
              Inicio
            </Link>
          </li>
          <li className="btn">
            <Link to="/admin" className="noHype">
              Sitio administrativo
            </Link>
          </li>
          <li className="btn">
            <Link to="/about-us" className="noHype">
              Acerca de
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default Nav;
