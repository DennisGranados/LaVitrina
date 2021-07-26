/**
 * @fileoverview Header, is the component that shows the main navigation of the page.

 * @version 1.0
 * @author Carlos Cabezas Fallas
 * @author Denilson Granados Solano
 * @author Jahel Jiménez Porras
 * @author Jonathan Orozco Pérez 
 * @author María Ramírez Hernández
 * History
 * v1.0 – Initial Release
 * ----
 * The first version of Header page was written by Carlos Cabezas, Denilson Granados, 
 * Jahel Jiménez, Jonathan Orozco, María Ramírez.
 */
import React from "react";
import logo from "../Logo.png";
import { Link } from "react-router-dom";

function Header() {
  return (
      <div className="col-12 backgroundHeader headerFormat text-center">
        <Link to="/">
          <img src={logo} className="logo" alt="Logo La Vitrina"></img>
        </Link>
      </div>
  );
}

export default Header;
