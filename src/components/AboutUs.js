import React, { useState } from "react";
import { useFirestore } from "reactfire";

function AboutUs() {
  const firestore = useFirestore();
  const aboutUsRef = firestore.collection("webpage").doc("about_us");
  const [information, setInformation] = useState({
    aboutUs: "",
    extraInfo: "",
  });

  function generateInformation() {
    aboutUsRef.get().then((snapshot) => {
      let aboutUs = snapshot.data().about_us;
      let extraInfo = snapshot.data().extra_Info;

      setInformation({
        ...information,
        aboutUs: aboutUs,
        extraInfo: extraInfo,
      });
    });
  }

  return (
    <div>
      {generateInformation()}
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
