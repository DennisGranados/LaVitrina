import React from "react";
import { Link } from "react-router-dom";

function Dashboard() {
  return (
    <div>
      <div className="orderCards">
        <div className="card shadowCards mx-2 my-3">
          <img
            src="https://image.flaticon.com/icons/png/512/748/748137.png"
            className="card-img-top"
            alt="Imagen añadir cuenta de usuario"
          />
          <div className="card-body">
            <h5 className="card-title text-center">Añadir cuenta de usuario</h5>
            <p className="card-text">Agregar cuentas administrativas.</p>
            <div className="text-center mt-5">
              <Link className="btn btnAccept" to="/admin/register">
                Ir a la sección
              </Link>
            </div>
          </div>
        </div>
        <div className="card shadowCards mx-2 my-3">
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
              <Link className="btn btnAccept" to="/admin/delete-account">
                Ir a la sección
              </Link>
            </div>
          </div>
        </div>
        <div className="card shadowCards mx-2 my-3">
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
              <Link className="btn btnAccept" to="/admin/inventory">
                Ir a la sección
              </Link>
            </div>
          </div>
        </div>
        <div className="card shadowCards mx-2 my-3">
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
              <Link className="btn btnAccept" to="/admin/finance">
                Ir a la sección
              </Link>
            </div>
          </div>
        </div>

        <div className="card shadowCards mx-2 my-3">
          <img
            src="https://image.flaticon.com/icons/png/512/2343/2343723.png"
            className="card-img-top"
            alt="Imagen información de la página"
          />
          <div className="card-body">
            <h5 className="card-title text-center">Información de la página</h5>
            <p className="card-text">
              Permite gestionar los métodos de contacto, así como información de
              la página (acerca de nosotras).
            </p>
            <div className="text-center">
              <Link className="btn btnAccept" to="/admin/about_us">
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
