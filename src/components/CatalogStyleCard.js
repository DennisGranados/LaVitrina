/**
 * @fileoverview CatalogStyleCard, component that is responsible for displaying the image and name of the style.
 * @version 1.0
 * @author Carlos Cabezas Fallas
 * @author Denilson Granados Solano
 * @author Jahel Jiménez Porras
 * @author Jonathan Orozco Pérez
 * @author María Ramírez Hernández
 * History
 * v1.0 – Initial Release
 * ----
 * The first version of CatalogStyleCard was written by Carlos Cabezas, Denilson Granados,
 * Jahel Jiménez, Jonathan Orozco, María Ramírez.
 */
function CatalogStyleCard(props) {
  return (
    <div className="card shadowCards my-3 mx-3">
      <img
        src={props.image}
        className="card-img-top"
        alt={"Imagen " + props.name}
      />
      <div className="card-body">
        <h4 className="card-title text-center">{props.name}</h4>
        <div className="d-flex align-items-center justify-content-around mt-3">
          <div
            className="btn-group"
            role="group"
            aria-label="Basic mixed styles example"
          >
            <button
              type="button"
              onClick={() => props.actionItems(props.id, props.name)}
              className="btn btnAccept"
            >
              Acceder al catálogo del estilo
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CatalogStyleCard;
