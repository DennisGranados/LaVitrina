/**
 * @fileoverview AddItem page, add a item to the database.
 * @version 1.0
 * @author Carlos Cabezas Fallas
 * @author Denilson Granados Solano
 * @author Jahel Jiménez Porras
 * @author Jonathan Orozco Pérez
 * @author María Ramírez Hernández
 * History
 * v1.0 – Initial Release
 * ----
 * The first version of AddItem page was written by Carlos Cabezas, Denilson Granados,
 * Jahel Jiménez, Jonathan Orozco, María Ramírez.
 */

import { Fragment, useState } from "react";
import { useFirestore } from "reactfire";
import Capitalize from "../Tools";
import firebase from "firebase";
import imageCompression from "browser-image-compression";

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

  const options = {
    maxSizeMB: 0.6,
    maxWidthOrHeight: 1920,
    useWebWorker: true,
  };

  // This function load the styles existents in the database, to add an item to it.
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

  // This function loads the colors that exist in the database, to select the colors of the item to add.
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

  // This function loads the sizes that exist in the database, to select the sizes of the item to add.
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

  //This method set the item to add.
  const handleChange = (e) => {
    setItem({
      ...item,
      [e.target.name]: e.target.value.trim(),
    });
  };

  // This method handles if item is visible or not.
  const handleVisible = (e) => {
    let visible;

    visible = e.target.value === "true" ? true : false;
    setItem({ ...item, [e.target.name]: visible });
  };

  // This method handles the colors selected to add the item.
  const handleColor = (e) => {
    var colorSet = new Set(item.itemColor);

    if (e.target.checked) {
      colorSet.add(e.target.value);
    } else {
      colorSet.delete(e.target.value);
    }

    const arr = [...colorSet];

    setItem({ ...item, itemColor: arr });
  };

  // This method handles the sizes selected to add the item.
  const handleSize = (e) => {
    var sizeSet = new Set(item.itemSize);

    if (e.target.checked) {
      sizeSet.add(e.target.value);
    } else {
      sizeSet.delete(e.target.value);
    }

    const arr = [...sizeSet];

    setItem({ ...item, itemSize: arr });
  };

  // This method handles the image selected to add the item.
  const handleImage = (e) => {
    try {
      imageCompression(e.target.files[0], options).then(function (
        compressedFile
      ) {
        imageCompression
          .getDataUrlFromFile(compressedFile)
          .then(function (image) {
            setItem({
              ...item,
              itemImage: image,
            });
          });
      });
    } catch (error) {
      props.setPopup("image-not-found");
      props.openPopup();
    }
  };

  // This method reset the space of the added image in the form.
  const resetImage = (e) => {
    setItem({ ...item, itemImage: "", itemColor: [], itemSize: [] });
    e.target.reset();
  };

  // This method is responsible to add an item.
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
          visible: item.itemVisible,
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
                    setItem({
                      ...item,
                      itemImage: "",
                      itemColor: [],
                      itemSize: [],
                    });
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
      {generateColors()}
      {generateSizes()}
      {generateStyles()}
      <div className="col-12 justify-content-center d-flex mt-3">
        <div className="card" id="card-submit">
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
                    onChange={handleVisible}
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
                    onChange={handleVisible}
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
