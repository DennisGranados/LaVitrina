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
        if (content.docs.length === 0) {
          setPendingOrders(
            <strong>
              <h5 className="text-center">No hay órdenes pendientes</h5>
            </strong>
          );
        } else {
          let counter = 0;

          content.docs.forEach((element) => {
            if (
              element.data().status !== completedOrderStatus &&
              element.id !== "settings"
            ) {
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
                      {element.data().initialDate}
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
                            element.data().date
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
              setPendingOrders(tempContent);
            }
          });
        }
      });
    }
  }, [pendingOrders.length, restart.flag]);

  useEffect(() => {
    if (completedOrders.length === 0) {
      setCompletedOrders(
        <Fragment>
          <div className="d-flex justify-content-center">
            <strong className="sr-only">
              <h3>Cargando órdenes completadas...</h3>
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
        if (content.docs.length === 0) {
          setCompletedOrders(
            <strong>
              <h5 className="text-center">No hay órdenes completadas</h5>
            </strong>
          );
        } else {
          let counter = 0;

          content.docs.forEach((element) => {
            if (
              element.data().status !== pendingOrderStatus &&
              element.id !== "settings"
            ) {
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
                      {element.data().initialDate}
                    </li>
                    <li className="list-group-item">
                      <strong>Fecha final del pedido: </strong>
                      {element.data().finalDate}
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
                            element.data().date
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
              counter++;
            }
            if (content.docs.length - counter === tempContent.length) {
              setCompletedOrders(tempContent);
            }
          });
        }
      });
    }
  }, [completedOrders.length, restart.flag]);

  function completeOrder(id) {
    let date = new Date();
    let finalDate =
      date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear();

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
          {completedOrders}
        </div>
      </div>
    </div>
  );
}

export default OrdersContent;
