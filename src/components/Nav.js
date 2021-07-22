/**
 * @fileoverview Nav, component that shows the different navigation options of the user.
 * @version 1.0
 * @author Carlos Cabezas Fallas
 * @author Denilson Granados Solano
 * @author Jahel Jiménez Porras
 * @author Jonathan Orozco Pérez 
 * @author María Ramírez Hernández
 * History
 * v1.0 – Initial Release
 * ----
 * The first version of Nav was written by Carlos Cabezas, Denilson Granados, 
 * Jahel Jiménez, Jonathan Orozco, María Ramírez.
 */
import React from "react";
import { Link } from "react-router-dom";
import { useAuth, useUser } from "reactfire";

function Nav() {
  const { data: user } = useUser();
  const auth = useAuth();

  let logged;

  // This method is responsible for closing the user's session.
  const signOut = (e) => {
    auth.signOut();
  };

  if (!user) {
    logged = (
      <nav className="navbar navbar-expand-lg navbar-light navBackground">
        <div className="container-fluid">
          <a />
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="btn">
                <Link to="/" className="btn noHype navHover">
                  Inicio
                </Link>
              </li>
              <li className="btn">
                <Link to="/admin" className="btn noHype navHover">
                  Sitio administrativo
                </Link>
              </li>
              <li className="btn">
                <Link to="/about-us" className="btn noHype navHover">
                  Acerca de
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    );
  } else {
    logged = (
      <nav className="navbar navbar-expand-lg navbar-light navBackground">
        <div className="container-fluid">
          <a />
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="btn">
                <Link to="/" className="btn noHype navHover">
                  Inicio
                </Link>
              </li>
              <li className="btn">
                <Link to="/admin" className="btn noHype navHover">
                  Sitio administrativo
                </Link>
              </li>
              <li className="btn">
                <Link to="/about-us" className="btn noHype navHover">
                  Acerca de
                </Link>
              </li>
              <button className="btn navHover noHype" onClick={signOut}>
                Desconectar
              </button>
            </ul>
          </div>
        </div>
      </nav>
    );
  }
  return <div>{logged}</div>;
}

export default Nav;
