import React, { useState } from "react";
import { useFirestore } from "reactfire";

function Footer() {
  const firestore = useFirestore();
  const contactsRef = firestore.collection("webpage").doc("contacts");
  const [contacts, setContacts] = useState({
    email: "",
    phoneNumber: "",
    facebook: "",
    instagram: "",
  });

  function generateContacts() {
    contactsRef.get().then((snapshot) => {
      let email = snapshot.data().email;
      let phoneNumber = snapshot.data().phone_numbers;
      let facebook = snapshot.data().facebook;
      let instagram = snapshot.data().instagram;

      setContacts({
        ...contacts,
        phoneNumber: phoneNumber,
        email: email,
        facebook: facebook,
        instagram: instagram,
      });
    });
  }

  return (
    <div>
      {generateContacts()}
      <div className="col-12 backgroundHeader mt-4">
        <div className="row mt-4">
          <div className="col-6 text-center mt-3">
            <h4>Otros datos</h4>
            <a href={contacts.facebook} target="_blank" className="nav-link d-inline-block" ><img src="https://image.flaticon.com/icons/png/512/20/20673.png" width="30px" /></a>
            <a href={contacts.instagram} target="_blank" className="nav-link d-inline-block" ><img src="https://image.flaticon.com/icons/png/512/1419/1419647.png" width="30px" /></a>
          </div>
          <div className="col-6 text-center mt-3">
            <div>
              <h4>Métodos de contacto</h4>
              <p>{contacts.email}</p>
              <p>{contacts.phoneNumber}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
