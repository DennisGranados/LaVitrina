import React from "react";
import { Link } from "react-router-dom";

function Dashboard() {
  return (
    <div>
      <div className="col-12 justify-content-center d-flex mb-3">
        <div className="col-3 m-auto">
          <div className="card " style={{ width: 18 + "rem" }}>
            <div className="card-body">
              <h5 className="card-title">Añadir cuenta de usuario</h5>
              <p className="card-text">Agregar cuentas administrativas.</p>
              <Link className="btn btn-primary" to="/admin/register" href="#">
                Ir a la sección
              </Link>
            </div>
          </div>
        </div>
        <div className="col-3 m-auto">
          <div className="card " style={{ width: 18 + "rem" }}>
            <div className="card-body">
              <h5 className="card-title">Eliminar cuenta de usuario</h5>
              <p className="card-text">Eliminar cuentas administrativas.</p>
              <Link
                className="btn btn-primary"
                to="/admin/delete-account"
                href="#"
              >
                Ir a la sección
              </Link>
            </div>
          </div>
        </div>
        <div className="col-3 m-auto">
          <div className="card " style={{ width: 18 + "rem" }}>
            <div className="card-body">
              <h5 className="card-title">Gestionar inventario</h5>
              <p className="card-text">
                Permite agregar, editar y eliminar prendas y estilos.
              </p>
              <Link className="btn btn-primary" to="/admin/inventory" href="#">
                Ir a la sección
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="col-12 justify-content-center d-flex mb-3">
        <div className="col-3 m-auto">
          <div className="card " style={{ width: 18 + "rem" }}>
            <div className="card-body">
              <h5 className="card-title">Finanzas</h5>
              <p className="card-text">
                Permite ver las ventas por mes, entre otras cosas.
              </p>
              <Link className="btn btn-primary" to="/admin/finance" href="#">
                Ir a la sección
              </Link>
            </div>
          </div>
        </div>
        <div className="col-3 m-auto">
          <div className="card " style={{ width: 18 + "rem" }}>
            <div className="card-body">
              <h5 className="card-title">Pedidos</h5>
              <p className="card-text">
                Gestiona pedidos pendientes y el histórico de estos.s
              </p>
              <Link className="btn btn-primary" to="/admin/orders" href="#">
                Ir a la sección
              </Link>
            </div>
          </div>
        </div>
        <div className="col-3 m-auto">
          <div className="card " style={{ width: 18 + "rem" }}>
            <div className="card-body">
              <h5 className="card-title">Información de la página</h5>
              <p className="card-text">
                Permite gestionar los métodos de contacto, así como información
                de la página (acerca de nosotras).
              </p>
              <Link className="btn btn-primary" to="/admin/about_us" href="#">
                Ir a la sección
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
