/**
 * @fileoverview EditStylesContent, component that show the styles.
 * @version 1.0
 * @author Carlos Cabezas Fallas
 * @author Denilson Granados Solano
 * @author Jahel Jiménez Porras
 * @author Jonathan Orozco Pérez
 * @author María Ramírez Hernández
 * History
 * v1.0 – Initial Release
 * ----
 * The first version of EditStylesContent page was written by Carlos Cabezas, Denilson Granados,
 * Jahel Jiménez, Jonathan Orozco, María Ramírez.
 */
import { useEffect, useState } from "react";
import { useFirestore } from "reactfire";
import EditStyleCard from "./EditStyleCard";

function EditStylesContent(props) {
  const firestore = useFirestore();
  const stylesRef = firestore.collection("catalog").doc("styles");
  const [pageData, setPageData] = useState([]);

  // This method load the styles existents to edit.
  useEffect(() => {
    if (pageData.length === 0) {
      setPageData(
        <div>
          <div className="d-flex justify-content-center">
            <strong className="sr-only">
              <h3>Cargando estilos...</h3>
            </strong>
          </div>
          <div className="d-flex justify-content-center">
            <div className="spinner-border text-warning" role="status"></div>
          </div>
        </div>
      );
    } else {
      let tempContent = [];

      stylesRef.get().then(function (content) {
        let stylesDB = content.data()["styles"];

        if (stylesDB.length <= 0) {
          setPageData(
            <strong>
              <h3>No hay estilos para mostrar</h3>
            </strong>
          );
        } else {
          stylesDB.forEach(function (stylesItem) {
            stylesRef
              .collection(stylesItem)
              .doc("settings")
              .get()
              .then((content) => {
                tempContent.push(
                  <EditStyleCard
                    key={stylesItem}
                    type={props.type}
                    actionItems={props.actionItems}
                    actionEdit={props.actionEdit}
                    actionDelete={props.actionDelete}
                    id={stylesItem}
                    name={content.data()["name"]}
                    image={content.data()["image"]}
                    visible={content.data()["visible"]}
                    length={content.data()["length"]}
                  />
                );
                if (stylesDB.length === tempContent.length) {
                  setPageData(tempContent);
                }
              });
          });
        }
      });
    }
  }, [pageData.length]);

  return (
    <div className="text-center mt-3">
      {props.type === "style" ? (
        <h1 className="mt-3">Editar estilos</h1>
      ) : (
        <h1>Seleccione un estilo</h1>
      )}
      <div className="orderCards">{pageData}</div>
    </div>
  );
}

export default EditStylesContent;
