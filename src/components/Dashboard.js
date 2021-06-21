import React from "react";
import { Link } from "react-router-dom";

function Dashboard() {
  return (
    <div className="col-12 justify-content-center d-flex mb-3">
      <div className="card " style={{ width: 18 + "rem" }}>
        <div className="card-body">
          <h5 className="card-title">Añadir cuenta de usuario</h5>
          <p className="card-text">Agregar cuentas administrativas.</p>
          <Link className="btn btn-primary" to="/admin/register" href="#">
            Ir a la sección
          </Link>
        </div>
      </div>
      <div className="card " style={{ width: 18 + "rem" }}>
        <div className="card-body">
          <h5 className="card-title">Eliminar cuenta de usuario</h5>
          <p className="card-text">Eliminar cuentas administrativas.</p>
          <Link className="btn btn-primary" to="/admin/delete-account" href="#">
            Ir a la sección
          </Link>
        </div>
      </div>
      <div className="card " style={{ width: 18 + "rem" }}>
        <div className="card-body">
          <h5 className="card-title">Gestionar inventario</h5>
          <p className="card-text">
            Permite agregar, editar y eliminar prendas.
          </p>
          <Link className="btn btn-primary" to="/admin/inventory" href="#">
            Ir a la sección
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
