import React, { Component } from "react";
import Register from "./AdminRegister";
import Login from "./AdminLogin";
import Home from "./Home";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import "../prueba.css";

class PrimaryNav extends Component {
  render() {
    return (
      <div>
        <Header/>
      <Router>
        <div>
        <nav className="col-12 navBackground">
            <ul className="navbar navbar-dark col-3">
              <li className="btn">
                <Link to="/" className="noHype">Inicio</Link>
              </li>
              <li className="btn">
                <Link to="/login" className="noHype">Inicio de sesión</Link>
              </li>
              <li className="btn">
                <Link to="/register" className="noHype">Registro</Link>
              </li>
            </ul>
          </nav>
        </div>

        <Switch>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/register">
            <Register />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </Router>
      <Footer/>
      </div>
    );
  }
}

export default PrimaryNav;
