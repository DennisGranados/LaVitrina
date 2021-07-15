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
    <form className="contact-form" onSubmit={sendEmail}>
      <label>Name</label>
      <input type="text" name="user_name" />
      <label>Email</label>
      <input type="email" name="user_email" />
      <label>Message</label>
      <textarea name="message" />
      <input type="submit" value="Send" />
    </form>
  );
}
export default ContactUs;
