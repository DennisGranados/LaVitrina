function ClothesAdmin() {
  return (
    <div className="col-12 justify-content-center d-flex mb-3">
      <div className="mt-2">
        <div className="card">
          <img
            src="https://www.ago2.com/wp-content/uploads/2017/07/INTERSPORT_06.jpg"
            className="card-img-top"
          />
          <div className="card-body">
            <h5 className="card-title text-center">Nuevo producto</h5>
            <p className="card-text text-center">
              Debe rellenar los espacios de información del producto
            </p>
            <div className="text-center">
                <button className="btn btn-primary px-5">Agregar imagen</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default ClothesAdmin;
