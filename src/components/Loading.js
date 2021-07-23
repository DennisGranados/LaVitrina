/**
 * @fileoverview Loading, shows the logo when loading a website function.
 * @version 1.0
 * @author Carlos Cabezas Fallas
 * @author Denilson Granados Solano
 * @author Jahel Jiménez Porras
 * @author Jonathan Orozco Pérez
 * @author María Ramírez Hernández
 * History
 * v1.0 – Initial Release
 * ----
 * The first version of Loading was written by Carlos Cabezas, Denilson Granados,
 * Jahel Jiménez, Jonathan Orozco, María Ramírez.
 */
import logo from "../Logo.png";

function Loading() {
  return (
    <div>
      <div className="loading mt-5">
        <div className="d-flex justify-content-center">
          <img className="col-1 logo" src={logo} alt="Logo" width="100" />
        </div>
        <div className="d-flex justify-content-center">
          <strong className="sr-only">
            <h3>Cargando</h3>
          </strong>
        </div>
        <div className="d-flex justify-content-center">
          <div className="spinner-grow text-warning" role="status"></div>
        </div>
      </div>
    </div>
  );
}

export default Loading;
