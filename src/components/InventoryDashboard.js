import { Link } from "react-router-dom";

function InventoryDashboard() {
  return (
    <div className="col-12 justify-content-center d-flex mb-3">
      <div className="col-1 m-auto">
        <div className="card " style={{ width: 18 + "rem" }}>
          <div className="card-body">
            <h5 className="card-title">Estilos</h5>
            <p className="card-text">
              Agregar, modificar y eliminar los estilos de prendas disponibles
              (vestidos, blusas, etc).
            </p>
            <Link
              className="btn btn-primary"
              to="/admin/inventory/styles"
              href="#"
            >
              Ir a la sección
            </Link>
          </div>
        </div>
      </div>
      <div className="col-1 m-auto">
        <div className="card " style={{ width: 18 + "rem" }}>
          <div className="card-body">
            <h5 className="card-title">Prendas</h5>
            <p className="card-text">
              Agregar, modificar y eliminar prendas al inventario.
            </p>
            <Link
              className="btn btn-primary"
              to="/admin/inventory/clothes"
              href="#"
            >
              Ir a la sección
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
export default InventoryDashboard;
