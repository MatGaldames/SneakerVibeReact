import React from "react";
import ofertas from "../data/ofertas";

export default function Ofertas() {
  return (
    <main className="flex-grow-1">
      <div className="container-fluid my-5">
        <div className="row justify-content-around w-100 mx-0">
          {ofertas.map((o) => (
            <div
              key={o.id}
              className="col-12 col-sm-6 col-md-4 col-lg-4 mb-4 d-flex justify-content-center"
            >
              <div className="card card-product neon-product text-center">
                <img
                  src={o.imgSrc}
                  className="card-img-top rounded"
                  alt={o.altText}
                />
                <div className="card-body d-flex flex-column justify-content-between">
                  <div>
                    <h5 className="card-title">{o.titulo}</h5>
                    <p className="card-text">{o.descripcion}</p>
                    <p className="text-danger font-weight-bold">${o.precio}</p>
                  </div>
                  <a href={`/product?id=${o.id}`} className="btn btn-dark mt-3">Ver producto </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

    </main>
  );
}