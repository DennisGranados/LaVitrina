import { Link } from "react-router-dom";

function InventoryDashboard() {
  return (
    <div>
      <div className="col-12 justify-content-center d-flex mb-3">
        <div className="col-6 text-center">
          <h1>Estilos</h1>
        </div>
        <div className="col-6 text-center">
          <h1>Prendas</h1>
        </div>
      </div>
      <div className="col-12 justify-content-center d-flex mb-3">
        <div className="col-6 m-auto d-flex">
          <div className="col-6 m-auto">
            <div className="card ">
              <div className="card-body">
                <h5 className="card-title">Añadir estilo</h5>
                <p className="card-text">Añade un nuevo estilo de prendas.</p>
                <div className="text-center">
                  <Link
                    className="btn btnAccept"
                    to="/admin/inventory/add-styles"
                    href="#"
                  >
                    Ir a la sección
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div className="col-6 m-auto">
            <div className="card ">
              <div className="card-body">
                <h5 className="card-title">Editar estilos</h5>
                <p className="card-text">
                  Modifica y elimina los estilos existentes de prendas
                  disponibles (vestidos, blusas, etc).
                </p>
                <div className="text-center">
                  <Link
                    className="btn btnAccept"
                    to="/admin/inventory/edit-styles"
                    href="#"
                  >
                    Ir a la sección
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-6 m-auto d-flex">
          <div className="col-6 m-auto">
            <div className="card ">
              <div className="card-body">
                <h5 className="card-title">Añadir prenda</h5>
                <p className="card-text">
                  Añade nuevas prendas, correspondientes a un estilo existente.
                </p>
                <div className="text-center">
                  <Link
                    className="btn btnAccept"
                    to="/admin/inventory/add-item"
                    href="#"
                  >
                    Ir a la sección
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div className="col-6 m-auto">
            <div className="card ">
              <div className="card-body">
                <h5 className="card-title">Editar prendas</h5>
                <p className="card-text">
                  Modifica y elimina las prendas existentes.
                </p>
                <div className="text-center">
                  <Link
                    className="btn btnAccept"
                    to="/admin/inventory/edit-items"
                    href="#"
                  >
                    Ir a la sección
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default InventoryDashboard;
