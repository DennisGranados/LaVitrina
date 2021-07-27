/**
 * @fileoverview OrderContent, component that shows the information of the item belonging to the order.
 * @version 1.0
 * @author Carlos Cabezas Fallas
 * @author Denilson Granados Solano
 * @author Jahel Jiménez Porras
 * @author Jonathan Orozco Pérez
 * @author María Ramírez Hernández
 * History
 * v1.0 – Initial Release
 * ----
 * The first version of OrderContent was written by Carlos Cabezas, Denilson Granados,
 * Jahel Jiménez, Jonathan Orozco, María Ramírez.
 */
import { Fragment, useEffect, useState } from "react";
import { useFirestore } from "reactfire";
import firebase from "firebase";

function OrdersContent(props) {
  const firestore = useFirestore();
  const ordersRef = firestore.collection("orders");
  const stylesRef = firestore.collection("catalog").doc("styles");
  const [pendingOrders, setPendingOrders] = useState([]);
  const [completedOrders, setCompletedOrders] = useState([]);
  const [restart, setRestart] = useState({ flag: false });
  const completedOrderStatus = "Completado";
  const pendingOrderStatus = "Pendiente";
  const [filterInfo, setFilterInfo] = useState({
    filter: "",
    initialDate: "",
    finalDate: "",
  });

  // This method is responsible for loading pending orders.
  useEffect(() => {
    if (pendingOrders.length === 0) {
      setPendingOrders(
        <Fragment>
          <div className="d-flex justify-content-center">
            <strong className="sr-only">
              <h3>Cargando órdenes pendientes...</h3>
            </strong>
          </div>
          <div className="d-flex justify-content-center">
            <div className="spinner-border text-warning" role="status"></div>
          </div>
        </Fragment>
      );
    } else {
      let tempContent = [];

      ordersRef.get().then(function (content) {
        if (content.docs.length === 1) {
          setPendingOrders(
            <strong>
              <h5 className="text-center">No hay órdenes pendientes</h5>
            </strong>
          );
        } else {
          let counter = 1;

          content.docs.forEach((element) => {
            if (
              element.data().status !== completedOrderStatus &&
              element.id !== "settings"
            ) {
              let initialDate = new Date(element.data().initialDate);
              let initialDateFormated =
                initialDate.getDate() +
                "/" +
                (initialDate.getMonth() + 1) +
                "/" +
                initialDate.getFullYear();

              tempContent.push(
                <Fragment key={element.id}>
                  <ul className="list-group list-group-flush">
                    <li className="list-group-item">
                      <strong>Cliente: </strong>
                      {element.data().client}
                    </li>
                    <li className="list-group-item">
                      <strong>Correo electrónico: </strong>
                      {element.data().email}
                    </li>
                    <li className="list-group-item">
                      <strong>Número telefónico: </strong>
                      {element.data().phone_number}
                    </li>
                    <li className="list-group-item">
                      <strong>Costo: </strong>₡{element.data().price}
                    </li>
                    <li className="list-group-item">
                      <strong>Fecha inicial del pedido: </strong>
                      {initialDateFormated}
                    </li>
                    <li className="list-group-item">
                      <strong>Notas: </strong>
                      {element.data().note}
                    </li>
                    <div className="text-center">
                      <button
                        className="btn btnClear mt-2 mx-2"
                        onClick={() => completeOrder(element.id)}
                      >
                        Completar
                      </button>
                      <button
                        className="btn btnAccept mt-2 mx-2"
                        onClick={() =>
                          props.actionDetails(
                            element.id,
                            element.data().client,
                            element.data().initialDate
                          )
                        }
                      >
                        Detalles
                      </button>
                      <button
                        className="btn btnClear mt-2 mx-2"
                        onClick={() => actionCancelOrder(element.id)}
                      >
                        Cancelar
                      </button>
                    </div>
                  </ul>
                  <div className="separator my-3"></div>
                </Fragment>
              );
            } else {
              counter++;
            }
            if (content.docs.length - counter === tempContent.length) {
              if (tempContent.length === 0) {
                setPendingOrders(
                  <strong>
                    <h5 className="text-center">No hay órdenes pendientes</h5>
                  </strong>
                );
              } else {
                setPendingOrders(tempContent);
              }
            }
          });
        }
      });
    }
  }, [pendingOrders.length, restart.flag]);

  // This method is responsible for filter the completed orders by a date range and display it.
  function filterOrders() {
    let tempContent = [];

    ordersRef.get().then(function (content) {
      if (content.docs.length === 1) {
        setCompletedOrders(
          <strong>
            <h5 className="text-center">No hay órdenes completadas</h5>
          </strong>
        );
      } else {
        let counter = 1;

        content.docs.forEach((element) => {
          if (
            element.data().status !== pendingOrderStatus &&
            element.id !== "settings"
          ) {
            let actualDate = new Date();
            let initialDate = new Date(element.data().initialDate);
            let finalDate = new Date(element.data().finalDate);
            let orderInitialDate = new Date(filterInfo.initialDate);
            let orderFinalDate = new Date(filterInfo.finalDate);
            let orderDateI = new Date(orderInitialDate.getFullYear(), orderInitialDate.getMonth(), orderInitialDate.getDate() + 1);
            let orderDateF = new Date(orderFinalDate.getFullYear(), orderFinalDate.getMonth(), orderFinalDate.getDate() + 1);
            let initialDateFormated = initialDate.getDate() + "/" + (initialDate.getMonth() + 1) + "/"
              + initialDate.getFullYear();
            let finalDateFormated = finalDate.getDate() + "/" + (finalDate.getMonth() + 1) + "/"
              + finalDate.getFullYear();
            if (orderDateI.getTime() === orderDateF.getTime() || orderDateI > orderDateF
              || orderDateF < orderDateI) {
              props.setPopup("Error", "Debe seleccionar un rango de fechas válido.");
              props.openPopup();
            } else {
              if (filterInfo.filter === "Fecha inicial") {
                if (initialDate >= orderDateI && initialDate <= orderDateF) {
                  console.log(tempContent);
                  console.log(actualDate);
                  tempContent.push(
                    <Fragment key={element.id}>
                      <ul className="list-group list-group-flush">
                        <li className="list-group-item">
                          <strong>Cliente: </strong>
                          {element.data().client}
                        </li>
                        <li className="list-group-item">
                          <strong>Correo electrónico: </strong>
                          {element.data().email}
                        </li>
                        <li className="list-group-item">
                          <strong>Costo: </strong>₡{element.data().price}
                        </li>
                        <li className="list-group-item">
                          <strong>Fecha inicial del pedido: </strong>
                          {initialDateFormated}
                        </li>
                        <li className="list-group-item">
                          <strong>Fecha final del pedido: </strong>
                          {finalDateFormated}
                        </li>
                        <li className="list-group-item">
                          <strong>Notas: </strong>
                          {element.data().note}
                        </li>
                        <div className="text-center">
                          <button
                            className="btn btnAccept mt-2 mx-2"
                            onClick={() =>
                              props.actionDetails(
                                element.id,
                                element.data().client,
                                element.data().initialDate
                              )
                            }
                          >
                            Detalles
                          </button>
                        </div>
                      </ul>
                      <div className="separator my-3"></div>
                    </Fragment>
                  );
                } else {
                  setCompletedOrders(
                    <strong>
                      <h5 className="text-center">No hay órdenes completadas en ese periodo</h5>
                    </strong>
                  );
                }
              } else {
                if (filterInfo.filter === "Fecha final") {
                  if (finalDate >= orderInitialDate && finalDate <= orderFinalDate) {
                    tempContent.push(
                      <Fragment key={element.id}>
                        <ul className="list-group list-group-flush">
                          <li className="list-group-item">
                            <strong>Cliente: </strong>
                            {element.data().client}
                          </li>
                          <li className="list-group-item">
                            <strong>Correo electrónico: </strong>
                            {element.data().email}
                          </li>
                          <li className="list-group-item">
                            <strong>Costo: </strong>₡{element.data().price}
                          </li>
                          <li className="list-group-item">
                            <strong>Fecha inicial del pedido: </strong>
                            {initialDateFormated}
                          </li>
                          <li className="list-group-item">
                            <strong>Fecha final del pedido: </strong>
                            {finalDateFormated}
                          </li>
                          <li className="list-group-item">
                            <strong>Notas: </strong>
                            {element.data().note}
                          </li>
                          <div className="text-center">
                            <button
                              className="btn btnAccept mt-2 mx-2"
                              onClick={() =>
                                props.actionDetails(
                                  element.id,
                                  element.data().client,
                                  element.data().initialDate
                                )
                              }
                            >
                              Detalles
                            </button>
                          </div>
                        </ul>
                        <div className="separator my-3"></div>
                      </Fragment>
                    );
                  } else {
                    setCompletedOrders(
                      <strong>
                        <h5 className="text-center">No hay órdenes completadas en ese periodo</h5>
                      </strong>
                    );
                  }
                }
              }
            }
          } else {
            counter++;
          }
        });
      }
    });
  }


  // This methos is responsible for completing selected orders that are pending.
  function completeOrder(id) {
    let date = new Date();
    let finalDate =
      date.getFullYear() + "/" + (date.getMonth() + 1) + "/" + date.getDate();

    ordersRef
      .doc(id)
      .update({
        status: completedOrderStatus,
        finalDate: finalDate,
      })
      .then(() => {
        props.setPopup("Confirmación", "Se ha completado la orden con éxito.");
        props.openPopup();
        setRestart({ flag: true });
      })
      .catch((error) => {
        props.setPopup(error.code);
        props.openPopup();
      });
  }

  // This method is responsible to cancel the pending orders selected.
  function actionCancelOrder(id) {
    ordersRef
      .doc(id)
      .get()
      .then((element) => {
        let itemsDB = [];
        itemsDB = element.data()["items"];

        itemsDB.forEach((item) => {
          let quantity = item["itemQuantity"];
          let itemID = item["itemID"];
          let styleID = item["styleID"];

          stylesRef
            .collection(styleID)
            .doc(itemID)
            .update({
              quantity: firebase.firestore.FieldValue.increment(quantity),
            })
            .then(() => {
              ordersRef
                .doc(id)
                .delete()
                .then(() => {
                  props.setPopup(
                    "Confirmación",
                    "Se ha eliminado la orden con éxito."
                  );
                  props.openPopup();
                  setRestart({ flag: true });
                })
                .catch((error) => {
                  props.setPopup(error.code);
                  props.openPopup();
                });
            });
        });
      });
  }

  const handleChange = (e) => {
    setFilterInfo({
      ...filterInfo,
      [e.target.name]: e.target.value,
    });
  };

  // This method is responsible for call the filtered completed orders.
  const filterCompleteOrders = (e) => {
    e.preventDefault();
    filterOrders();
  };

  return (
    <div className="orderCards" id="cart">
      <div className="card shadowCards mx-2 my-3" id="card-submit">
        <div className="card-body">
          <h4 className="text-center mb-4">Órdenes pendientes</h4>
          {pendingOrders}
        </div>
      </div>
      <div className="card shadowCards mx-2 my-3" id="card-submit">
        <div className="card-body">
          <h4 className="text-center mb-4">Histórico de órdenes completadas</h4>
          <h5 className="text-center mb-4">Filtrar órdenes completadas</h5>
          <form onSubmit={filterCompleteOrders}>
            <label className="form-label">Tipo de filtrado por fecha: </label>
            <select
              className="form-select"
              name="filter"
              onChange={handleChange}
              required
            >
              <option value="">---Seleccione una opción---</option>
              <option value="Fecha inicial">
                Fecha de solicitud del pedido
              </option>
              <option value="Fecha final">Fecha de entrega del pedido</option>
            </select>
            <label className="form-label topMargin me-3">Fecha inicial: </label>
            <input
              type="date"
              name="initialDate"
              min="2000-01-01"
              max="2100-01-01"
              onChange={handleChange}
              required
            ></input>
            <br></br>
            <label className="form-label topMargin me-3">Fecha final: </label>
            <input
              type="date"
              name="finalDate"
              min="2000-01-01"
              max="2100-01-01"
              onChange={handleChange}
              required
            ></input>
            <div className="text-center mt-3">
              <button type="submit" className="btn btnAccept ms-2">
                Filtrar
              </button>
            </div>
          </form>
          <div className="separator my-3"></div>
          {completedOrders}
        </div>
      </div>
    </div>
  );
}

export default OrdersContent;
