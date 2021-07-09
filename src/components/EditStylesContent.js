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
        <div className="spinner-border text-warning" role="status"></div>
      );
    } else {
      let tempContent = [];

      stylesRef.get().then(function (content) {
        let styles = content.data()["styles"];

        if (styles.length <= 0) {
          setPageData(<strong> No hay estilos para mostrar.</strong>);
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
    <div className="text-center">
      {props.type === "style" ? (
        <h1>Editar estilos</h1>
      ) : (
        <h1>Seleccione un estilo</h1>
      )}
      <div className="orderCards">
        {pageData}
      </div>
    </div>
  );
}

export default EditStylesContent;
