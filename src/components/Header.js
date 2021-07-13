import React from "react";
import logo from "../Logo.png";

function Header() {
  return (
    <div className="col-12 backgroundHeader text-center">
      <img src={logo} alt="Logo La Vitrina" width="200px"></img>
    </div>
  );
}

export default Header;
