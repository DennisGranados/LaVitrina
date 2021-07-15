import React, { useEffect, useState } from "react";
import { useFirestore } from "reactfire";
import CatalogItemCard from "./CatalogItemCard";

function CatalogItemContent(props) {
  const firestore = useFirestore();
  const stylesRef = firestore.collection("catalog").doc("styles");
  const [pageData, setPageData] = useState([]);

  useEffect(() => {
    if (pageData.length === 0) {
      setPageData(
        <div>
          <div className="d-flex justify-content-center">
            <strong className="sr-only">
              <h3>Cargando artículos...</h3>
            </strong>
          </div>
          <div className="d-flex justify-content-center">
            <div className="spinner-border text-warning" role="status"></div>
          </div>
        </div>
      );
    } else {
      let tempContent = [];
      let counter = 1;
      let flag = false;

      stylesRef
        .collection(props.styleID)
        .get()
        .then(function (content) {
          content.docs.forEach((element) => {
            if (element.id !== "settings") {
              if (element.data()["visible"] === true) {
                if (!flag) {
                  flag = true;
                }

                tempContent.push(
                  <CatalogItemCard
                    actionDetails={props.actionDetails}
                    id={element.id}
                    name={element.data()["name"]}
                    styleName={props.styleName}
                    styleID={props.styleID}
                    code={element.data()["code"]}
                    image={element.data()["image"]}
                    quantity={element.data()["quantity"]}
                    brand={element.data()["brand"]}
                    color={element.data()["color"]}
                    price={element.data()["price"]}
                    size={element.data()["size"]}
                    key={element.id}
                  />
                );
              } else {
                counter++;
              }
            } else {
              counter++;
            }

            if (content.docs.length - counter === tempContent.length) {
              if (!flag) {
                setPageData(
                  <strong>
                    <h3>
                      No hay artículos para mostrar
                      <br></br>Lamentamos las inconveniencias
                    </h3>
                  </strong>
                );
              } else {
                setPageData(tempContent);
              }
            }
          });
        });
    }
  }, [pageData.length]);

  return (
    <div>
      <div className="orderCards">
        <div className="col-2">
          <div className="btn-group" aria-label="Basic mixed styles example">
            <button
              type="button"
              onClick={() => props.actionCancel()}
              className="btn btnAccept"
            >
              Regresar a la selección de estilos
            </button>
          </div>
        </div>
        <div className="col-8">
          <h1>
            Artículos pertenecientes a <strong>{props.styleName}</strong>
          </h1>
        </div>
      </div>
      <div className="orderCards">{pageData}</div>
    </div>
  );
}

export default CatalogItemContent;
