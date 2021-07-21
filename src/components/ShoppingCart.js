import React, { useState } from "react";
import emailjs, { init } from "emailjs-com";
import { useFirestore } from "reactfire";
import { getAllOrders } from "../OrderManager";

function ShoppingCart() {
  const firestore = useFirestore();
  const paymentMethodRef = firestore
    .collection("webpage")
    .doc("payment_methods");

  init("user_QYgxouEt1fkzj4qdwfIXm");

  const [orderInfo, setOrderInfo] = useState({
    name: "",
    email: "",
    order: "",
  });

  const [method, setPaymentMethod] = useState({
    bankingList: [],
    sinpeList: [],
  });

  function generateOrder() {
    let temp = getAllOrders();

    if (temp) {
      temp.forEach((element) => {
        let x = JSON.parse(element);
        console.log(x.itemID);
      });
    }
    //console.log(getOrder("Name1626854981138"));
  }

  function generateBanking() {
    if (method.bankingList.length === 0) {
      paymentMethodRef.get().then((content) => {
        let banking = content.data()["banking"];

        var temp = [];
        if (Object.keys(banking).length > 0) {
          for (const key in banking) {
            if (Object.hasOwnProperty.call(banking, key)) {
              const element = banking[key];
              temp.push(
                <div
                  className="phone-number input-group ml-1 mr-1"
                  key={key + "div"}
                >
                  <input
                    type="text"
                    className="form-control"
                    value={element + ": " + key}
                    key={key + "input"}
                    readOnly
                  />
                </div>
              );
            }
          }
          setPaymentMethod({
            ...method,
            bankingList: temp,
          });
        }
      });
    }
  }

  function generateSinpe() {
    if (method.sinpeList.length === 0) {
      paymentMethodRef.get().then((content) => {
        let sinpe = content.data()["sinpe"];

        var temp = [];
        if (Object.keys(sinpe).length > 0) {
          for (const key in sinpe) {
            if (Object.hasOwnProperty.call(sinpe, key)) {
              const element = sinpe[key];
              temp.push(
                <div
                  className="phone-number input-group ml-1 mr-1"
                  key={key + "div"}
                >
                  <input
                    type="text"
                    className="form-control"
                    value={element + ": " + key}
                    key={key + "input"}
                    readOnly
                  />
                </div>
              );
            }
          }
          setPaymentMethod({
            ...method,
            sinpeList: temp,
          });
        }
      });
    }
  }

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
    <div className="col-12 justify-content-center d-flex mt-3">
      <div className="card col-5" id="card-submit">
        <div className="card-body">
          <h4 className="text-center mb-4">Orden de compra</h4>
          <div className="d-flex justify-content-around flex-wrap"></div>
          <h4 className="text-center mb-4 mt-4">Métodos de pago disponibles</h4>
          <div className="d-flex justify-content-around flex-wrap">
            <h5 className="text-center mb-4">SINPE Móvil</h5>
            {generateSinpe()}
            {method.sinpeList}
            <h5 className="text-center mb-4 mt-4">Cuenta bancaria</h5>
            {generateBanking()}
            {method.bankingList}
          </div>
          <h4 className="text-center mb-4 mt-4">Confirma tu orden de compra</h4>
          <p>
            Para completar la orden, necesitarás rellenar los datos de abajo.
            Una vez hecho, recibirás un correo electrónico a la dirección
            ingresada, deberás{" "}
            <strong>responder al correo con el comprobante</strong> del método
            de pago de tu elección.
            <br></br>
            <br></br>Para más información, utiliza los medios de contacto
            mostrados al final de la página.
          </p>
          <form className="contact-form" onSubmit={sendEmail}>
            <div>
              <label className="form-label">Nombre</label>
              <input
                className="form-control"
                type="text"
                name="user_name"
                required
              />
            </div>
            <div>
              <label className="form-label mt-3">Correo Electrónico</label>
              <input
                className="form-control"
                type="email"
                name="user_email"
                required
              />
            </div>
            <div>
              <label className="form-label mt-3">Mensaje (opcional)</label>
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

export default ShoppingCart;
