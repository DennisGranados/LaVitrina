import React from "react";
import { Link } from "react-router-dom";

function Dashboard() {
  return (
    <div>
      <div className="col-12 justify-content-center d-flex mb-3">
        <div className="col-3 m-auto">
          <div className="card shadowCards">
            <img
              src="https://image.flaticon.com/icons/png/512/748/748137.png"
              className="card-img-top"
              alt="Imagen añadir cuenta de usuario"
            />
            <div className="card-body">
              <h5 className="card-title text-center">
                Añadir cuenta de usuario
              </h5>
              <p className="card-text">Agregar cuentas administrativas.</p>
              <div className="text-center">
              <Link className="btn btnAccept raisePrimary" to="/admin/register" href="#">
                Ir a la sección
              </Link>
              </div>
            </div>
          </div>
        </div>
        <div className="col-3 m-auto">
          <div className="card shadowCards">
            <img
              src="https://image.flaticon.com/icons/png/512/748/748138.png"
              className="card-img-top"
              alt="Imagen eliminar cuenta de usuario"
            />
            <div className="card-body justify-content-center">
              <h5 className="card-title text-center">
                Eliminar cuenta de usuario
              </h5>
              <p className="card-text">Eliminar cuentas administrativas.</p>
              <div className="text-center">
              <Link
                className="btn btnAccept raisePrimary"
                to="/admin/delete-account"
                href="#"
              >
                Ir a la sección
              </Link>
              </div>
            </div>
          </div>
        </div>
        <div className="col-3 m-auto">
          <div className="card shadowCards">
            <img
              src="https://image.flaticon.com/icons/png/512/2942/2942672.png"
              className="card-img-top"
              alt="Imagen gestionar inventario"
            />
            <div className="card-body">
              <h5 className="card-title text-center">Gestionar inventario</h5>
              <p className="card-text">
                Permite agregar, editar y eliminar prendas y estilos.
              </p>
              <div className="text-center">
              <Link className="btn btnAccept raisePrimary" to="/admin/inventory" href="#">
                Ir a la sección
              </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="col-12 justify-content-center d-flex mb-3">
        <div className="col-3 m-auto">
          <div className="card shadowCards">
            <img
              src="https://image.flaticon.com/icons/png/512/2942/2942259.png"
              className="card-img-top"
              alt="Imagen finanzas"
            />
            <div className="card-body">
              <h5 className="card-title text-center">Finanzas</h5>
              <p className="card-text">
                Permite ver las ventas por mes, entre otras cosas.
              </p>
              <div className="text-center">
              <Link className="btn btnAccept raisePrimary" to="/admin/finance" href="#">
                Ir a la sección
              </Link>
              </div>
            </div>
          </div>
        </div>
        <div className="col-3 m-auto">
          <div className="card shadowCards">
            <img
              src="https://image.flaticon.com/icons/png/512/1008/1008010.png"
              className="card-img-top"
              alt="Imagen pedidos"
            />
            <div className="card-body">
              <h5 className="card-title text-center">Pedidos</h5>
              <p className="card-text">
                Gestiona pedidos pendientes y el histórico de estos.
              </p>
              <div className="text-center">
              <Link className="btn btnAccept raisePrimary" to="/admin/orders" href="#">
                Ir a la sección
              </Link>
              </div>
            </div>
          </div>
        </div>
        <div className="col-3 m-auto">
          <div className="card shadowCards">
            <img
              src="https://image.flaticon.com/icons/png/512/2343/2343723.png"
              className="card-img-top"
              alt="Imagen información de la página"
            />
            <div className="card-body">
              <h5 className="card-title text-center">
                Información de la página
              </h5>
              <p className="card-text">
                Permite gestionar los métodos de contacto, así como información
                de la página (acerca de nosotras).
              </p>
              <div className="text-center">
              <Link className="btn btnAccept raisePrimary" to="/admin/about_us" href="#">
                Ir a la sección
              </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
