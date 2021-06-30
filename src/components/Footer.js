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
              className="nav-link d-inline-block"
            >
              <img
                src="https://image.flaticon.com/icons/png/512/1077/1077041.png"
                width="30px"
              />
            </a>
            <a
              href={contacts.instagram}
              target="_blank"
              className="nav-link d-inline-block"
            >
              <img
                src="https://image.flaticon.com/icons/png/512/220/220364.png"
                width="30px"
              />
            </a>
          </div>
          <div className="col-6 text-center mt-3">
            <div>
              <h4>Métodos de contacto</h4>
              <p>{contacts.email}</p>
              <p>{contacts.phone_number}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
