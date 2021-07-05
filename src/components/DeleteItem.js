import React, { useState } from "react";
import { useFirestore } from "reactfire";

function DeleteItem(props) {
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
        .collection(props.styleID)
        .doc(props.id)
        .delete()
        .then(() => {
          props.setPopup(
            "Confirmación",
            "Se ha eliminado el producto con éxito."
          );
          props.openPopup();
          props.actionItems(props.styleID, props.styleName);
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
              Borrando producto <strong>{props.name}</strong>{" "}
            </h4>
            <h5 className="text-center mb-4">
              Al realizar esta acción, eliminará el producto del estilo al que
              pertenece.
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
                  onClick={() =>
                    props.actionItems(props.styleID, props.styleName)
                  }
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

export default DeleteItem;