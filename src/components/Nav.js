import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

class Nav extends Component {
  render() {
      let navBar;
        navBar = (<div>
            <nav className="col-12 navBackground">
              <ul className="navbar navbar-dark col-5">
                <li className="btn">
                  <Link to="/" className="noHype">
                    Inicio
                  </Link>
                </li>
                <li className="btn">
                  <Link to="/login" className="noHype">
                    Inicio de sesión
                  </Link>
                </li>
                <li className="btn">
                  <Link to="/register" className="noHype">
                    Registro
                  </Link>
                </li>
                <li className="btn">
                  <Link to="/about-us" className="noHype">
                    Acerca de
                  </Link>
                </li>
              </ul>
            </nav>
          </div>)
     
    return (
      <div>{navBar}</div>
    );
  }
}

export default Nav;
