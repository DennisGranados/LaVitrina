/**
 * @fileoverview FinanceAdmin page, displays options related to store finances.
 * @version 1.0
 * @author Carlos Cabezas Fallas
 * @author Denilson Granados Solano
 * @author Jahel Jiménez Porras
 * @author Jonathan Orozco Pérez 
 * @author María Ramírez Hernández
 * History
 * v1.0 – Initial Release
 * ----
 * The first version of FinanceAdmin page was written by Carlos Cabezas, Denilson Granados, 
 * Jahel Jiménez, Jonathan Orozco, María Ramírez.
 */
import { Link } from "react-router-dom";

function FinanceAdmin() {
  return (
    <div className="orderCards">
      <div className="my-2">
        <h1 className="text-center">Métodos de pago</h1>
        <div className="card shadowCards">
          <div className="card-body">
            <h5 className="card-title text-center">
              Gestionar métodos de pago
            </h5>
            <p className="card-text text-justify">
              Añade o elimina métodos de pago.
            </p>
            <div className="text-center">
              <Link className="btn btnAccept" to="/admin/finance/adminPayment">
                Ir a la sección
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div>
        <div className="my-2">
          <h1 className="text-center">Estadísticas</h1>
          <div className="card shadowCards">
            <div className="card-body">
              <h5 className="card-title text-center">
                Ver finanzas de la tienda
              </h5>
              <p className="card-text text-justify">
                Visualizar gráficos sobre ventas.
              </p>
              <div className="text-center">
                <Link className="btn btnAccept" to="/admin/inventory/add-item">
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
export default FinanceAdmin;
