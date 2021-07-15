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
        <label className="mb-3">Cantidad de productos: {props.length}</label>
        <div className="d-flex justify-content-center my-3 form-check form-switch">
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
            Visible
          </label>
        </div>
        <div className="d-flex align-items-center justify-content-around">
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
