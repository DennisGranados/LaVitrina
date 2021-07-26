/**
 * @fileoverview DeleteStyle page, allows delete an style from the database.
 * @version 1.0
 * @author Carlos Cabezas Fallas
 * @author Denilson Granados Solano
 * @author Jahel Jiménez Porras
 * @author Jonathan Orozco Pérez
 * @author María Ramírez Hernández
 * History
 * v1.0 – Initial Release
 * ----
 * The first version of DeleteStyle page was written by Carlos Cabezas, Denilson Granados,
 * Jahel Jiménez, Jonathan Orozco, María Ramírez.
 */
import React, { useState } from "react";
import { useFirestore } from "reactfire";

function DeleteStyle(props) {
  const [discard, setDiscard] = useState(undefined);
  const firestore = useFirestore();
  const stylesRef = firestore.collection("catalog").doc("styles");
  const ordersRef = firestore.collection("orders");
  const pendingOrderStatus = "Pendiente";

  // This method set the style to delete.
  const handleChange = (e) => {
    setDiscard(e.target.value);
  };

  //This method is responsible for delete the style selected.
  const submitDelete = (e) => {
    e.preventDefault();

    if (discard === props.name) {
      let counter = 0;

      ordersRef
        .get()
        .then((content) => {
          content.docs.forEach((order) => {
            if (order.data()["status"] === pendingOrderStatus) {
              let itemsDB = [];

              itemsDB = order.data()["items"];

              itemsDB.forEach((item) => {
                if (item.styleID === props.id) {
                  counter++;
                }
              });
            }
          });
        })
        .then(() => {
            if (counter === 0) {
              stylesRef
                .collection(props.id)
                .get()
                .then((content) => {
                  content.docs.forEach((element) => {
                    stylesRef
                      .collection(props.id)
                      .doc(element.id)
                      .delete()
                      .then(() => {
                        stylesRef.get().then(function (content) {
                          let styles = content.data()["styles"];
                          let i = styles.indexOf(props.id);
                          if (i >= 0) {
                            styles.splice(i, 1);
                            stylesRef.update("styles", styles).then(() => {
                              props.setPopup(
                                "Confirmación",
                                "Se ha eliminado la categoría con éxito."
                              );
                              props.openPopup();
                              props.actionCancel();
                            });
                          }
                        });
                      });
                  });
                });
            } else {
              props.setPopup(
                "Error",
                "Existe un pedido pendiente asociado a este estilo."
              );
              props.openPopup();
            }
        });
    } else {
      props.setPopup("data/non-identical-names");
      props.openPopup();
    }
    e.target.reset();
  };

  return (
    <div>
      <div className="col-12 justify-content-center d-flex">
        <div className="card col-5 mt-3" id="card-submit">
          <div className="card-body">
            <h4 className="text-center mb-4">
              Borrando estilo <strong>{props.name}</strong>
            </h4>
            <h5 className="text-center mb-4">
              Al realizar esta acción, eliminará <strong>TODOS</strong> los
              artículos asociados a dicho estilo.
            </h5>
            <form onSubmit={submitDelete}>
              <div className="mb-3">
                <label htmlFor="InputCategoryName" className="form-label">
                  Digite <strong>{props.name}</strong> para confirmar:
                </label>
                <input
                  type="text"
                  name="discard"
                  className="form-control"
                  id="InputName"
                  onChange={handleChange}
                  required
                />
              </div>
              <p className="text-muted"></p>
              <div className="text-center">
                <button
                  onClick={props.actionCancel}
                  className="btn btnClear mx-1"
                >
                  Cancelar
                </button>
                <button type="submit" className="btn btnAccept">
                  Confirmar eliminación
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DeleteStyle;
