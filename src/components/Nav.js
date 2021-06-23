import { render } from "@testing-library/react";
import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { useAuth, useUser } from "reactfire";

function Nav() {

  const { data: user } = useUser();
  const auth = useAuth();

  let logged;

  const signOut = (e) => {
    auth.signOut();
  }
  
  if (!user) {
    logged = (
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
  } else {
    logged = (
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
            <button className="btn" onClick={signOut}>
              Desconectar
            </button>
          </ul>
        </nav>
      </div>
    );
  }
  return <div>{logged}</div>;
}

export default Nav;