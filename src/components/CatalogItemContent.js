/**
 * @fileoverview CatalogItemContent, component that show the items of the style on the catalog.
 * @version 1.0
 * @author Carlos Cabezas Fallas
 * @author Denilson Granados Solano
 * @author Jahel Jiménez Porras
 * @author Jonathan Orozco Pérez
 * @author María Ramírez Hernández
 * History
 * v1.0 – Initial Release
 * ----
 * The first version of CatalogItemContent was written by Carlos Cabezas, Denilson Granados,
 * Jahel Jiménez, Jonathan Orozco, María Ramírez.
 */
import React, { useEffect, useState } from "react";
import { useFirestore } from "reactfire";
import CatalogItemCard from "./CatalogItemCard";

function CatalogItemContent(props) {
  const firestore = useFirestore();
  const stylesRef = firestore.collection("catalog").doc("styles");
  const [pageData, setPageData] = useState([]);

  // This method load the items belonging to the style.
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
      let counter = 0;
      let flag = false;

      stylesRef
        .collection(props.styleID)
        .get()
        .then(function (content) {
          content.docs.forEach((element) => {
            if (element.id !== "settings") {
              if (
                element.data()["visible"] === true &&
                element.data()["quantity"] > 0
              ) {
                if (!flag) {
                  flag = true;
                }

                tempContent.push(
                  <CatalogItemCard
                    actionDetails={props.actionDetails}
                    key={element.id}
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
        <div className="mx-2 mt-3 mb-3">
          <button
            type="button"
            onClick={() => props.actionCancel()}
            className="btn btnAccept"
          >
            Regresar a estilos
          </button>
        </div>
        <div className="col-8 mt-3">
          <h1>
            Artículos pertenecientes a <strong>{props.styleName}</strong>
          </h1>
        </div>
      </div>
      <div>
        <div className="orderCards">{pageData}</div>
      </div>
    </div>
  );
}

export default CatalogItemContent;
