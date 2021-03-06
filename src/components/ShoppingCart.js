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
  const ordersImagesRef = firestore.collection("ordersImages");
  const paymentMethodRef = firestore
    .collection("webpage")
    .doc("payment_methods");

  init("user_gqlOe7Xkcxc9InW02jyT9");

  // This method set the order info.
  const [orderInfo, setOrderInfo] = useState({
    user_name: "",
    user_email: "",
    phone_number: "",
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
                if (element.exists) {
                  image = element.data()["image"];
                  max = element.data()["quantity"];

                  tempContent.push(
                    <Fragment key={key}>
                      <h5 className="text-center">Ítem #{counter}</h5>
                      <form
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
                              width="250"
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
                          defaultValue=""
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
                } else {
                  let newOrder = {
                    styleID: order.styleID,
                    styleName: order.styleName,
                    itemID: order.itemID,
                    itemName: order.itemName,
                    itemCode: order.itemCode,
                    itemColor: order.itemColor,
                    itemSize: order.itemSize,
                    itemBrand: order.itemBrand,
                    itemPrice: order.itemPrice,
                    itemQuantity: order.itemQuantity,
                    invalidItem: true,
                  };

                  addOrder(key, newOrder);

                  tempContent.push(
                    <Fragment key={key}>
                      <h5 className="text-center">Ítem #{counter}</h5>
                      <form id={"idForm_" + key}>
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
                        <br></br>
                        <h6 className="error">
                          Este artículo <strong>NO</strong> se encuentra
                          disponible. <br></br>Elimínelo o póngase en contacto
                          con administración mediante los métodos de contacto
                          mostrados abajo.
                        </h6>
                        <div className="text-center">
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
                }

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
      date.getFullYear() + "/" + (date.getMonth() + 1) + "/" + date.getDate();
    let message = orderInfo.message;
    let orderStorage = getAllOrders();
    let tempContent = [];
    let invalidItem = false;

    if (orderStorage.size >= 1) {
      if (message === "") {
        message = "Sin comentario adicional.";

        document.getElementById("message").value = message;
      }

      orderStorage.forEach((value) => {
        let order = JSON.parse(value);

        let image;

        stylesRef
          .collection(order.styleID)
          .doc(order.itemID)
          .get()
          .then((orderDoc) => {
            if (orderDoc.exists) {
              ordersImagesRef
                .doc(order.itemID + "_image")
                .get()
                .then((orderImage) => {
                  if (!orderImage.exists) {
                    stylesRef
                      .collection(order.styleID)
                      .doc(order.itemID)
                      .get()
                      .then((content) => {
                        image = content.data()["image"];

                        ordersImagesRef
                          .doc(order.itemID + "_image")
                          .set({ image: image });
                      });
                  }
                });
            }
          });

        if (order.invalidItem !== undefined) {
          invalidItem = true;
        } else {
          tempContent.push(order);
        }
      });

      if (!invalidItem) {
        deleteAllOrders();

        emailjs.sendForm("service_v6ksuvf", "template_jnu16ap", e.target).then(
          (result) => {
            console.log(result.text);
          },
          (error) => {
            console.log(error.text);
          }
        );

        emailjs.sendForm("service_v6ksuvf", "template_9j36x2f", e.target).then(
          (result) => {
            console.log(result.text);
          },
          (error) => {
            console.log(error.text);
          }
        );

        ordersRef
          .doc()
          .set({
            client: Capitalize(orderInfo.user_name),
            email: orderInfo.user_email,
            phone_number: orderInfo.phone_number,
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

        generateOrder(true);
        e.target.reset();
      } else {
        props.setPopup(
          "Error",
          "Debe de eliminar el artículo solicitado para continuar."
        );
        props.openPopup();
      }
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
                placeholder="test@gmail.com"
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label className="form-label mt-3">Número Telefónico</label>
              <input
                className="form-control"
                type="number"
                name="phone_number"
                min="11111111"
                max="99999999"
                placeholder="88888888"
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label className="form-label mt-3">Mensaje (opcional)</label>
              <textarea
                className="form-control"
                placeholder="Ingrese un comentario adicional."
                id="message"
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
