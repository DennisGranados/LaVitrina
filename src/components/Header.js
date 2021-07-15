import React from "react";
import logo from "../Logo.png";
import { Link } from 'react-router-dom';

function Header() {
  return (
    <div className="col-12 backgroundHeader text-center">
      <Link to="/"><img src={logo} alt="Logo La Vitrina" width="200px"></img></Link>
    </div>
  );
}

export default Header;
