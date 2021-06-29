import React, { useState } from "react";
import { useFirestore } from "reactfire";

function AddItem(props) {
  const firestore = useFirestore();
  const stylesRef = firestore.collection("catalog").doc("styles");
  const [item, setItem] = useState({
    itemName: "",
    itemCode: "",
    itemImage: "",
    itemColor: "",
    itemBrand: "",
    itemPrice: "",
    itemStyle: "undefined",
    itemQuantity: "",
    itemVisible: "false",
  });
  const [styles, setStyles] = useState([]);

  function generateStyles() {
    if (styles.length === 0) {
      stylesRef.get().then(async function (content) {
        let stylesID = content.data()["styles"];

        var temp = [];
        stylesID.forEach(async function (styleID) {
          await stylesRef
            .collection(styleID)
            .doc("settings")
            .get()
            .then((styleName) => {
              temp.push(
                <option value={styleID}>{styleName.data().name}</option>
              );
              if (stylesID.length === temp.length) {
                setStyles(temp);
              }
            });
        });
      });
    }
  }

  const handleChange = (e) => {
    setItem({
      ...item,
      [e.target.name]: e.target.value,
    });
    console.log(e.target.value);
  };

  const handleImage = (e) => {
    try {
      var fReader = new FileReader();
      fReader.readAsDataURL(e.target.files[0]);
      fReader.onloadend = function (imageResult) {
        if (imageResult.target.result.trim) {
          setItem({
            ...item,
            itemImage: imageResult.target.result,
          });
        } else {
          props.setPopup("image-not-found");
          props.openPopup();
        }
      };
    } catch (error) {
      props.setPopup("image-not-found");
      props.openPopup();
    }
  };

  const resetImage = (e) => {
    setItem({ ...item, itemImage: "" });
    e.target.reset();
  };

  const addItem = (e) => {
    e.preventDefault();

    if (item.itemStyle !== "undefined") {
      stylesRef
        .collection(item.itemStyle)
        .doc(item.itemCode)
        .set({
          name: item.itemName,
          image: item.itemImage,
          color: item.itemColor,
          brand: item.itemBrand,
          price: parseFloat(item.itemPrice),
          quantity: parseInt(item.itemQuantity),
          visible: item.itemVisible === "true" ? true : false,
        })
        .then(() => {
          stylesRef
            .get(item.itemName)
            .then(function (content) {
              if (content.exists) {
                props.setPopup(
                  "Confirmación",
                  "Se ha agregado la categoría con exito."
                );
                props.openPopup();
                e.target.reset();
              }
            })
            .catch((error) => {
              props.setPopup(error.code);
              props.openPopup();
            });
        })
        .catch((error) => {
          props.setPopup(error.code);
          props.openPopup();
        });
    } else {
      props.setPopup("Error", "Debe de seleccionar un estilo, mamapichas");
      props.openPopup();
    }
  };

  return (
    <div>
      <div className="col-12 justify-content-center dflex">
        <div className="card col-5" id="card-submit">
          <div className="card-body">
            <h4 className="text-center mb-4">Añadir nueva prenda</h4>
            <form id="addItem" onSubmit={addItem} onReset={resetImage}>
              <label className="form-label">Nombre del producto</label>
              <input
                type="text"
                name="itemName"
                className="form-control"
                onChange={handleChange}
                required
              />
              <label className="form-label topMargin">
                Código del producto
              </label>
              <input
                type="text"
                name="itemCode"
                className="form-control"
                onChange={handleChange}
                required
              />
              <label className="form-label topMargin">Color del producto</label>
              <input
                type="text"
                name="itemColor"
                className="form-control"
                onChange={handleChange}
                required
              />
              <label className="form-label topMargin">Marca del producto</label>
              <input
                type="text"
                name="itemBrand"
                className="form-control"
                onChange={handleChange}
                required
              />
              <label className="form-label topMargin">
                Precio del producto
              </label>
              <input
                type="number"
                name="itemPrice"
                className="form-control"
                min="0"
                onChange={handleChange}
                required
              />
              <label className="form-label topMargin">
                Cantidad a ingresar
              </label>
              <input
                type="number"
                name="itemQuantity"
                className="form-control"
                min="1"
                onChange={handleChange}
                required
              />
              <label className="form-label topMargin">
                Imagen del producto
              </label>
              <input
                type="file"
                accept="image/*"
                name="itemImage"
                className="form-control"
                onChange={handleImage}
                required
              />
              <div className="text-center my-3">
                {item.itemImage !== "" ? (
                  <img
                    src={item.itemImage}
                    alt="Imagen del producto"
                    width="250"
                  />
                ) : (
                  <p>No se ha cargado una imagen.</p>
                )}
              </div>
              <label className="form-label topMargin">
                Estilo del producto
              </label>
              <select
                className="styles ms-2"
                name="itemStyle"
                onChange={handleChange}
                required
              >
                <option value="undefined" selected>
                  ---Seleccione una opción---
                </option>
                {generateStyles()}
                {styles}
              </select>
              <div className="mb-3">
                <label htmlFor="InputCategoryImage" className="form-label me-3">
                  Visible:
                </label>
                <div className="form-check form-check-inline">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="itemVisible"
                    onChange={handleChange}
                    value="true"
                    required
                  />
                  <label className="form-check-label" htmlFor="inlineRadio1">
                    Si
                  </label>
                </div>
                <div className="form-check form-check-inline">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="itemVisible"
                    onChange={handleChange}
                    value="false"
                    defaultChecked
                    required
                  />
                  <label className="form-check-label" htmlFor="inlineRadio2">
                    No
                  </label>
                </div>
              </div>
              <div className="text-center">
                <button
                  type="submit"
                  className="btn btn-primary topMargin mx-2"
                >
                  Aceptar
                </button>
                <button type="reset" className="btn btn-warning topMargin mx-2">
                  Limpiar
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
export default AddItem;
