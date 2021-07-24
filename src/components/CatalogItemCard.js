function CatalogItemCard(props) {
  return (
    <div className="card shadowCards my-3 mx-3">
      <img
        src={props.image}
        className="card-img-top"
        alt={"Imagen " + props.name}
      />
      <div className="card-body">
        <h4 className="card-title text-center">{props.name}</h4>
        <li className="list-group-item">
          <strong>Código: </strong>
          {props.code}
        </li>
        <li className="list-group-item">
          <strong>Precio: </strong>₡{props.price}
        </li>
        <li className="list-group-item">
          <strong>Colores disponibles:</strong>
          <ul>
            {props.color.map((color) => (
              <li key={color}>{color}</li>
            ))}
          </ul>
        </li>
        <li className="list-group-item">
          <strong>Tallas disponibles:</strong>
          <ul>
            {props.size.map((size) => (
              <li key={size}>{size}</li>
            ))}
          </ul>
        </li>
        <div className="d-flex align-items-center justify-content-around mt-3">
          <div
            className="btn-group"
            role="group"
            aria-label="Basic mixed styles example"
          >
            <button
              type="button"
              onClick={() =>
                props.actionDetails(
                  props.styleID,
                  props.styleName,
                  props.id,
                  props.name,
                  props.code,
                  props.image,
                  props.quantity,
                  props.brand,
                  props.color,
                  props.price,
                  props.size
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
