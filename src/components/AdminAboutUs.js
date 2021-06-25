import React, { useState } from "react";


function AdminAboutUs() {
  return (
    <form className="col-12 justify-content-center dflex">
      <div className="card" id="card-submit">
        <div className="card-body">
          <h4 className="text-center mb-4">Ingresar información de contacto</h4>
          <div className="row">
            <div class="col">
              <label className="form-label">Correo electrónico</label>
              <input type="email" class="form-control" placeholder="text@gmail.com" />
            </div>
            <div class="col">
              <label className="form-label">Número telefónico</label>
              <input type="number" class="form-control" placeholder="88888888" />
            </div>
          </div>
          <div class="col mt-2">
            <label className="form-label">Link de página de Facebook</label>
            <input type="email" class="form-control" placeholder="https://www.facebook.com/example" />
          </div>
          <div class="col mt-2">
            <label className="form-label">Link de página de Instagram</label>
            <input type="email" class="form-control" placeholder="https://www.instagram.com/example/?hl=es-la" />
          </div>
          <div class="col mt-3">
            <label className="form-label">Ingresar información acerca de la tienda</label>
            <textarea class="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
          </div>
          <div className="text-center">
            <button type="submit" className="btn btn-primary topMargin mx-2">
              Aceptar
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}
export default AdminAboutUs;
