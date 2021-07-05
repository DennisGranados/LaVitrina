function EditStyleCard(props) {
  return (
    <div className="card shadowCards">
      <img
        src={props.image}
        className="card-img-top"
        alt={"Imagen " + props.name}
      />
      <div className="card-body">
        <h4 className="card-title text-center">{props.name}</h4>
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
                className="btn btn-danger"
              >
                Borrar
              </button>
              <button
                type="button"
                onClick={() => props.actionEdit(props.id, props.name, "")}
                className="btn btn-primary"
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
                className="btn btn-primary"
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
