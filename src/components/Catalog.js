import { useEffect, useState } from "react";
import { useFirestore } from "reactfire";
import CatalogStyleCard from "./CatalogStyleCard";

function Catalog(props) {
  const firestore = useFirestore();
  const stylesRef = firestore.collection("catalog").doc("styles");
  const [style, setStyle] = useState([]);

  useEffect(() => {
    if (style.length === 0) {
      let tempContent = [];
      console.log("HOLA");
      stylesRef.get().then(function (content) {
        let styleId = content.data()["styles"];
        console.log(styleId);
        if (styleId.length <= 0) {
          setStyle(<strong> No hay estilos para mostrar.</strong>);
        } else {
          let counter = 0;
          styleId.forEach(function (stylesItem) {
            stylesRef
              .collection(stylesItem)
              .doc("settings")
              .get()
              .then((content) => {
                if (content.data()["visible"] === true) {
                  console.log(counter);
                  tempContent.push(
                    <CatalogStyleCard
                      id={stylesItem}
                      name={content.data()["name"]}
                      image={content.data()["image"]}
                      key={stylesItem}
                    />
                  );
                } else {
                  counter++;
                }
                if (styleId.length - counter === tempContent.length) {
                  setStyle(tempContent);
                }
              });
          });
        }
      });
    }
  }, [props]);

  const handleChange = (e) => {
    setStyle({
      ...style,
      [e.target.name]: e.target.value,
    });
  };

  return <div className="orderCards">{style}</div>;
}

export default Catalog;
