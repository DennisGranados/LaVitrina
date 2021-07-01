import React from "react";

function AboutUs(props) {
  const information = props.data;

  return (
    <div>
      <div className="col-12 mb-3 d-flex">
        <div className="col-6 justify-content-center mx-3">
          <h1>Acerca de La Vitrina </h1>
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
