import { Link } from "react-router-dom";

function Home() {
  return (
    <div>
      <div className="col-12 justify-content-center d-flex mb-3">
        <div className="mt-2 row">
          <div className="card mx-2">
            <img
              src="https://www.ago2.com/wp-content/uploads/2017/07/INTERSPORT_06.jpg"
              className="card-img-top"
            />
            <div className="card-body">
              <h5 className="card-title text-center">Catálogo</h5>
              <p className="card-text text-center">
                Aqui podrá encontrar toda la colección de prendas a su
                disposición
              </p>
              <div className= "mt-4">
              <div className="text-center">
                <Link to="/catalog" id="home" className="noHype">
                  <button className="btn btnAccept px-5">Ver</button>
                </Link>
              </div>
            </div>
            </div>
          </div>
          <div className="card mx-2">
            <img
              src="https://www.ago2.com/wp-content/uploads/2017/07/INTERSPORT_06.jpg"
              className="card-img-top"
            />
            <div className="card-body">
              <h5 className="card-title text-center">Carrito</h5>
              <p className="card-text text-center">
                Artículos agregados a tu carrito de compras
              </p>
              <div className= "mt-5">
              <div className="text-center">
                <Link to="/shoppingCart" id="home" className="noHype">
                  <button className="btn btnAccept px-5">Revisar</button>
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

export default Home;
