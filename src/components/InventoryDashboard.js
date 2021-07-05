import { Link } from "react-router-dom";

function InventoryDashboard() {
  return (
    <div>
      <div className="col-12 justify-content-center d-flex mb-3">
        <div className="col-6 text-center">
          <h1>Estilos</h1>
        </div>
        <div className="col-6 text-center">
          <h1>Productos</h1>
        </div>
      </div>
      <div className="col-12 justify-content-center d-flex mb-3 mx-3">
        <div className="col-6 m-auto d-flex">
          <div className="col-6 m-auto">
            <div className="card shadowCards">
              <div className="card-body">
                <h5 className="card-title text-center">Añadir estilo</h5>
                <p className="card-text text-justify">
                  Añade un nuevo estilo de prendas.
                </p>
                <div className="text-center">
                  <Link
                    className="btn btnAccept"
                    to="/admin/inventory/add-styles"
                  >
                    Ir a la sección
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div className="col-6 m-auto">
            <div className="card shadowCards">
              <div className="card-body">
                <h5 className="card-title text-center">Editar estilos</h5>
                <p className="card-text text-justify">
                  Modifica y elimina los estilos existentes de prendas
                  disponibles (vestidos, blusas, etc).
                </p>
                <div className="text-center">
                  <Link
                    className="btn btnAccept"
                    to="/admin/inventory/edit-styles"
                  >
                    Ir a la sección
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="vl text-center me-1"></div>
        </div>
        <div className="col-6 m-auto d-flex ms-2">
          <div className="col-6 m-auto">
            <div className="card shadowCards">
              <div className="card-body">
                <h5 className="card-title text-center">Añadir producto</h5>
                <p className="card-text -text-justify">
                  Añade nuevos productos, correspondientes a un estilo
                  existente.
                </p>
                <div className="text-center">
                  <Link
                    className="btn btnAccept"
                    to="/admin/inventory/add-item"
                  >
                    Ir a la sección
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div className="col-6 m-auto">
            <div className="card shadowCards">
              <div className="card-body">
                <h5 className="card-title text-center">Editar productos</h5>
                <p className="card-text text-justify">
                  Modifica y elimina los productos existentes.
                </p>
                <div className="text-center">
                  <Link
                    className="btn btnAccept"
                    to="/admin/inventory/edit-items"
                  >
                    Ir a la sección
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="col-12 justify-content-center d-flex mb-3">
        <h1>Colores</h1>
      </div>
      <div className="col-12 justify-content-center d-flex mb-3 mx-3">
        <div className="card shadowCards">
          <div className="card-body">
            <h5 className="card-title text-center">Gestionar colores</h5>
            <p className="card-text text-justify">
              Añade y elimina los colores disponibles para las prendas.
            </p>
            <div className="text-center">
              <Link className="btn btnAccept" to="/admin/inventory/adminColors">
                Ir a la sección
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default InventoryDashboard;
