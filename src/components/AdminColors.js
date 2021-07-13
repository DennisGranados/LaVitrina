import { useState } from "react";
import { useFirestore } from "reactfire";
import Capitalize from "../Tools";

function AdminColors(props) {
  const firestore = useFirestore();
  const colorsRef = firestore.collection("config").doc("colors");
  const [colors, setColors] = useState({
    newColor: "",
    colorsList: [],
  });

  const handleChange = (e) => {
    setColors({
      ...colors,
      [e.target.name]: Capitalize(e.target.value),
    });
  };

  function generateColors(isUpdated) {
    if (colors.colorsList.length === 0 || isUpdated) {
      colorsRef.get().then((content) => {
        let colorsDB = content.data()["availableColors"];

        var temp = [];
        if (colorsDB.length > 0 || isUpdated) {
          colorsDB.forEach(function (element) {
            temp.push(
              <div
                className="phone-number input-group ml-1 mr-1"
                key={element + "div"}
              >
                <button
                  className="input-group-text"
                  onClick={() => {
                    handleDeleteColors(element);
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

          setColors({
            ...colors,
            colorsList: temp,
          });
        }
      });
    }
  }

  const addColor = (e) => {
    e.preventDefault();

    colorsRef.get().then((content) => {
      let colorsDB = content.data()["availableColors"];
      let duplicate = false;

      if (colorsDB.length > 0) {
        for (var i = 0; i < colorsDB.length; i++) {
          if (colorsDB[i] === colors.newColor) {
            duplicate = true;
          }
        }
      }

      if (duplicate) {
        props.setPopup("Error", "Ya existe este color.");
        props.openPopup();
        e.target.reset();
      } else {
        colorsDB.push(colors.newColor);

        colorsRef
          .update({
            availableColors: colorsDB,
          })
          .then(() => {
            props.setPopup(
              "Confirmación",
              "Se ha agregado el color con éxito."
            );
            props.openPopup();
            e.target.reset();
            generateColors(true);
          })
          .catch((error) => {
            props.setPopup(error.code);
            props.openPopup();
          });
      }
    });
  };

  const handleDeleteColors = (color) => {
    colorsRef.get().then((content) => {
      let colorsDB = content.data()["availableColors"];

      if (colorsDB) {
        for (var i = 0; i < colorsDB.length; i++) {
          if (colorsDB[i] === color) {
            colorsDB.splice(i, 1);
          }
        }
        colorsRef
          .update({
            availableColors: colorsDB,
          })
          .then(() => {
            props.setPopup(
              "Confirmación",
              "Se ha eliminado el color con éxito."
            );
            props.openPopup();
            generateColors(true);
          })
          .catch((error) => {
            props.setPopup(error.code);
            props.openPopup();
          });
      }
    });
  };

  return (
    <div className="row justify-content-center">
      <div className="card col-12 me-3" id="card-submit">
        <div className="card-body">
          <h4 className="text-center mb-4">Colores existentes</h4>
          {generateColors(false)}
          {colors.colorsList}
          <div className="d-flex justify-content-around flex-wrap"></div>
          <h4 className="text-center mb-4 mt-3">Ingresar color</h4>
          <form className="col-12" onSubmit={addColor}>
            <div className="mb-3">
              <label className="form-label">Nombre del color</label>
              <input
                type="text"
                name="newColor"
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
export default AdminColors;
