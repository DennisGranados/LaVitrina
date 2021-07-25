/**
 * @fileoverview EditItemCard, component responsible for displaying previous information of the item.
 * @version 1.0
 * @author Carlos Cabezas Fallas
 * @author Denilson Granados Solano
 * @author Jahel Jiménez Porras
 * @author Jonathan Orozco Pérez
 * @author María Ramírez Hernández
 * History
 * v1.0 – Initial Release
 * ----
 * The first version of EditItemCard page was written by Carlos Cabezas, Denilson Granados,
 * Jahel Jiménez, Jonathan Orozco, María Ramírez.
 */
function EditItemCard(props) {
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
          <strong>Cantidad disponible:</strong> {props.quantity}
        </li>
        <li className="list-group-item">
          <strong>Código: </strong>
          {props.code}
        </li>
        <li className="list-group-item">
          <div className="d-flex justify-content-center form-check form-switch">
            <input
              className="form-check-input"
              type="checkbox"
              id="flexSwitchCheckDefault"
              checked={props.visible}
              readOnly
            />
            <label
              className="form-check-label ms-2"
              htmlFor="flexSwitchCheckDefault"
            >
              <strong>Visible</strong>
            </label>
          </div>
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
                props.actionDelete(
                  props.id,
                  props.name,
                  props.styleName,
                  props.styleID
                )
              }
              className="btn btnAccept"
            >
              Borrar
            </button>
            <button
              type="button"
              onClick={() =>
                props.actionEdit(
                  props.id,
                  props.name,
                  props.styleName,
                  props.styleID
                )
              }
              className="btn btnClear"
            >
              Editar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditItemCard;
