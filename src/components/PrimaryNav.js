import React, { Component } from "react";
import Register from "./AdminRegister";
import Login from "./AdminLogin";
import Home from "./Home";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

class PrimaryNav extends Component {
  render() {
    return (
      <Router>
        <div>
          <nav>
            <ul>
              <li>
                <Link to="/">Inicio</Link>
              </li>
              <li>
                <Link to="/login">Inicio de sesión</Link>
              </li>
              <li>
                <Link to="/register">Registro</Link>
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
    );
  }
}

export default PrimaryNav;
