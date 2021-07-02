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
      <div className="col-12 justify-content-center d-flex mb-3">
        <div className="col-6 m-auto d-flex">
          <div className="col-6 m-auto">
            <div className="card shadowCards">
              <div className="card-body">
                <h5 className="card-title">Añadir método de pago</h5>
                <p className="card-text">Añade un nuevo método de pago.</p>
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
            <div className="card shadowCards">
              <div className="card-body">
                <h5 className="card-title">Editar Métodos de pago</h5>
                <p className="card-text">
                  Modifica y elimina los métodos de pago existentes.
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
          <div className="col-6 m-auto text-center">
            <div className="card shadowCards">
              <div className="card-body">
                <h5 className="card-title">Ver finanzas de la tienda</h5>
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
        </div>
      </div>
    </div>
  );
}
export default FinanceAdmin;
