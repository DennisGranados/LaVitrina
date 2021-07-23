/**
 * @fileoverview Dashboard page, shows the different options available to the administrative users.
 * @version 1.0
 * @author Carlos Cabezas Fallas
 * @author Denilson Granados Solano
 * @author Jahel Jiménez Porras
 * @author Jonathan Orozco Pérez
 * @author María Ramírez Hernández
 * History
 * v1.0 – Initial Release
 * ----
 * The first version of Dashboard page was written by Carlos Cabezas, Denilson Granados,
 * Jahel Jiménez, Jonathan Orozco, María Ramírez.
 */
import React from "react";
import { Link } from "react-router-dom";

function Dashboard() {
  return (
    <div className="orderCards" id="dashboard">
      <div className="card shadowCards mx-2 my-3">
        <img
          src="https://image.flaticon.com/icons/png/512/748/748137.png"
          className="card-img-top"
          alt="Imagen añadir cuenta de usuario"
        />
        <div className="card-body">
          <h5 className="card-title text-center">Añadir cuenta de usuario</h5>
          <p className="card-text">Agregar cuentas administrativas.</p>
          <div className="text-center">
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
        <div className="card-body">
          <h5 className="card-title text-center">Eliminar cuenta de usuario</h5>
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
            Permite gestionar los métodos de contacto, así como información
            básica de la página.
          </p>
          <div className="text-center">
            <Link className="btn btnAccept" to="/admin/about_us">
              Ir a la sección
            </Link>
          </div>
        </div>
      </div>
      <div className="card shadowCards mx-2 my-3">
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
            <Link className="btn btnAccept" to="/admin/orders">
              Ir a la sección
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
