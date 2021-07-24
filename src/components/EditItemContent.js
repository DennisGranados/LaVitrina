import { Fragment, useEffect, useState } from "react";
import { useFirestore } from "reactfire";
import EditItemCard from "./EditItemCard";

function EditItemContent(props) {
  const firestore = useFirestore();
  const stylesRef = firestore.collection("catalog").doc("styles");
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

      stylesRef
        .collection(props.styleID)
        .get()
        .then(function (content) {
          if (content.docs.length === 1) {
            setPageData(
              <strong>
                <h3>No hay artículos para mostrar</h3>
              </strong>
            );
          } else {
            content.docs.forEach((element) => {
              if (element.id !== "settings") {
                tempContent.push(
                  <EditItemCard
                    className="mt-3"
                    key={element.id}
                    actionEdit={props.actionEdit}
                    actionDelete={props.actionDelete}
                    actionItems={props.actionItems}
                    id={element.id}
                    name={element.data()["name"]}
                    styleName={props.styleName}
                    styleID={props.styleID}
                    code={element.data()["code"]}
                    image={element.data()["image"]}
                    visible={element.data()["visible"]}
                    quantity={element.data()["quantity"]}
                  />
                );

                if (content.docs.length - 1 === tempContent.length) {
                  setPageData(tempContent);
                }
              }
            });
          }
        });
    }
  }, [pageData.length]);

  return (
    <div>
      <div className="orderCards">
          <div className="mx-2 mt-3 mb-3" aria-label="Basic mixed styles example">
            <button
              type="button"
              onClick={() => props.actionCancel()}
              className="btn btnAccept"
            >
              Regresar a estilos
            </button>
          </div>
        <div className="col-8">
          <h1>
            Editar artículos pertenecientes a <strong>{props.styleName}</strong>
          </h1>
        </div>
      </div>
      <div className="orderCards">
        {pageData}
      </div>
    </div>
  );
}

export default EditItemContent;
