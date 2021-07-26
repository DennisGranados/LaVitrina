/**
 * @fileoverview Footer, shows additional information of the store.
 * @version 1.0
 * @author Carlos Cabezas Fallas
 * @author Denilson Granados Solano
 * @author Jahel Jiménez Porras
 * @author Jonathan Orozco Pérez
 * @author María Ramírez Hernández
 * History
 * v1.0 - Initial Release
 * ----
 * The first version of Footer was written by  Carlos Cabezas, Denilson Granados,
 * Jahel Jiménez, Jonathan Orozco, María Ramírez.
 */
import React from "react";

function Footer(props) {
  const information = props.data;

  return (
      <div className="orderCards backgroundHeader mt-4">
        <div className="card footerContent">
          <h4 className="text-center fw-bold">Redes Sociales</h4>
          <a
            href={information.facebook}
            target="_blank"
            rel="noreferrer"
            className="nav-link d-inline-block text-center"
          >
            <img
              src="https://image.flaticon.com/icons/png/512/1077/1077041.png"
              width="30px"
              alt="Facebook logo"
            />
          </a>
          <a
            href={information.instagram}
            target="_blank"
            rel="noreferrer"
            className="nav-link d-inline-block text-center"
          >
            <img
              src="https://image.flaticon.com/icons/png/512/1077/1077042.png"
              width="30px"
              alt="Instagram logo"
            />
          </a>
        </div>
        <div className="card footerContent">
          <div>
            <h4 className="text-center fw-bold">Métodos de contacto</h4>
            <div className="justify-content-center align-items-center  d-flex">
              <img
                src="https://image.flaticon.com/icons/png/512/2991/2991151.png"
                width="30px"
                alt="email"
              />
              <p className="ms-2 pt-3">
                <a href={"mailTo:" + information.email} className="noLinks">
                  {information.email}
                </a>
              </p>
            </div>
            <div className="justify-content-center align-items-center  d-flex">
              <img
                src="https://image.flaticon.com/icons/png/512/73/73552.png"
                width="30px"
                alt="Teléfono"
              />
              <p className="ms-2 pt-3">
                <a href={"tel:" + information.phoneNumber} className="noLinks">
                  {information.phoneNumber}
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
  );
}

export default Footer;
