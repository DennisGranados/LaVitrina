import { useState } from "react";
import { useFirestore } from "reactfire";
import EditStyleItem from "./EditStyleItem";

function EditStylesContent(props) {
  const firestore = useFirestore();
  const stylesRef = firestore.collection("catalog").doc("styles");

  const [pageData, setPageData] = useState([]);

  function generateStyles() {
    if (pageData.length === 0) {
      setPageData(
        <div
          className="spinner-border"
          style={{ width: 3 + "rem", height: 3 + "rem" }}
          role="status"
        >
          <span className="visually-hidden">Loading...</span>
        </div>
      );
    }

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
                <EditStyleItem
                  edit={props.actionEdit}
                  //delete={props.actionDelete}
                  id={stylesItem}
                  title={content.data()["name"]}
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

  return (
    <div className="text-center">
      <h1>Editar estilos</h1>
      <div className="col-12 d-flex justify-content-around">
        {generateStyles()}
        {pageData}
      </div>
    </div>
  );
}

export default EditStylesContent;
