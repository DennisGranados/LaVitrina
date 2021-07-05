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
                Añade nuevas prendas, correspondientes a un estilo existente.
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
