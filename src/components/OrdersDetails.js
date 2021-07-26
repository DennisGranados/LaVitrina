import { Fragment, useEffect, useState } from "react";
import { useFirestore } from "reactfire";
import OrderCard from "./OrderCard";

function OrdersDetails(props) {
  const firestore = useFirestore();
  const ordersRef = firestore.collection("orders");
  const ordersImagesRef = firestore.collection("ordersImages");
  const [pageData, setPageData] = useState([]);

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

      ordersRef
        .doc(props.orderID)
        .get()
        .then(function (content) {
          let ordersDB = [];
          ordersDB = content.data()["items"];
          let image;

          ordersDB.forEach((element) => {
            ordersImagesRef
              .doc(element["itemID"] + "_image")
              .get()
              .then((orderImage) => {
                image = orderImage.data()["image"];

                tempContent.push(
                  <OrderCard
                    key={props.orderID + tempContent.length}
                    itemID={element["itemID"]}
                    styleID={element["styleID"]}
                    styleName={element["styleName"]}
                    itemImage={image}
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
