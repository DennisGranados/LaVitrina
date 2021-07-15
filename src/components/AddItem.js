import { Fragment, useState } from "react";
import { useFirestore } from "reactfire";
import Capitalize from "../Tools";
import firebase from "firebase";

function AddItem(props) {
  const firestore = useFirestore();
  const stylesRef = firestore.collection("catalog").doc("styles");
  const colorsRef = firestore.collection("config").doc("colors");
  const sizesRef = firestore.collection("config").doc("sizes");
  const [item, setItem] = useState({
    itemName: "",
    itemCode: "",
    itemImage: "",
    itemColor: [],
    itemSize: [],
    itemBrand: "",
    itemPrice: "",
    itemStyle: "",
    itemQuantity: "",
    itemVisible: false,
  });
  const [styles, setStyles] = useState([]);
  const [colors, setColors] = useState([]);
  const [sizes, setSizes] = useState([]);

  function generateStyles() {
    if (styles.length === 0) {
      stylesRef.get().then((content) => {
        let stylesID = content.data()["styles"];

        var temp = [];
        stylesID.forEach((styleID) => {
          stylesRef
            .collection(styleID)
            .doc("settings")
            .get()
            .then((styleName) => {
              temp.push(
                <option value={styleID} key={styleID}>
                  {styleName.data().name}
                </option>
              );
              if (stylesID.length === temp.length) {
                setStyles(temp);
              }
            });
        });
      });
    }
  }

  function generateColors() {
    if (colors.length === 0) {
      colorsRef.get().then((content) => {
        let colorsDB = content.data()["availableColors"];

        var temp = [];
        colorsDB.forEach((color) => {
          temp.push(color);

          if (colorsDB.length === temp.length) {
            setColors(temp);
          }
        });
      });
    }
  }

  function generateSizes() {
    if (sizes.length === 0) {
      sizesRef.get().then((content) => {
        let sizesDB = content.data()["availableSizes"];

        var temp = [];
        sizesDB.forEach((size) => {
          temp.push(size);

          if (sizesDB.length === temp.length) {
            setSizes(temp);
          }
        });
      });
    }
  }

  const handleChange = (e) => {
    setItem({
      ...item,
      [e.target.name]: e.target.value.trim(),
    });
  };

  const handleColor = (e) => {
    let tempContent = item.itemColor;

    if (e.target.checked) {
      tempContent.push(e.target.value);

      setItem({ ...item, itemColor: tempContent });
    } else {
      for (var i = 0; i < tempContent.length; i++) {
        if (tempContent[i] === e.target.value) {
          tempContent.splice(i, 1);
        }
      }

      setItem({ ...item, itemColor: tempContent });
    }
  };

  const handleSize = (e) => {
    let tempContent = item.itemSize;

    if (e.target.checked) {
      tempContent.push(e.target.value);
      setItem({ ...item, itemSize: tempContent });
    } else {
      for (var i = 0; i < tempContent.length; i++) {
        if (tempContent[i] === e.target.value) {
          tempContent.splice(i, 1);
        }
      }

      setItem({ ...item, itemSize: tempContent });
    }
  };

  const handleImage = (e) => {
    try {
      var fReader = new FileReader();
      fReader.readAsDataURL(e.target.files[0]);
      fReader.onloadend = function (imageResult) {
        if (imageResult.target.result) {
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
    setItem({ ...item, itemImage: "", itemColor: [], itemSize: [] });
    e.target.reset();
  };

  const addItem = (e) => {
    e.preventDefault();
    let color = false;
    let size = false;

    if (item.itemColor.length === 0) {
      props.setPopup("Error", "Debe de seleccionar al menos un color.");
      props.openPopup();
    } else {
      color = true;
    }

    if (item.itemSize.length === 0) {
      props.setPopup("Error", "Debe de seleccionar al menos una talla.");
      props.openPopup();
    } else {
      size = true;
    }

    if (color && size) {
      stylesRef
        .collection(item.itemStyle)
        .doc()
        .set({
          name: Capitalize(item.itemName),
          image: item.itemImage,
          color: item.itemColor,
          size: item.itemSize,
          code: Capitalize(item.itemCode),
          brand: Capitalize(item.itemBrand),
          price: parseFloat(item.itemPrice),
          quantity: parseInt(item.itemQuantity),
          visible: item.itemVisible === "true" ? true : false,
        })
        .then(() => {
          stylesRef
            .get(Capitalize(item.itemName))
            .then(function (content) {
              if (content.exists) {
                stylesRef
                  .collection(item.itemStyle)
                  .doc("settings")
                  .update({
                    length: firebase.firestore.FieldValue.increment(1),
                  })
                  .then(() => {
                    props.setPopup(
                      "Confirmación",
                      "Se ha agregado el producto con éxito."
                    );
                    props.openPopup();
                    e.target.reset();
                    setItem({ ...item, itemColor: [], itemSize: [] });
                  });
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
    }
  };

  return (
    <div>
      <div className="col-12 justify-content-center d-flex mt-3">
        <div className="card col-5" id="card-submit">
          <div className="card-body">
            <h4 className="text-center mb-4">Añadir nuevo producto</h4>
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
                Colores disponibles del producto (puede seleccionar varios)
              </label>
              {generateColors()}
              {colors.map((color, index) => (
                <Fragment key={`${color}~${index}`}>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      value={color}
                      onChange={handleColor}
                    />
                    <label className="form-check-label">{color}</label>
                  </div>
                </Fragment>
              ))}
              <label className="form-form-label topMargin">
                Tallas disponibles del producto (puede seleccionar varias)
              </label>
              {generateSizes()}
              {sizes.map((size, index) => (
                <Fragment key={`${size}~${index}`}>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      value={size}
                      onChange={handleSize}
                    />
                    <label className="form-check-label">{size}</label>
                  </div>
                </Fragment>
              ))}
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
              <div className="input-group mb-3">
                <span className="input-group-text">₡</span>
                <input
                  type="number"
                  name="itemPrice"
                  className="form-control"
                  min="0"
                  onChange={handleChange}
                  required
                />
              </div>
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
                className="form-select"
                name="itemStyle"
                onChange={handleChange}
                required
              >
                <option value="">---Seleccione una opción---</option>
                {generateStyles()}
                {styles}
              </select>
              <div className="mb-2 mt-4">
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
                <button type="submit" className="btn btnAccept topMargin mx-2">
                  Aceptar
                </button>
                <button type="reset" className="btn btnClear topMargin mx-2">
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
