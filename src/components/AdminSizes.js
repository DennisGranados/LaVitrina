/**
 * @fileoverview AdminSizes page, manage the possible sizes of the items registered in the database.
 * @version 1.0
 * @author Carlos Cabezas Fallas
 * @author Denilson Granados Solano
 * @author Jahel Jiménez Porras
 * @author Jonathan Orozco Pérez
 * @author María Ramírez Hernández
 * History
 * v1.0 – Initial Release
 * ----
 * The first version of AdminSizes page was written by Carlos Cabezas, Denilson Granados,
 * Jahel Jiménez, Jonathan Orozco, María Ramírez.
 */
import { Fragment, useState } from "react";
import { useFirestore } from "reactfire";

function AdminSizes(props) {
  const firestore = useFirestore();
  const sizesRef = firestore.collection("config").doc("sizes");
  const [sizes, setSizes] = useState({
    newSize: "",
    sizesList: [],
  });

  // This method set the sizes to add.
  const handleChange = (e) => {
    setSizes({
      ...sizes,
      [e.target.name]: e.target.value.trim().toUpperCase(),
    });
  };

  /**
   * This method is responsible of load existing sizes that can be removed if the administrator desired.
   * @param {boolean} isUpdated
   */
  function generateSizes(isUpdated) {
    if (sizes.sizesList.length === 0 || isUpdated) {
      sizesRef.get().then((content) => {
        let sizesDB = content.data()["availableSizes"];

        var temp = [];
        if (sizesDB.length > 0 || isUpdated) {
          sizesDB.forEach(function (element) {
            temp.push(
              <div
                className="phone-number input-group ml-1 mr-1"
                key={element + "div"}
              >
                <button
                  className="input-group-text"
                  onClick={() => {
                    handleDeleteSizes(element);
                  }}
                  id="btnGroupAddon"
                  key={element + "btn"}
                >
                  <i className="bi bi-trash-fill" key={element + "i"}></i>
                </button>
                <input
                  type="text"
                  className="form-control"
                  value={element}
                  key={element + "input"}
                  readOnly
                />
              </div>
            );
          });

          setSizes({
            ...sizes,
            sizesList: temp,
          });
        }
      });
    }
  }

  // This method is responsible for adding the sizes to the database.
  const addSize = (e) => {
    e.preventDefault();

    sizesRef.get().then((content) => {
      let sizesDB = content.data()["availableSizes"];
      let duplicate = false;

      if (sizesDB.length > 0) {
        for (var i = 0; i < sizesDB.length; i++) {
          if (sizesDB[i] === sizes.newSize) {
            duplicate = true;
          }
        }
      }

      if (duplicate) {
        props.setPopup("Error", "Ya existe esta talla.");
        props.openPopup();
        e.target.reset();
      } else {
        sizesDB.push(sizes.newSize);

        sizesRef
          .update({
            availableSizes: sizesDB,
          })
          .then(() => {
            props.setPopup(
              "Confirmación",
              "Se ha agregado la talla con éxito."
            );
            props.openPopup();
            e.target.reset();
            generateSizes(true);
          })
          .catch((error) => {
            props.setPopup(error.code);
            props.openPopup();
          });
      }
    });
  };

  /**
   * This method is responsible for removing a size and updating the available ones.
   * @param {string} color
   */
  const handleDeleteSizes = (color) => {
    sizesRef.get().then((content) => {
      let sizesDB = content.data()["availableSizes"];

      if (sizesDB) {
        for (var i = 0; i < sizesDB.length; i++) {
          if (sizesDB[i] === color) {
            sizesDB.splice(i, 1);
          }
        }
        sizesRef
          .update({
            availableSizes: sizesDB,
          })
          .then(() => {
            props.setPopup(
              "Confirmación",
              "Se ha eliminado la talla con éxito."
            );
            props.openPopup();
            generateSizes(true);
          })
          .catch((error) => {
            props.setPopup(error.code);
            props.openPopup();
          });
      }
    });
  };

  return (
    <div className="col-12 justify-content-center d-flex mt-3">
      {generateSizes(false)}
      <div className="card" id="card-submit">
        <div className="card-body">
          <h4 className="text-center mb-4">Tallas existentes</h4>
          {sizes.sizesList.length > 0 ? (
            <Fragment>{sizes.sizesList}</Fragment>
          ) : (
            <Fragment>
              <div className="d-flex justify-content-center">
                <strong className="sr-only">
                  <h3>Cargando datos...</h3>
                </strong>
              </div>
              <div className="d-flex justify-content-center">
                <div
                  className="spinner-border text-warning"
                  role="status"
                ></div>
              </div>
            </Fragment>
          )}
          <div className="d-flex justify-content-around flex-wrap"></div>
          <h4 className="text-center mb-4 mt-4">Ingresar talla</h4>
          <form onSubmit={addSize}>
            <div className="mb-3">
              <label className="form-label">Nombre de la talla</label>
              <input
                type="text"
                name="newSize"
                className="form-control"
                onChange={handleChange}
                required
              />
            </div>
            <div className="text-center mt-3">
              <button type="submit" className="btn btnAccept ms-2">
                Añadir
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
export default AdminSizes;
