import React from "react";
import { useLocation } from "react-router-dom";
import productos from "./data/productos";

export default function CategoriaDetalle() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const categoria = searchParams.get("nombre");

  // Filtrar productos según categoría
  const productosFiltrados = productos.filter(
    (p) => p.categoria === categoria
  );

  if (productosFiltrados.length === 0) {
    return (
      <div className="container py-5 text-center">
        <h2>Categoría no encontrada</h2>
        <p>No hay productos disponibles en esta categoría.</p>
      </div>
    );
  }

  return (
    <main className="flex-grow-1">
      <div className="container my-5">
        <h2 className="text-center text-capitalize mb-5">
          {categoria}
        </h2>

        <div className="row justify-content-around w-100 mx-0">
          {productosFiltrados.map((p) => (
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
                      ${p.precio.toLocaleString("es-CL")}
                    </p>
                  </div>
                  <a
                    href={`/product?id=${p.id}`}
                    className="btn btn-dark mt-3"
                  >
                    Ver producto
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
