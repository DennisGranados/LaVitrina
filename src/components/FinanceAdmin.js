import { Link } from "react-router-dom";

function FinanceAdmin() {
  return (
    <div>
      <div className="col-12 justify-content-center d-flex mb-3">
        <div className="col-6 text-center">
          <h1>Métodos de pago</h1>
        </div>
        <div className="col-6 text-center">
          <h1>Estadísticas</h1>
        </div>
      </div>
      <div className="col-12 d-flex mb-3 mx-2">
        <div className="col-6 m-auto d-flex">
          <div className="col-6 m-auto">
            <div className="card shadowCards">
              <div className="card-body">
                <h5 className="card-title text-center">
                  Gestionar métodos de pago
                </h5>
                <p className="card-text text-justify">
                  Añade o elimina métodos de pago.
                </p>
                <div className="text-center">
                  <Link
                    className="btn btnAccept"
                    to="/admin/finance/addPayment"
                    href="#"
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
        <div className="col-6 d-flex">
          <div className="col-6 m-auto">
            <div className="card shadowCards">
              <div className="card-body">
                <h5 className="card-title text-center">
                  Ver finanzas de la tienda
                </h5>
                <p className="card-text text-justify">
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
        </div>
      </div>
    </div>
  );
}
export default FinanceAdmin;
