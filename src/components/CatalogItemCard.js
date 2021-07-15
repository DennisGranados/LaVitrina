function CatalogItemCard(props) {
  return (
    <div className="card shadowCards">
      <img
        src={props.image}
        className="card-img-top"
        alt={"Imagen " + props.name}
      />
      <div className="card-body">
        <h4 className="card-title text-center">{props.name}</h4>
        <label>
          <strong>Código:</strong> {props.code}
        </label>
        <br></br>
        <label>
          <strong>Precio:</strong> ₡{props.price}
        </label>
        <br></br>
        <label>
          <strong>Colores disponibles:</strong>{" "}
          {props.color.map((color) => (
            <li>{color}</li>
          ))}
        </label>
        <br></br>
        <label className="mb-3">
          <strong>Tallas disponibles:</strong>{" "}
          {props.size.map((size) => (
            <li>{size}</li>
          ))}
        </label>
        <div className="d-flex align-items-center justify-content-around">
          <div
            className="btn-group"
            role="group"
            aria-label="Basic mixed styles example"
          >
            <button
              type="button"
              onClick={() =>
                props.actionDetails(
                  props.id,
                  props.name,
                  props.styleName,
                  props.styleID
                )
              }
              className="btn btnAccept"
            >
              Más detalles
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CatalogItemCard;
