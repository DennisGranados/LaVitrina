import { map } from "async";
import React, { useEffect, useState } from "react";
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
    itemQuantity: "",
    itemVisible: "false",
  });
  const [styles, setStyles] = useState([]);

  function generateStyles() {
    var styles = [];

    stylesRef.get().then((content) => {
      let temp = content.data()["styles"];

      for (let style of temp) {
        stylesRef
          .collection(style)
          .doc("settings")
          .get()
          .then((styleName) => {
            styles.push(<p>{style + styleName.data().name}</p>);
            //styles.push(<option value={style}>{styleName.data().name}</option>);
          });
      }
      console.log(styles);
      setStyles(styles);
    });
  }

  const handleChange = (e) => {
    setItem({
      ...item,
      [e.target.name]: e.target.value,
    });
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

    const date = new Date();

    stylesRef
      .collection(
        item.itemName +
          "_" +
          date.getDate() +
          "_" +
          (date.getMonth() + 1) +
          "_" +
          date.getFullYear()
      )
      .doc("settings")
      .set({
        name: item.itemName,
        code: item.itemCode,
        image: item.itemImage,
        color: item.itemColor,
        brand: item.itemBrand,
        price: item.itemPrice,
        quantity: item.itemQuantity,
        visible: item.itemVisible === "true" ? true : false,
      })
      .then(() => {
        stylesRef
          .get(
            item.itemName +
              "_" +
              date.getDate() +
              "_" +
              (date.getMonth() + 1) +
              "_" +
              date.getFullYear()
          )
          .then(function (content) {
            if (content.exists) {
              props.setPopup(
                "Confirmación",
                "Se ha agregado la categoría con exito."
              );
              props.openPopup();
              e.target.reset();
            }
          });
      });
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
                Estilo del producto
                {generateStyles()}
                {styles}
              </label>
              <select name="itemStyle" onChange={handleChange} required>
                <option>Selecciona un estilo</option>
              </select>
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
