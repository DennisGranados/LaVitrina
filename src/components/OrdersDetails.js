/**
 * @fileoverview OrderDetails, component that displays the details of the selected order.
 * @version 1.0
 * @author Carlos Cabezas Fallas
 * @author Denilson Granados Solano
 * @author Jahel Jiménez Porras
 * @author Jonathan Orozco Pérez
 * @author María Ramírez Hernández
 * History
 * v1.0 – Initial Release
 * ----
 * The first version of OrderDetails was written by Carlos Cabezas, Denilson Granados,
 * Jahel Jiménez, Jonathan Orozco, María Ramírez.
 */
import { Fragment, useEffect, useState } from "react";
import { useFirestore } from "reactfire";
import OrderCard from "./OrderCard";

function OrdersDetails(props) {
  const firestore = useFirestore();
  const stylesRef = firestore.collection("orders");
  const [pageData, setPageData] = useState([]);

  // This method is responsible for load de details of the selected order.
  useEffect(() => {
    if (pageData.length === 0) {
      setPageData(
        <Fragment>
          <div className="d-flex justify-content-center">
            <strong className="sr-only">
              <h3>Cargando artículos...</h3>
            </strong>
          </div>
          <div className="d-flex justify-content-center">
            <div className="spinner-border text-warning" role="status"></div>
          </div>
        </Fragment>
      );
    } else {
      let tempContent = [];

      stylesRef
        .doc(props.orderID)
        .get()
        .then(function (content) {
          let ordersDB = [];
          ordersDB = content.data()["items"];

          ordersDB.forEach((element) => {
            tempContent.push(
              <OrderCard
                key={props.orderID + tempContent.length}
                itemID={element["itemID"]}
                styleID={element["styleID"]}
                styleName={element["styleName"]}
                itemImage={element["itemImage"]}
                itemBrand={element["itemBrand"]}
                itemCode={element["itemCode"]}
                itemColor={element["itemColor"]}
                itemName={element["itemName"]}
                itemPrice={element["itemPrice"]}
                itemQuantity={element["itemQuantity"]}
                itemSize={element["itemSize"]}
              />
            );

            if (ordersDB.length === tempContent.length) {
              setPageData(tempContent);
            }
          });
        });
    }
  }, [pageData.length]);

  return (
    <div>
      <div className="orderCards justify-content-center">
        <div className="">
          <div
            className="btn-group m-3"
            aria-label="Basic mixed styles example"
          >
            <button
              type="button"
              onClick={() => props.actionCancel()}
              className="btn btnAccept"
            >
              Regresar
            </button>
          </div>
        </div>
        <div className="text-center">
          <h2>
            Artículos pertenecientes al pedido de{" "}
            <strong>{props.client}</strong>
            <br></br>
            De la fecha <strong>{props.date}</strong>
          </h2>
        </div>
      </div>
      <div className="col-12 d-flex mt-3 justify-content-around text-center">
        {pageData}
      </div>
    </div>
  );
}

export default OrdersDetails;
