/**
 * @fileoverview EditStyleCard, component responsible for displaying previous information of the style.
 * @version 1.0
 * @author Carlos Cabezas Fallas
 * @author Denilson Granados Solano
 * @author Jahel Jiménez Porras
 * @author Jonathan Orozco Pérez
 * @author María Ramírez Hernández
 * History
 * v1.0 – Initial Release
 * ----
 * The first version of EditStyleCard page was written by Carlos Cabezas, Denilson Granados,
 * Jahel Jiménez, Jonathan Orozco, María Ramírez.
 */
function EditStyleCard(props) {
  return (
    <div className="card shadowCards mx-2 my-2">
      <img
        src={props.image}
        className="card-img-top"
        alt={"Imagen " + props.name}
      />
      <div className="card-body">
        <h4 className="card-title text-center">{props.name}</h4>
        <li className="list-group-item">
          <strong>Cantidad de productos:</strong> {props.length}
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
          {props.type === "style" ? (
            <div
              className="btn-group"
              role="group"
              aria-label="Basic mixed styles example"
            >
              <button
                type="button"
                onClick={() => props.actionDelete(props.id, props.name, "")}
                className="btn btnAccept"
              >
                Borrar
              </button>
              <button
                type="button"
                onClick={() => props.actionEdit(props.id, props.name, "")}
                className="btn btnClear"
              >
                Editar
              </button>
            </div>
          ) : (
            <div
              className="btn-group"
              role="group"
              aria-label="Basic mixed styles example"
            >
              <button
                type="button"
                onClick={() => props.actionItems(props.id, props.name)}
                className="btn btnAccept"
              >
                Acceder al estilo
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default EditStyleCard;
