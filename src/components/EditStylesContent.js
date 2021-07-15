import { useEffect, useState } from "react";
import { useFirestore } from "reactfire";
import EditStyleCard from "./EditStyleCard";

function EditStylesContent(props) {
  const firestore = useFirestore();
  const stylesRef = firestore.collection("catalog").doc("styles");
  const [pageData, setPageData] = useState([]);

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
        let styles = content.data()["styles"];

        if (styles.length <= 0) {
          setPageData(
            <strong>
              <h3>No hay estilos para mostrar.</h3>
            </strong>
          );
        } else {
          styles.forEach(function (stylesItem) {
            stylesRef
              .collection(stylesItem)
              .doc("settings")
              .get()
              .then((content) => {
                tempContent.push(
                  <EditStyleCard
                    type={props.type}
                    actionItems={props.actionItems}
                    actionEdit={props.actionEdit}
                    actionDelete={props.actionDelete}
                    id={stylesItem}
                    name={content.data()["name"]}
                    image={content.data()["image"]}
                    visible={content.data()["visible"]}
                    key={stylesItem}
                  />
                );
                if (styles.length === tempContent.length) {
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
