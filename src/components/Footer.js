import React from "react";

function Footer(props) {
  const contacts = props.data;

  return (
    <div>
      <div className="col-12 backgroundHeader mt-4">
        <div className="row mt-4">
          <div className="col-6 text-center mt-3">
            <h4>Redes Sociales</h4>
            <a
              href={contacts.facebook}
              target="_blank"
              rel="noreferrer"
              className="nav-link d-inline-block"
            >
              <img
                src="https://image.flaticon.com/icons/png/512/1077/1077041.png"
                width="30px"
                alt=""
              />
            </a>
            <a
              href={contacts.instagram}
              target="_blank"
              rel="noreferrer"
              className="nav-link d-inline-block"
            >
              <img
                src="https://image.flaticon.com/icons/png/512/1077/1077042.png"
                width="30px"
                alt=""
              />
            </a>
          </div>
          <div className="col-6 text-center mt-3">
            <div>
              <h4>Métodos de contacto</h4>
              <div className="justify-content-center align-items-center  d-flex">
              <img src="https://image.flaticon.com/icons/png/512/2991/2991151.png" width="30px" />
              <p className="ms-2 pt-3">{contacts.email}</p>
              </div>
              <div className="justify-content-center align-items-center  d-flex">
              <img src="https://image.flaticon.com/icons/png/512/73/73552.png" width="30px" />
              <p className="ms-2 pt-3">{contacts.phone_number}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
