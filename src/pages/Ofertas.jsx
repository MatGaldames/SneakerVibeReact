import React from "react";
import ofertas from "../data/ofertas";

export default function Ofertas() {
  return (
    <main className="flex-grow-1">
      <div className="container-fluid my-5">
        <div className="row justify-content-around w-100 mx-0">
          {ofertas.map((o) => {
            const tieneOferta =
              Number(o.precioOferta) > 0 && Number(o.precioOferta) < Number(o.precio);
            const ahorro = tieneOferta
              ? Math.round((1 - o.precioOferta / o.precio) * 100)
              : 0;

            return (
              <div
                key={o.id}
                className="col-12 col-sm-6 col-md-4 col-lg-4 mb-4 d-flex justify-content-center"
              >
                <div className="card card-product neon-product text-center position-relative">
                  {tieneOferta && (
                    <span className="position-absolute top-0 start-0 m-2 badge bg-danger">
                      -{ahorro}%
                    </span>
                  )}

                  <img
                    src={o.imgSrc}
                    className="card-img-top rounded"
                    alt={o.altText}
                  />
                  <div className="card-body d-flex flex-column justify-content-between">
                    <div>
                      <h5 className="card-title">{o.titulo}</h5>
                      <p className="card-text">{o.descripcion}</p>

                      {tieneOferta ? (
                        <>
                          <p className="text-muted text-decoration-line-through mb-1">
                            ${o.precio.toLocaleString("es-CL")}
                          </p>
                          <p className="text-danger fw-bold">
                            ${o.precioOferta.toLocaleString("es-CL")}
                          </p>
                        </>
                      ) : (
                        <p className="text-danger fw-bold">
                          ${o.precio.toLocaleString("es-CL")}
                        </p>
                      )}
                    </div>
                    <a
                      href={`/product?id=${o.id}`}
                      className="btn btn-dark mt-3"
                    >
                      Ver producto
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </main>
  );
}
