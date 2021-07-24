/**
 * @fileoverview ShoppingCart, shows the items added to the user's shopping cart.
 * @version 1.0
 * @author Carlos Cabezas Fallas
 * @author Denilson Granados Solano
 * @author Jahel Jiménez Porras
 * @author Jonathan Orozco Pérez
 * @author María Ramírez Hernández
 * History
 * v1.0 – Initial Release
 * ----
 * The first version of ShoppingCart was written by Carlos Cabezas, Denilson Granados,
 * Jahel Jiménez, Jonathan Orozco, María Ramírez.
 */
import React, { Fragment, useState } from "react";
import emailjs, { init } from "emailjs-com";
import { useFirestore } from "reactfire";
import {
  addOrder,
  deleteAllOrders,
  deleteOrder,
  getAllOrders,
  getOrder,
} from "../OrderManager";
import firebase from "firebase";
import Capitalize from "../Tools";

function ShoppingCart(props) {
  const firestore = useFirestore();
  const stylesRef = firestore.collection("catalog").doc("styles");
  const ordersRef = firestore.collection("orders");
  const paymentMethodRef = firestore
    .collection("webpage")
    .doc("payment_methods");

  init("user_QYgxouEt1fkzj4qdwfIXm");

  // This method set the order info.
  const [orderInfo, setOrderInfo] = useState({
    user_name: "",
    user_email: "",
    message: "",
  });

  // This method set the lists of bank accounts and sinpe mobile account.
  const [method, setPaymentMethod] = useState({
    bankingList: [],
    sinpeList: [],
  });

  // This methpd display the order made and ther final price.
  const [orderDisplay, setOrderDisplay] = useState({
    ordersList: [],
    finalPrice: 0,
  });

  const orderStatus = "Pendiente";
  // This method is responsible for generating the orders that have been made to display them.
  function generateOrder(isUpdated) {
    if (orderDisplay.ordersList !== undefined)
      if (orderDisplay.ordersList.length === 0 || isUpdated) {
        let orderStorage = getAllOrders();
        let tempContent = [];
        let counter = 1;
        let price = 0;

        if (orderStorage.size >= 1) {
          orderStorage.forEach((value, key) => {
            let order = JSON.parse(value);
            let image;
            let max;

            stylesRef
              .collection(order.styleID)
              .doc(order.itemID)
              .get()
              .then((element) => {
                image = element.data()["image"];
                max = element.data()["quantity"];
              })
              .then(() => {
                tempContent.push(
                  <Fragment>
                    <h5 className="text-center">Ítem #{counter}</h5>
                    <form
                      key={key}
                      id={"idForm_" + key}
                      onSubmit={(e) =>
                        handleUpdateQuantity(
                          e,
                          key,
                          order.itemID,
                          order.styleID
                        )
                      }
                    >
                      <div className="text-center my-3">
                        {
                          <img
                            src={image}
                            alt="Imagen de la prenda"
                            width="300"
                          />
                        }
                      </div>
                      <label className="form-label topMargin">
                        <strong>Nombre del producto:</strong> {order.itemName}
                      </label>
                      <br></br>
                      <label className="form-label topMargin">
                        <strong>Perteneciente al estilo:</strong>{" "}
                        {order.styleName}
                      </label>
                      <br></br>
                      <label className="form-label topMargin">
                        <strong>Colores seleccionados:</strong>
                        {order.itemColor.map((color) => (
                          <li key={color}>{color}</li>
                        ))}
                      </label>
                      <br></br>
                      <label className="form-form-label topMargin">
                        <strong>Tallas seleccionadas:</strong>
                        {order.itemSize.map((size) => (
                          <li key={size}>{size}</li>
                        ))}
                      </label>
                      <br></br>
                      <label className="form-label topMargin">
                        <strong>Precio unitario del producto:</strong> ₡
                        {order.itemPrice}
                      </label>
                      <br></br>
                      <label className="form-label topMargin">
                        <strong>Cantidad a comprar:</strong>{" "}
                        {order.itemQuantity}
                      </label>
                      <br></br>
                      <label className="form-label topMargin">
                        <strong>Subtotal del ítem:</strong> ₡
                        {order.itemPrice * order.itemQuantity}
                      </label>
                      <br></br>
                      <label className="form-label topMargin">
                        <strong>Modificar cantidad:</strong>
                      </label>
                      <input
                        key={"quantity" + key}
                        id={"idQuantity_" + key}
                        type="number"
                        name="itemQuantity"
                        className="form-control"
                        placeholder={
                          "Ingrese la nueva cantidad del artículo seleccionado"
                        }
                        max={max + order.itemQuantity}
                        min="1"
                        required
                      ></input>
                      <div className="text-center">
                        <button
                          key={"edit" + key}
                          id={"idUpdate_" + key}
                          type="submit"
                          className="btn btnAccept topMargin mx-2"
                        >
                          Modificar la cantidad
                        </button>
                        <button
                          key={"delete" + key}
                          onClick={(e) =>
                            removeItem(
                              e,
                              key,
                              order.itemID,
                              order.styleID,
                              order.itemQuantity
                            )
                          }
                          type="cancel"
                          className="btn btnClear topMargin mx-2"
                        >
                          Borrar elemento
                        </button>
                      </div>
                    </form>
                    <div className="separator my-3"></div>
                  </Fragment>
                );

                price += order.itemPrice * order.itemQuantity;

                if (orderStorage.size === tempContent.length) {
                  setOrderDisplay({
                    ordersList: tempContent,
                    finalPrice: price,
                  });
                }

                counter++;
              });
          });
        } else {
          setOrderDisplay(
            <strong>
              <h5 className="text-justify">
                Actualmente no posee pedidos
                <br></br>Puede explorar el catálogo y añadir artículos de su
                agrado
              </h5>
            </strong>
          );
        }
      }
  }

  // This method is responsible of load existing bank accounts.
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
        } else {
          temp.push(
            <strong>
              <h5>No hay cuentas bancarias disponibles de SINPE Móvil.</h5>
            </strong>
          );
          setPaymentMethod({ ...method, sinpeList: temp });
        }
      });
    }
  }

  // This method is responsible of load existing bank accounts.
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
        } else {
          temp.push(
            <strong>
              <h5>No hay cuentas de SINPE Móvil disponibles.</h5>
            </strong>
          );
          setPaymentMethod({ ...method, sinpeList: temp });
        }
      });
    }
  }

  // This method set the information of the order made.
  const handleChange = (e) => {
    setOrderInfo({
      ...orderInfo,
      [e.target.name]: e.target.value.trim(),
    });
  };

  // This method is responsible for manage the change in the quantity of selected items in an order.
  const handleUpdateQuantity = (e, key, itemID, styleID) => {
    e.preventDefault();

    let id = e.target.id;
    id = id.replace("idForm_", "idQuantity_");

    let newQuantity = +document.getElementById(id).value;
    let order = getOrder(key);

    let orderQuantity = +order.itemQuantity;

    order.itemQuantity = newQuantity;

    if (order.itemQuantity === orderQuantity) {
      props.setPopup(
        "Error",
        "Debe de ingresar una cantidad distinta a la actual."
      );
      props.openPopup();
    }

    let flag = false;
    let quantity = false;

    if (order.itemColor.length > order.itemQuantity) {
      flag = true;
    }

    if (order.itemSize.length > order.itemQuantity && !flag) {
      flag = true;
    }

    if (flag) {
      props.setPopup(
        "Error",
        "La cantidad solicitada debe de ser suficiente para los colores y las tallas."
      );
      props.openPopup();
    } else {
      quantity = true;
    }

    if (
      quantity &&
      order.itemQuantity > orderQuantity &&
      order.itemQuantity !== orderQuantity
    ) {
      addOrder(key, order);

      stylesRef
        .collection(styleID)
        .doc(itemID)
        .update({
          quantity: firebase.firestore.FieldValue.increment(
            -(order.itemQuantity - orderQuantity)
          ),
        })
        .then(() => {
          props.setPopup(
            "Confirmación",
            "Se ha aumentado la cantidad del artículo seleccionado correctamente."
          );
          props.openPopup();
          e.target.reset();
          generateOrder(true);
        })
        .catch((error) => {
          props.setPopup(error.code);
          props.openPopup();
        });
    } else if (
      quantity &&
      order.itemQuantity < orderQuantity &&
      order.itemQuantity !== orderQuantity
    ) {
      addOrder(key, order);

      stylesRef
        .collection(styleID)
        .doc(itemID)
        .update({
          quantity: firebase.firestore.FieldValue.increment(
            orderQuantity - order.itemQuantity
          ),
        })
        .then(() => {
          props.setPopup(
            "Confirmación",
            "Se ha disminuido la cantidad del artículo seleccionado correctamente."
          );
          props.openPopup();
          e.target.reset();
          generateOrder(true);
        })
        .catch((error) => {
          props.setPopup(error.code);
          props.openPopup();
        });
    }
  };

  // This method is responsible for removing an item from the order in the shopping cart.
  const removeItem = (e, key, itemID, styleID, quantity) => {
    e.preventDefault();

    deleteOrder(key);

    stylesRef
      .collection(styleID)
      .doc(itemID)
      .update({
        quantity: firebase.firestore.FieldValue.increment(quantity),
      })
      .then(() => {
        props.setPopup(
          "Confirmación",
          "Se ha eliminado correctamente el ítem de su orden de compra."
        );
        props.openPopup();
        console.log("hi");
        generateOrder(true);
      })
      .catch((error) => {
        props.setPopup(error.code);
        props.openPopup();
      });
  };

  /**This method is responsible for sending the information of the completed order and sending the 
  notification to the user and administrator.*/
  function sendOrder(e) {
    e.preventDefault();

    let date = new Date();
    let initialDate =
      date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear();
    let message = orderInfo.message;
    let orderStorage = getAllOrders();
    let tempContent = [];

    if (orderStorage.size >= 1) {
      orderStorage.forEach((value) => {
        let order = JSON.parse(value);

        tempContent.push(order);
      });

      if (message === "") {
        message = "Sin comentario adicional.";
      }

      ordersRef
        .doc()
        .set({
          client: Capitalize(orderInfo.user_name),
          email: orderInfo.user_email,
          note: message,
          initialDate: initialDate,
          status: orderStatus,
          items: tempContent,
          price: orderDisplay.finalPrice,
        })
        .then(() => {
          props.setPopup(
            "Confirmación",
            "Se ha enviado su pedido con éxito, en breve recibirá un correo de confirmación."
          );
          props.openPopup();
        })
        .catch((error) => {
          props.setPopup(error.code);
          props.openPopup();
        });

      deleteAllOrders();

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

      generateOrder(true);
    } else {
      props.setPopup(
        "Error",
        "Debe de existir un pedido en el carrito de compras."
      );
      props.openPopup();
    }
  }

  return (
    <div className="orderCards" id="cart">
      {generateOrder(false)}
      {generateSinpe()}
      {generateBanking()}
      <div className="card shadowCards mx-2 my-3" id="card-submit">
        <div className="card-body">
          <h4 className="text-center mb-4">Orden de compra</h4>
          {orderDisplay.ordersList !== undefined ? (
            <Fragment>
              {orderDisplay.ordersList.length > 0 ? (
                <Fragment>{orderDisplay.ordersList}</Fragment>
              ) : (
                <Fragment>
                  <div className="d-flex justify-content-center">
                    <strong className="sr-only">
                      <h3>Cargando artículos...</h3>
                    </strong>
                  </div>
                  <div className="d-flex justify-content-center">
                    <div
                      className="spinner-border text-warning"
                      role="status"
                    ></div>
                  </div>
                </Fragment>
              )}
            </Fragment>
          ) : (
            <Fragment>
              <strong>
                <h5 className="text-justify">
                  Actualmente no posee pedidos
                  <br></br>Puede explorar el catálogo y añadir artículos de su
                  agrado
                </h5>
              </strong>
            </Fragment>
          )}
        </div>
      </div>
      <div className="card shadowCards mx-2 my-3" id="card-submit">
        <div className="card-body">
          <h4 className="text-center mb-4 ">Confirma tu orden de compra</h4>
          {orderDisplay.finalPrice > 0 ? (
            <Fragment>
              <h5 className="text-center">Detalles del pedido</h5>
              <p>
                El total a pagar por este pedido es de{" "}
                <strong>₡{orderDisplay.finalPrice}</strong>
              </p>
              <div className="separator mb-3"></div>
            </Fragment>
          ) : (
            <Fragment></Fragment>
          )}
          <h5 className="text-center">Instrucciones de pago</h5>
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
          <form className="contact-form" onSubmit={sendOrder}>
            <div>
              <label className="form-label">Nombre</label>
              <input
                className="form-control"
                type="text"
                name="user_name"
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label className="form-label mt-3">Correo Electrónico</label>
              <input
                className="form-control"
                type="email"
                name="user_email"
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label className="form-label mt-3">Mensaje (opcional)</label>
              <textarea
                className="form-control"
                value="Sin comentario adicional."
                name="message"
                onChange={handleChange}
              />
            </div>
            {orderDisplay.finalPrice > 0 ? (
              <Fragment>
                <input
                  className="form-control"
                  type="text"
                  name="price"
                  value={orderDisplay.finalPrice}
                  hidden
                />
              </Fragment>
            ) : (
              <Fragment></Fragment>
            )}
            <div className="text-center mt-3">
              <input className="btnAccept btn" type="submit" value="Enviar" />
            </div>
          </form>
        </div>
      </div>
      <div className="card shadowCards mx-2 my-3" id="card-submit">
        <div className="card-body">
          <h4 className="text-center mb-4 ">Métodos de pago disponibles</h4>
          {method.sinpeList.length > 0 && method.bankingList.length > 0 ? (
            <Fragment>
              <div className="d-flex justify-content-around flex-wrap">
                <h5 className="text-center mb-4">SINPE Móvil</h5>
                {method.sinpeList}
              </div>
              <div className="separator mt-3"></div>
              <div className="d-flex justify-content-around flex-wrap">
                <h5 className="text-center mb-4 mt-4">Cuenta bancaria</h5>
                {method.bankingList}
              </div>
            </Fragment>
          ) : (
            <Fragment>
              <div className="d-flex justify-content-center">
                <strong className="sr-only">
                  <h3>Cargando métodos de pago...</h3>
                </strong>
              </div>
              <div className="d-flex justify-content-center">
                <div
                  className="spinner-border text-warning"
                  role="status"
                ></div>
              </div>
            </Fragment>
          )}
        </div>
      </div>
    </div>
  );
}

export default ShoppingCart;
