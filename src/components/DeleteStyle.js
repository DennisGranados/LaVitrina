import React, { useState } from "react";
import { useFirestore } from "reactfire";

function DeleteStyle(props) {
  const [discard, setDiscard] = useState(undefined);
  const firestore = useFirestore();
  const stylesRef = firestore.collection("catalog").doc("styles");

  const handleChange = (e) => {
    setDiscard(e.target.value);
  };

  const submitDelete = (e) => {
    e.preventDefault();

    if (discard === props.name) {
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
      props.setPopup("data/non-identical-names");
      props.openPopup();
    }
    e.target.reset();
  };

  return (
    <div>
      <div className="col-12 justify-content-center d-flex">
        <div className="card col-5" id="card-submit">
          <div className="card-body">
            <h4 className="text-center mb-4">
              Borrando estilo <strong>{props.name}</strong>{" "}
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
                  className="btn btn-danger mx-1"
                >
                  Cancelar
                </button>
                <button type="submit" className="btn btn-primary">
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
