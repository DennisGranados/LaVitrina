/**
 * @fileoverview OrderCard, component that shows the information of the item belonging to the order.
 * @version 1.0
 * @author Carlos Cabezas Fallas
 * @author Denilson Granados Solano
 * @author Jahel Jiménez Porras
 * @author Jonathan Orozco Pérez
 * @author María Ramírez Hernández
 * History
 * v1.0 – Initial Release
 * ----
 * The first version of OrderCard was written by Carlos Cabezas, Denilson Granados,
 * Jahel Jiménez, Jonathan Orozco, María Ramírez.
 */
import { useEffect, useState } from "react";
import { useFirestore } from "reactfire";

function OrderCard(props) {
  const firestore = useFirestore();
  const stylesRef = firestore.collection("catalog").doc("styles");
  const [pageData, setPageData] = useState([]);

  // This methos is responsible to load the image correspondent to the ordered item.
  useEffect(() => {
    if (pageData.length === 0) {
      stylesRef
        .collection(props.styleID)
        .doc(props.itemID)
        .get()
        .then(function (content) {
          setPageData(content.data()["image"]);
        });
    }
  }, [pageData.length]);

  return (
    <div className="card shadowCards">
      {pageData.length > 0 ? (
        <img
          src={pageData}
          className="card-img-top"
          alt={"Imagen " + props.itemName}
        />
      ) : (
        <div className="card-img-top">
          <div className="spinner-border text-warning" role="status"></div>
        </div>
      )}
      <div className="card-body">
        <h4 className="card-title text-center">{props.itemName}</h4>
        <li className="list-group-item">
          <strong>Perteneciente al estilo: </strong>
          {props.styleName}
        </li>
        <li className="list-group-item">
          <strong>Código: </strong>
          {props.itemCode}
        </li>
        <li className="list-group-item">
          <strong>Marca: </strong>
          {props.itemBrand}
        </li>
        <li className="list-group-item">
          <strong>Cantidad solicitada: </strong>
          {props.itemQuantity}
        </li>
        <li className="list-group-item">
          <strong>Colores seleccionados: </strong>
          <ul>
            {props.itemColor.map((color) => (
              <li>{color}</li>
            ))}
          </ul>
        </li>
        <li className="list-group-item">
          <strong>Tallas seleccionadas: </strong>
          <ul>
            {props.itemSize.map((size) => (
              <li>{size}</li>
            ))}
          </ul>
        </li>
        <li className="list-group-item">
          <strong>Precio unitario: </strong>
          {props.itemPrice}
        </li>
      </div>
    </div>
  );
}

export default OrderCard;
