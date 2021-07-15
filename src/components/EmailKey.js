import { useEffect, useState } from "react";
import emailjs, { init } from "emailjs-com";

function ContactUs() {
  init("user_QYgxouEt1fkzj4qdwfIXm");
  function sendEmail(e) {
    e.preventDefault();

    emailjs.sendForm("service_atkl6tj", "template_71mb8x7", e.target).then(
      (result) => {
        console.log(result.text);
      },
      (error) => {
        console.log(error.text);
      }
    );
    emailjs.sendForm("service_atkl6tj", "template_p5k61e8", e.target).then(
      (result) => {
        console.log(result.text);
      },
      (error) => {
        console.log(error.text);
      }
    );
  }

  return (
    <div className="orderCards">
      <div className="card my-3">
        <div className="card-body text-center">
          <h4 className="text-center mb-4">Envio de correo</h4>
          <form className="contact-form" onSubmit={sendEmail}>
            <div>
              <label className="form-label">Nombre</label>
              <input className="form-control" type="text" name="user_name" />
            </div>
            <div>
              <label className="form-label mt-3">Correo Electrónico</label>
              <input className="form-control" type="email" name="user_email" />
            </div>
            <div>
              <label className="form-label ">Mensaje</label>
              <textarea className="form-control" name="message" />
            </div>
            <div className="text-center mt-3">
              <input className="btnAccept btn" type="submit" value="Enviar" />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
export default ContactUs;
