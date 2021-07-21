import { useEffect, useState } from "react";
import { useFirestore } from "reactfire";
import CatalogStyleCard from "./CatalogStyleCard";

function CatalogStyleContent(props) {
  const firestore = useFirestore();
  const stylesRef = firestore.collection("catalog").doc("styles");
  const [style, setStyle] = useState([]);

  useEffect(() => {
    if (style.length === 0) {
      setStyle(
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
        let styleId = content.data()["styles"];

        if (styleId.length <= 0) {
          setStyle(
            <strong>
              <h3>
                No hay estilos para mostrar
                <br></br>Lamentamos las inconveniencias
              </h3>
            </strong>
          );
        } else {
          let counter = 1;
          let flag = false;

          styleId.forEach(function (stylesItem) {
            stylesRef
              .collection(stylesItem)
              .doc("settings")
              .get()
              .then((content) => {
                if (content.data()["length"] > 1) {
                  if (content.data()["visible"] === true) {
                    if (!flag) {
                      flag = true;
                    }

                    tempContent.push(
                      <CatalogStyleCard
                        key={content.id}
                        actionItems={props.actionItems}
                        id={stylesItem}
                        name={content.data()["name"]}
                        image={content.data()["image"]}
                        key={stylesItem}
                      />
                    );
                  } else {
                    counter++;
                  }
                } else {
                  counter++;
                }

                if (styleId.length - counter === tempContent.length) {
                  if (!flag) {
                    setStyle(
                      <strong>
                        <h3>
                          No hay estilos para mostrar
                          <br></br>Lamentamos las inconveniencias
                        </h3>
                      </strong>
                    );
                  } else {
                    setStyle(tempContent);
                  }
                }
              });
          });
        }
      });
    }
  }, [style.length]);

  return (
    <div className="text-center mt-3">
      <h1>Selecciona uno de los estilos disponibles</h1>
      <div className="orderCards">{style}</div>
    </div>
  );
}

export default CatalogStyleContent;
