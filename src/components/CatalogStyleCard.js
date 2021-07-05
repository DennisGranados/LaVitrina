function CatalogStyleCard(props) {
    return (
        <div className="card shadowCards">
            <img
                src={props.image}
                className="card-img-top"
                alt={"Imagen " + props.name}
            />
            <div className="card-body">
                <h4 className="card-title text-center">{props.name}</h4>
                <div className="d-flex align-items-center justify-content-around">
                    <div
                        className="btn-group"
                        role="group"
                        aria-label="Basic mixed styles example"
                    >
                        <button
                            type="button"
                            //onClick={() => props.actionItems(props.id, props.name)}
                            className="btn btn-primary"
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