import { useState } from "react";
import { useFirestore } from "reactfire";

function AddItem(props) {
  const firestore = useFirestore();
  const stylesRef = firestore.collection("catalog").doc("styles");
  const colorsRef = firestore.collection("config").doc("colors");
  const [item, setItem] = useState({
    itemName: "",
    itemCode: "",
    itemImage: "",
    itemColor: "",
    itemBrand: "",
    itemPrice: "",
    itemStyle: "",
    itemQuantity: "",
    itemVisible: "false",
  });
  const [styles, setStyles] = useState([]);
  const [colors, setColors] = useState([]);

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
          temp.push(
            <option value={color} key={color}>
              {color}
            </option>
          );
          if (colorsDB.length === temp.length) {
            setColors(temp);
          }
        });
      });
    }
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

    stylesRef
      .collection(item.itemStyle)
      .doc()
      .set({
        name: item.itemName,
        image: item.itemImage,
        color: item.itemColor,
        code: item.itemCode,
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
                "Se ha agregado la categoría con éxito."
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
  };

  return (
    <div>
      <div className="col-12 justify-content-center d-flex">
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
              <label className="form-label topMargin">Color del producto</label>
              <select
                className="form-select"
                name="itemColor"
                onChange={handleChange}
                required
              >
                <option value="">---Seleccione una opción---</option>
                {generateColors()}
                {colors}
              </select>
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
