function EditStyleItem(props) {
  return (
    <div className="card">
      <img src={props.image} className="card-img-top" alt="Image" />
      <div className="card-body">
        <h5
          className="card-title text-center"
          style={{ textTransform: "capitalize" }}
        >
          {props.title}
        </h5>
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
          <div
            className="btn-group"
            role="group"
            aria-label="Basic mixed styles example"
          >
            {/*<button
              type="button"
              onClick={() => props.delete(props.id, props.title, props.gender)}
              className="btn btn-danger"
            >
              Borrar
            </button>*/}
            <button
              type="button"
              onClick={() => props.edit(props.id)}
              class="btn btn-primary"
            >
              Editar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditStyleItem;
