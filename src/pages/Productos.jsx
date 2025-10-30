import React from "react";
import productos from "../data/productos";
import { loadDeleted, getStableId } from "../utilidades/deletedProductsSession"; // <-- ajusta ruta si es necesario

export default function Productos() {
  // Cargamos los IDs eliminados por el admin en esta sesión
  const deleted = loadDeleted();

  // Filtramos los productos usando el mismo ID estable que usa el admin
  const productosVisibles = (productos || []).filter((p, i) => !deleted.has(getStableId(p, i)));


  return (
    <main className="flex-grow-1">
      <div className="container-fluid my-5">
        <div className="row justify-content-around w-100 mx-0">
          {productosVisibles.map((p) => (
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
                    <p className="text-danger font-weight-bold">
                      ${p.precio}
                    </p>
                  </div>
                  <a href={`/product?id=${p.id}`} className="btn btn-dark mt-3">
                    Ver producto
                  </a>
                </div>
              </div>
            </div>
          ))}
          {productosVisibles.length === 0 && (
            <div className="col-12 text-center text-muted py-5">
              No hay productos disponibles.
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
