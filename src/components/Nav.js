import React from "react";
import { Link } from "react-router-dom";
import { useAuth, useUser } from "reactfire";

function Nav() {
  const { data: user } = useUser();
  const auth = useAuth();

  let logged;

  const signOut = (e) => {
    auth.signOut();
  };

  if (!user) {
    logged = (
      <div>
        <nav className="col-12 navBackground">
          <ul className="navbar navbar-dark col-5">
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
        </nav>
      </div>
    );
  } else {
    logged = (
      <div>
        <nav className="col-12 navbar navbar-expand-lg navBackground">
            <div class="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav">
                <li className="nav-item">
                  <Link to="/" className="btn noHype navHover">
                    Inicio
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/admin" className="btn noHype navHover">
                    Sitio administrativo
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/about-us" className="btn noHype navHover">
                    Acerca de
                  </Link>
                </li>
                <button
                  className="btn navHover noHype"
                  onClick={signOut}
                >
                  Desconectar
                </button>
              </ul>
            </div>
        </nav>
      </div>
    );
  }
  return <div>{logged}</div>;
}

export default Nav;
