/**
 * @fileoverview AboutUs page, displays information about the store La Vitrina.
 * @version 1.0
 * @author Carlos Cabezas Fallas
 * @author Denilson Granados Solano
 * @author Jahel Jiménez Porras
 * @author Jonathan Orozco Pérez 
 * @author María Ramírez Hernández
 * History
 * v1.0 – Initial Release
 * ----
 * The first version of AboutUs page was written by Carlos Cabezas, Denilson Granados,
 * Jahel Jiménez, Jonathan Orozco, María Ramírez.
 */
import React from "react";

function AboutUs(props) {
  const information = props.data;

  return (
    <div>
    <div className="col-12 mb-3 d-flex">
        <div className="col-6 justify-content-center mx-3">
          <h1 className="mt-3">Acerca de La Vitrina</h1>
          <p className="paragraph">{information.aboutUs}</p>
        </div>
        <div className="col-6"></div>
      </div>
      <div className="row-cols-12 mb-3 d-flex">
        <div className="col-6"></div>
        <div className="col-6 justify-content-center mx-3">
          <h1>Detalles</h1>
          <p>{information.extraInfo}</p>
        </div>
      </div>
    </div>
  );
}

export default AboutUs;
