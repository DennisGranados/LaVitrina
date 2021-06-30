import logo from "../Logo.png";

function Loading() {
  return (
    <div>
      <div className="loading mt-5">
        <div className="d-flex justify-content-center">
          <img className="col-1 logo" src={logo} alt="Logo" width="100" />
        </div>
        <div className="d-flex justify-content-center">
          <strong className="sr-only">Cargando...</strong>
        </div>
        <div className="d-flex justify-content-center">
          <div className="spinner-grow text-warning" role="status"></div>
        </div>
      </div>
    </div>
  );
}

export default Loading;
