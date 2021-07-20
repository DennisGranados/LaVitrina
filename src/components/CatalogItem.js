import { Fragment, useEffect, useState } from "react";
import { useFirestore } from "reactfire";

function CatalogItem(props) {
  const firestore = useFirestore();
  const stylesRef = firestore.collection("catalog").doc("styles");
  const [item, setItem] = useState({
    itemName: "",
    itemCode: "",
    itemImage: "",
    itemColor: [],
    itemSize: [],
    itemBrand: "",
    itemPrice: "",
    itemQuantity: "",
  });

  const [order, setOrder] = useState({
    itemName: "",
    itemCode: "",
    itemImage: "",
    itemColor: [],
    itemSize: [],
    itemBrand: "",
    itemPrice: "",
    itemQuantity: "",
    flag: false,
  });

  useEffect(() => {
    setItem({
      itemName: props.name,
      itemCode: props.code,
      itemImage: props.image,
      itemColor: props.color,
      itemSize: props.size,
      itemBrand: props.brand,
      itemPrice: props.price,
      itemQuantity: props.quantity,
    });
  }, [props]);

  function fillOrder() {
    if (item.itemName === "") {
    } else if (!order.flag) {
      setOrder({
        itemName: item.itemName,
        itemCode: item.itemCode,
        itemImage: item.itemImage,
        itemColor: item.itemColor,
        itemSize: item.itemSize,
        itemBrand: item.itemBrand,
        itemPrice: item.itemPrice,
        itemQuantity: item.itemQuantity,
        itemVisible: item.itemVisible,
        flag: true,
      });
    }
  }

  const handleColor = (e) => {
    var colorSet = new Set(order.itemColor);

    if (e.target.checked) {
      colorSet.add(e.target.value);
    } else {
      colorSet.delete(e.target.value);
    }

    const arr = [...colorSet];

    setOrder({ ...order, itemColor: arr });
  };

  const handleSize = (e) => {
    var sizeSet = new Set(order.itemSize);

    if (e.target.checked) {
      sizeSet.add(e.target.value);
    } else {
      sizeSet.delete(e.target.value);
    }

    const arr = [...sizeSet];
    setOrder({ ...order, itemSize: arr });
  };

  const handleCancelEdit = () => {
    props.actionItems(props.styleID, props.styleName);
  };

  const handleChange = (e) => {
    setOrder({
      ...order,
      [e.target.name]: e.target.value.trim(),
    });
  };

  const makeOrder = (e) => {
    e.preventDefault();
  };

  return (
    <div>
      {fillOrder()}
      <div className="col-12 justify-content-center d-flex">
        <div className="card mt-3" id="card-submit">
          <div className="card-body">
            <h4 className="text-center mb-4">
              Detalles de <strong>{item.itemName}</strong>
            </h4>
            <form id="addItem" onSubmit={makeOrder}>
              <label className="form-label topMargin">
                Imagen del producto:
              </label>
              <div className="text-center my-3">
                {
                  <img
                    src={item.itemImage}
                    alt="Imagen de la prenda"
                    width="250"
                  />
                }
              </div>
              <label className="form-label topMargin">
                Código del producto: {item.itemCode}
              </label>
              <br></br>
              <label className="form-label topMargin">
                Marca del producto: {item.itemBrand}
              </label>
              <label className="form-label topMargin">
                Colores disponibles del producto (puede seleccionar varios)
              </label>
              {item.itemColor.map((color, index) => (
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
              {item.itemSize.map((size, index) => (
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
              <label className="form-label topMargin">
                Precio unitario del producto: ₡{item.itemPrice}
              </label>
              <br></br>
              <label className="form-label topMargin">Cantidad a comprar</label>
              <input
                type="number"
                name="itemQuantity"
                className="form-control"
                placeholder="Ingrese un número mayor a 0."
                min="1"
                max={item.itemQuantity}
                onChange={handleChange}
                required
              />
              <div className="text-center">
                <button type="submit" className="btn btnAccept topMargin mx-2">
                  Agregar al carrito
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

export default CatalogItem;
