import { Link } from "react-router-dom";

function InventoryDashboard() {
  return (
    <div className="orderCards">
      <div className="my-2">
        <h1 className="text-center">Estilos</h1>
        <div className="card shadowCards my-4">
          <div className="card-body">
            <h5 className="card-title text-center">Añadir estilo</h5>
            <p className="card-text text-justify">
              Añade un nuevo estilo de prendas.
            </p>
            <div className="text-center">
              <Link className="btn btnAccept" to="/admin/inventory/add-styles">
                Ir a la sección
              </Link>
            </div>
          </div>
        </div>
        <div className="card shadowCards my-4">
          <div className="card-body">
            <h5 className="card-title text-center">Editar estilos</h5>
            <p className="card-text text-justify">
              Modifica y elimina los estilos existentes de prendas disponibles
              (vestidos, blusas, etc).
            </p>
            <div className="text-center">
              <Link className="btn btnAccept" to="/admin/inventory/edit-styles">
                Ir a la sección
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="my-2">
        <h1 className="text-center">Producto</h1>
        <div className="card shadowCards my-4">
          <div className="card-body">
            <h5 className="card-title text-center">Añadir producto</h5>
            <p className="card-text -text-justify">
              Añade nuevos productos, correspondientes a un estilo existente.
            </p>
            <div className="text-center">
              <Link className="btn btnAccept" to="/admin/inventory/add-item">
                Ir a la sección
              </Link>
            </div>
          </div>
        </div>
        <div className="card shadowCards my-4">
          <div className="card-body">
            <h5 className="card-title text-center">Editar productos</h5>
            <p className="card-text text-justify">
              Modifica y elimina los productos existentes.
            </p>
            <div className="text-center">
              <Link className="btn btnAccept" to="/admin/inventory/edit-items">
                Ir a la sección
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="my-2">
        <h1 className="text-center">Colores</h1>
        <div className="card shadowCards my-4">
          <div className="card-body">
            <h5 className="card-title text-center">Gestionar colores</h5>
            <p className="card-text text-justify">
              Añade y elimina los colores disponibles para las prendas.
            </p>
            <div className="text-center">
              <Link className="btn btnAccept" to="/admin/inventory/adminColors">
                Ir a la sección
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="my-2">
        <h1 className="text-center">Tallas</h1>
        <div className="card shadowCards my-4">
          <div className="card-body">
            <h5 className="card-title text-center">Gestionar tallas</h5>
            <p className="card-text text-justify">
              Añade y elimina las tallas disponibles para las prendas.
            </p>
            <div className="text-center">
              <Link className="btn btnAccept" to="/admin/inventory/adminSizes">
                Ir a la sección
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default InventoryDashboard;
