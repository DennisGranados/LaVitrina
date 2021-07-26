/**
 * @fileoverview EditItem, component that allows edit items.
 * @version 1.0
 * @author Carlos Cabezas Fallas
 * @author Denilson Granados Solano
 * @author Jahel Jiménez Porras
 * @author Jonathan Orozco Pérez
 * @author María Ramírez Hernández
 * History
 * v1.0 – Initial Release
 * ----
 * The first version of EditItem page was written by Carlos Cabezas, Denilson Granados,
 * Jahel Jiménez, Jonathan Orozco, María Ramírez.
 */
import imageCompression from "browser-image-compression";
import { Fragment, useEffect, useState } from "react";
import { useFirestore } from "reactfire";
import Capitalize from "../Tools";

function EditItem(props) {
  const firestore = useFirestore();
  const stylesRef = firestore.collection("catalog").doc("styles");
  const colorsRef = firestore.collection("config").doc("colors");
  const sizesRef = firestore.collection("config").doc("sizes");
  const [oldItem, setOldItem] = useState({
    itemName: "",
    itemCode: "",
    itemImage: "",
    itemColor: [],
    itemSize: [],
    itemBrand: "",
    itemPrice: "",
    itemQuantity: "",
    itemVisible: false,
  });
  const [newItem, setNewItem] = useState({
    itemName: "",
    itemCode: "",
    itemImage: "",
    itemColor: [],
    itemSize: [],
    itemBrand: "",
    itemPrice: "",
    itemQuantity: "",
    itemVisible: false,
    flag: false,
    edited: false,
    ready: false,
  });
  const [colors, setColors] = useState([]);
  const [sizes, setSizes] = useState([]);
  const options = {
    maxSizeMB: 0.6,
    maxWidthOrHeight: 1920,
    useWebWorker: true,
  };

  // This method is responsible for defining the old values of the item.
  useEffect(() => {
    stylesRef
      .collection(props.styleID)
      .doc(props.id)
      .get()
      .then((element) => {
        let colorsDB = element.data()["color"];
        let sizesDB = element.data()["size"];

        setOldItem({
          itemName: element.data().name,
          itemCode: element.data().code,
          itemImage: element.data().image,
          itemColor: colorsDB,
          itemSize: sizesDB,
          itemBrand: element.data().brand,
          itemPrice: element.data().price,
          itemQuantity: element.data().quantity,
          itemVisible: element.data().visible,
        });
      });
  }, [props, newItem.ready]);

  // This method is responsible for defining the new values of the item.
  function fillNewItem() {
    if (oldItem.itemName === "") {
    } else if (!newItem.flag) {
      setNewItem({
        itemName: oldItem.itemName,
        itemCode: oldItem.itemCode,
        itemImage: oldItem.itemImage,
        itemColor: [],
        itemSize: [],
        itemBrand: oldItem.itemBrand,
        itemPrice: oldItem.itemPrice,
        itemQuantity: oldItem.itemQuantity,
        itemVisible: oldItem.itemVisible,
        flag: true,
      });
    }
  }

  // This function loads the colors that exist in the database, to select the colors of the item to modify.
  function generateColors() {
    if (colors.length === 0) {
      colorsRef.get().then((content) => {
        let colorsDB = [];
        colorsDB = content.data()["availableColors"];

        var temp = [];

        colorsDB.forEach((color) => {
          temp.push(color);

          if (colorsDB.length === temp.length) {
            if (oldItem.itemColor.length > 0) {
              var colorSet = new Set(temp);

              oldItem.itemColor.forEach((element) => {
                colorSet.add(element);
              });

              const arr = [...colorSet];

              setColors(arr);
            } else {
              setColors(temp);
            }
          }
        });
      });
    }
  }

  // This function loads the sizes that exist in the database, to select the sizes of the item to modify.
  function generateSizes() {
    if (sizes.length === 0) {
      sizesRef.get().then((content) => {
        let sizesDB = content.data()["availableSizes"];

        var temp = [];

        sizesDB.forEach((size) => {
          temp.push(size);

          if (sizesDB.length === temp.length) {
            if (oldItem.itemSize.length > 0) {
              var sizeSet = new Set(temp);

              oldItem.itemSize.forEach((element) => {
                sizeSet.add(element);
              });

              const arr = [...sizeSet];

              setSizes(arr);
            } else {
              setSizes(temp);
            }
          }
        });
      });
    }
  }

  // This method set the colors selected by the user.
  const handleColor = (e) => {
    var colorSet = new Set(newItem.itemColor);

    if (e.target.checked) {
      colorSet.add(e.target.value);
    } else {
      colorSet.delete(e.target.value);
    }

    const arr = [...colorSet];

    setNewItem({ ...newItem, itemColor: arr, edited: true });
  };

  // This method set the sizes selected by the user.
  const handleSize = (e) => {
    var sizeSet = new Set(newItem.itemSize);

    if (e.target.checked) {
      sizeSet.add(e.target.value);
    } else {
      sizeSet.delete(e.target.value);
    }

    const arr = [...sizeSet];

    setNewItem({ ...newItem, itemSize: arr, edited: true });
  };

  // This method is responsible for canceling the edition of the item.
  const handleCancelEdit = () => {
    props.actionItems(props.styleID, props.styleName);
  };

  // This method set the new item.
  const handleChange = (e) => {
    setNewItem({
      ...newItem,
      [e.target.name]: e.target.value.trim(),
      edited: true,
    });
  };

  // This method is responsible for update if an item is visible or not.
  const handleVisible = (e) => {
    let visible;

    visible = e.target.value === "true" ? true : false;
    setNewItem({ ...newItem, [e.target.name]: visible, edited: true });
  };

  // This method is responsible for update the image of the item.
  const handleImage = (e) => {
    try {
      imageCompression(e.target.files[0], options).then(function (
        compressedFile
      ) {
        imageCompression
          .getDataUrlFromFile(compressedFile)
          .then(function (image) {
            setNewItem({
              ...newItem,
              itemImage: image,
              edited: true,
            });
          });
      });
    } catch (error) {
      props.setPopup("image-not-found");
      props.openPopup();
    }
  };

  // This method is responsible for update the item selected.
  const updateItem = (e) => {
    e.preventDefault();
    let color = false;
    let size = false;
    let change = false;

    if (newItem.itemColor.length === 0) {
      props.setPopup("Error", "Debe de seleccionar al menos un color.");
      props.openPopup();
    } else {
      color = true;
    }

    if (newItem.itemSize.length === 0) {
      props.setPopup("Error", "Debe de seleccionar al menos una talla.");
      props.openPopup();
    } else {
      size = true;
    }

    if (!newItem.edited) {
      props.setPopup("Error", "Debe de editar al menos un valor del artículo.");
      props.openPopup();
    } else {
      change = true;
    }

    if (color && size && change) {
      stylesRef
        .collection(props.styleID)
        .doc(props.id)
        .update({
          name: Capitalize(newItem.itemName),
          image: newItem.itemImage,
          color: newItem.itemColor,
          size: newItem.itemSize,
          code: Capitalize(newItem.itemCode),
          brand: Capitalize(newItem.itemBrand),
          price: parseFloat(newItem.itemPrice),
          quantity: parseInt(newItem.itemQuantity),
          visible: newItem.itemVisible,
        })
        .then(() => {
          stylesRef
            .get(Capitalize(newItem.itemName))
            .then(function (content) {
              if (content.exists) {
                props.setPopup(
                  "Confirmación",
                  "Se ha modificado el producto con éxito."
                );
                props.openPopup();
                e.target.reset();
                setNewItem({
                  ...newItem,
                  ready: true,
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
      {fillNewItem()}
      {generateColors()}
      {generateSizes()}
      <div className="col-12 justify-content-center d-flex">
        <div className="card mt-3" id="card-submit">
          <div className="card-body">
            <h4 className="text-center mb-4">
              Editando <strong>{oldItem.itemName}</strong>
            </h4>
            <form id="addItem" onSubmit={updateItem}>
              <label className="form-label">Nombre del producto</label>
              <input
                type="text"
                name="itemName"
                className="form-control"
                value={newItem.itemName || ""}
                placeholder={oldItem.itemName}
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
                value={newItem.itemCode}
                placeholder={oldItem.itemCode}
                onChange={handleChange}
                required
              />
              <label className="form-label topMargin">
                Colores disponibles del producto (puede seleccionar varios)
              </label>
              {colors.map((color, index) =>
                oldItem.itemColor.includes(color) ? (
                  <Fragment key={`${color}~${index}`}>
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        value={color}
                        onChange={handleColor}
                        defaultChecked="true"
                      />
                      <label className="form-check-label">{color}</label>
                    </div>
                  </Fragment>
                ) : (
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
                )
              )}
              <label className="form-form-label topMargin">
                Tallas disponibles del producto (puede seleccionar varias)
              </label>
              {sizes.map((size, index) =>
                oldItem.itemSize.includes(size) ? (
                  <Fragment key={`${size}~${index}`}>
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        value={size}
                        onChange={handleSize}
                        checked
                      />
                      <label className="form-check-label">{size}</label>
                    </div>
                  </Fragment>
                ) : (
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
                )
              )}
              <label className="form-label topMargin">Marca del producto</label>
              <input
                type="text"
                name="itemBrand"
                className="form-control"
                value={newItem.itemBrand}
                placeholder={oldItem.itemBrand}
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
                  value={newItem.itemPrice}
                  placeholder={oldItem.itemPrice}
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
                value={newItem.itemQuantity}
                placeholder={oldItem.itemQuantity}
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
              />
              <div className="text-center my-3">
                {newItem.itemImage ? (
                  <img
                    src={newItem.itemImage}
                    alt="Imagen vieja de la prenda"
                    width="250"
                  />
                ) : (
                  <img
                    src={oldItem.itemImage}
                    alt="Imagen nueva de la prenda"
                    width="250"
                  />
                )}
              </div>
              <div className="mb-2 mt-4">
                <label htmlFor="InputCategoryImage" className="form-label me-3">
                  {oldItem.itemVisible ? (
                    <Fragment>
                      Visible (<strong>Sí</strong>):
                    </Fragment>
                  ) : (
                    <Fragment>
                      Visible (<strong>No</strong>):
                    </Fragment>
                  )}
                </label>
                <div className="form-check form-check-inline">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="itemVisible"
                    onChange={handleVisible}
                    value="true"
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
                <button
                  onClick={handleCancelEdit}
                  type="cancel"
                  className="btn btnClear topMargin mx-2"
                >
                  Regresar
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditItem;
