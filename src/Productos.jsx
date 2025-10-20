import React from "react";
import productos from "./data/productos";

export default function Productos() {
  return (
    <main className="flex-grow-1">
      <div className="container-fluid my-5">
  <div className="row justify-content-around w-100 mx-0">
    {productos.map((p) => (
      <div
        key={p.id}
        className="col-12 col-sm-6 col-md-4 col-lg-4 mb-4 d-flex justify-content-center"
      >
        <div className="card card-product neon-product text-center">
          <img
            src={p.imgSrc}
            className="card-img-top rounded"
            alt={p.altText}
          />
          <div className="card-body d-flex flex-column justify-content-between">
            <div>
              <h5 className="card-title">{p.titulo}</h5>
              <p className="card-text">{p.descripcion}</p>
              <p className="text-danger font-weight-bold">${p.precio}</p>
            </div>
            <button className="btn btn-dark mt-3">Ver producto</button>
          </div>
        </div>
      </div>
    ))}
  </div>
</div>

    </main>
  );
}
