import { useEffect, useState } from "react";
import { useFirestore } from "reactfire";

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
    itemStyle: "",
    itemQuantity: "",
    itemVisible: "false",
  });
  const [newItem, setItem] = useState({
    itemName: "",
    itemCode: "",
    itemImage: "",
    itemColor: [],
    itemSize: [],
    itemBrand: "",
    itemPrice: "",
    itemStyle: "",
    itemQuantity: "",
    itemVisible: "false",
  });
  const [colors, setColors] = useState([]);
  const [sizes, setSizes] = useState([]);
  const [visible, setVisible] = useState([]);
  const [temp, setTemp] = useState([]);

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
  }, [props, temp]);

  function generateColors() {
    if (colors.length === 0) {
      colorsRef.get().then((content) => {
        let colorsDB = content.data()["availableColors"];

        var temp = [];
        colorsDB.forEach((color) => {
          temp.push(
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                value={color}
                onChange={handleColor}
                key={color}
              />
              <label className="form-check-label">{color}</label>
            </div>
          );

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
          temp.push(
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                value={size}
                onChange={handleSize}
                key={size}
              />
              <label className="form-check-label">{size}</label>
            </div>
          );

          if (sizesDB.length === temp.length) {
            setSizes(temp);
          }
        });
      });
    }
  }

  const handleColor = (e) => {
    let tempContent = newItem.itemColor;

    if (e.target.checked) {
      tempContent.push(e.target.value);

      setItem({ ...newItem, itemColor: tempContent });
    } else {
      for (var i = 0; i < tempContent.length; i++) {
        if (tempContent[i] === e.target.value) {
          tempContent.splice(i, 1);
        }
      }

      setItem({ ...newItem, itemColor: tempContent });
    }
  };

  const handleSize = (e) => {
    let tempContent = newItem.itemSize;

    if (e.target.checked) {
      tempContent.push(e.target.value);

      setItem({ ...newItem, itemSize: tempContent });
    } else {
      for (var i = 0; i < tempContent.length; i++) {
        if (tempContent[i] === e.target.value) {
          tempContent.splice(i, 1);
        }
      }

      setItem({ ...newItem, itemSize: tempContent });
    }
  };

  function isVisible() {
    if (visible.length === 0) {
      let temp = [];

      if (oldItem.visible === true) {
        temp.push(
          <div>
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="radio"
                name="itemVisible"
                onChange={handleChange}
                value="true"
                defaultChecked
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
                required
              />
              <label className="form-check-label" htmlFor="inlineRadio2">
                No
              </label>
            </div>
          </div>
        );
        setVisible(temp);
      } else {
        temp.push(
          <div>
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
        );
        setVisible(temp);
      }
    }
  }

  const handleCancelEdit = () => {
    props.actionItems(props.styleID, props.styleName);
  };

  const handleChange = (e) => {
    setItem({
      ...newItem,
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
            ...newItem,
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

  const updateName = (e) => {
    e.preventDefault();

    stylesRef
      .collection(props.styleID)
      .doc(props.id)
      .update({
        name: newItem.itemName,
      })
      .then(() => {
        props.setPopup("Confirmación", "Se ha modificado el nombre con éxito.");
        props.openPopup();
        e.target.reset();
        setTemp([]);
      })
      .catch((error) => {
        props.setPopup(error.code);
        props.openPopup();
      });
  };

  const updateCode = (e) => {
    e.preventDefault();

    stylesRef
      .collection(props.styleID)
      .doc(props.id)
      .update({
        code: newItem.itemCode,
      })
      .then(() => {
        props.setPopup("Confirmación", "Se ha modificado el código con éxito.");
        props.openPopup();
        e.target.reset();
        setTemp([]);
      })
      .catch((error) => {
        props.setPopup(error.code);
        props.openPopup();
      });
  };

  const updateColor = (e) => {
    e.preventDefault();

    stylesRef
      .collection(props.styleID)
      .doc(props.id)
      .update({
        color: newItem.itemColor,
      })
      .then(() => {
        props.setPopup(
          "Confirmación",
          "Se han modificado los colores con éxito."
        );
        props.openPopup();
        e.target.reset();
        setTemp([]);
      })
      .catch((error) => {
        props.setPopup(error.code);
        props.openPopup();
      });
  };

  const updateSize = (e) => {
    e.preventDefault();

    stylesRef
      .collection(props.styleID)
      .doc(props.id)
      .update({
        size: newItem.itemSize,
      })
      .then(() => {
        props.setPopup(
          "Confirmación",
          "Se han modificado las tallas con éxito."
        );
        props.openPopup();
        e.target.reset();
        setTemp([]);
      })
      .catch((error) => {
        props.setPopup(error.code);
        props.openPopup();
      });
  };

  const updateBrand = (e) => {
    e.preventDefault();

    stylesRef
      .collection(props.styleID)
      .doc(props.id)
      .update({
        brand: newItem.itemBrand,
      })
      .then(() => {
        props.setPopup("Confirmación", "Se ha modificado la marca con éxito.");
        props.openPopup();
        e.target.reset();
        setTemp([]);
      })
      .catch((error) => {
        props.setPopup(error.code);
        props.openPopup();
      });
  };

  const updatePrice = (e) => {
    e.preventDefault();

    stylesRef
      .collection(props.styleID)
      .doc(props.id)
      .update({
        price: parseFloat(newItem.itemPrice),
      })
      .then(() => {
        props.setPopup("Confirmación", "Se ha modificado el precio con éxito.");
        props.openPopup();
        e.target.reset();
        setTemp([]);
      })
      .catch((error) => {
        props.setPopup(error.code);
        props.openPopup();
      });
  };

  const updateQuantity = (e) => {
    e.preventDefault();

    stylesRef
      .collection(props.styleID)
      .doc(props.id)
      .update({
        quantity: parseInt(newItem.itemQuantity),
      })
      .then(() => {
        props.setPopup(
          "Confirmación",
          "Se ha modificado la cantidad de productos disponibles con éxito."
        );
        props.openPopup();
        e.target.reset();
        setTemp([]);
      })
      .catch((error) => {
        props.setPopup(error.code);
        props.openPopup();
      });
  };

  const updateImage = (e) => {
    e.preventDefault();

    stylesRef
      .collection(props.styleID)
      .doc(props.id)
      .update({
        image: newItem.itemImage,
      })
      .then(() => {
        props.setPopup("Confirmación", "Se ha modificado la imagen con éxito.");
        props.openPopup();
        e.target.reset();
        setTemp([]);
      })
      .catch((error) => {
        props.setPopup(error.code);
        props.openPopup();
      });
  };

  const updateVisible = (e) => {
    e.preventDefault();

    stylesRef
      .collection(props.styleID)
      .doc(props.id)
      .update({
        visible: newItem.itemVisible === "true" ? true : false,
      })
      .then(() => {
        props.setPopup(
          "Confirmación",
          "Se ha modificado la visibilidad con éxito."
        );
        props.openPopup();
        e.target.reset();
        setTemp([]);
      })
      .catch((error) => {
        props.setPopup(error.code);
        props.openPopup();
      });
  };

  return (
    <div>
      <div className="col-12 justify-content-center d-flex">
        <div className="card col-5" id="card-submit">
          <div className="card-body">
            <h4 className="text-center mb-4">
              Editando <strong>{oldItem.itemName}</strong>
            </h4>
            <div className="col mt-3">
              <label className="form-label">Nombre del producto</label>
              <form
                className="col-12 justify-content-center d-flex"
                onSubmit={updateName}
              >
                <input
                  type="text"
                  name="itemName"
                  className="form-control"
                  onChange={handleChange}
                  placeholder={oldItem.itemName}
                  required
                />
                <div className="text-center mt-3">
                  <button type="submit" className="btn btnAccept ms-2">
                    Actualizar
                  </button>
                </div>
              </form>
            </div>
            <div className="col mt-3">
              <label className="form-label">Código del producto</label>
              <form
                className="col-12 justify-content-center d-flex"
                onSubmit={updateCode}
              >
                <input
                  type="text"
                  name="itemCode"
                  className="form-control"
                  onChange={handleChange}
                  placeholder={oldItem.itemCode}
                  required
                />
                <div className="text-center mt-3">
                  <button type="submit" className="btn btnAccept ms-2">
                    Actualizar
                  </button>
                </div>
              </form>
            </div>
            <div className="col mt-3">
              <label className="form-label">
                Colores disponibles del producto (puede seleccionar varios)
                <br></br>
                <br></br>
                Los colores actuales son:{" "}
                {oldItem.itemColor.map((color) => (
                  <strong>
                    <p>{color}</p>
                  </strong>
                ))}
              </label>
              <form
                className="col-12 justify-content-center d-flex"
                onSubmit={updateColor}
              >
                {generateColors()}
                {colors}
                <div className="text-center mt-3">
                  <button type="submit" className="btn btnAccept ms-2">
                    Actualizar
                  </button>
                </div>
              </form>
            </div>
            <div className="col mt-3">
              <label className="form-label">
                Tallas disponibles del producto (puede seleccionar varias)
                <br></br>
                <br></br>
                Las tallas actuales son:{" "}
                {oldItem.itemSize.map((size) => (
                  <strong>
                    <p>{size}</p>
                  </strong>
                ))}
              </label>
              <form
                className="col-12 justify-content-center d-flex"
                onSubmit={updateSize}
              >
                {generateSizes()}
                {sizes}
                <div className="text-center mt-3">
                  <button type="submit" className="btn btnAccept ms-2">
                    Actualizar
                  </button>
                </div>
              </form>
            </div>
            <div className="col mt-3">
              <label className="form-label">Marca del producto</label>
              <form
                className="col-12 justify-content-center d-flex"
                onSubmit={updateBrand}
              >
                <input
                  type="text"
                  name="itemBrand"
                  className="form-control"
                  onChange={handleChange}
                  placeholder={oldItem.itemBrand}
                  required
                />
                <div className="text-center mt-3">
                  <button type="submit" className="btn btnAccept ms-2">
                    Actualizar
                  </button>
                </div>
              </form>
            </div>
            <div className="col mt-3">
              <label className="form-label">Precio del producto</label>
              <form
                className="col-12 justify-content-center d-flex"
                onSubmit={updatePrice}
              >
                <div className="input-group mb-3">
                  <span className="input-group-text">₡</span>
                  <input
                    type="number"
                    name="itemPrice"
                    className="form-control"
                    min="0"
                    placeholder={oldItem.itemPrice}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="text-center mt-3">
                  <button type="submit" className="btn btnAccept ms-2">
                    Actualizar
                  </button>
                </div>
              </form>
            </div>
            <div className="col mt-3">
              <label className="form-label">Cantidad a actualizar </label>
              <form
                className="col-12 justify-content-center d-flex"
                onSubmit={updateQuantity}
              >
                <input
                  type="number"
                  name="itemQuantity"
                  className="form-control"
                  min="1"
                  onChange={handleChange}
                  placeholder={oldItem.itemQuantity}
                  required
                />
                <div className="text-center mt-3">
                  <button type="submit" className="btn btnAccept ms-2">
                    Actualizar
                  </button>
                </div>
              </form>
            </div>
            <div className="col mt-3">
              <label className="form-label">Imagen del producto</label>
              <form
                className="col-12 justify-content-center d-flex"
                onSubmit={updateImage}
              >
                <input
                  type="file"
                  accept="image/*"
                  name="itemImage"
                  className="form-control"
                  onChange={handleImage}
                  required
                />
                <div className="text-center mt-3">
                  <button type="submit" className="btn btnAccept ms-2">
                    Actualizar
                  </button>
                </div>
              </form>
              <div className="text-center my-3">
                {newItem.itemImage !== "" ? (
                  <img
                    src={newItem.itemImage}
                    alt="Imagen del producto"
                    width="250"
                  />
                ) : (
                  <img
                    src={oldItem.itemImage}
                    alt="Imagen del producto"
                    width="250"
                  />
                )}
              </div>
            </div>
            <div className="col mt-3">
              <form
                className="col-12 justify-content-center d-flex"
                onSubmit={updateVisible}
              >
                <div className="col-9 mb-2 mt-3 d-flex">
                  <label
                    htmlFor="InputCategoryImage"
                    className="form-label me-3"
                  >
                    Visible:
                  </label>
                  {isVisible()}
                  {visible}
                </div>
                <div className="text-center mt-3">
                  <button type="submit" className="btn btnAccept ms-2">
                    Actualizar
                  </button>
                </div>
              </form>
            </div>
            <div className="text-center">
              <button
                onClick={handleCancelEdit}
                type="cancel"
                className="btn btn-warning topMargin mx-2"
              >
                Regresar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditItem;
