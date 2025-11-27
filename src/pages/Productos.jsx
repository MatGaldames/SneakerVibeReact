// src/pages/Productos.jsx
import React, { useEffect, useState } from "react";

const API_URL = "http://18.232.140.10:8080/api/productos";

// Adaptamos el producto que viene de la API al shape que usa el JSX
function mapProducto(p) {
  const variantes = Array.isArray(p.variantes) ? p.variantes : [];
  const v = variantes[0] || {};

  return {
    id: p.id ?? v.id ?? null,
    titulo: p.nombre ?? v.titulo ?? "Producto",
    descripcion: p.descripcion ?? p.marca ?? "",
    precio: Number(v.precio ?? 0),
    imgSrc: v.imgSrc ?? "/assets/img/placeholder-product.svg",
    altText: v.altText ?? (p.nombre || "Producto SneakerVibe"),
  };
}

export default function Productos() {
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    async function fetchProductos() {
      try {
        const res = await fetch(API_URL);
        if (!res.ok) {
          throw new Error(`Error HTTP ${res.status}`);
        }

        const data = await res.json();
        const mapeados = Array.isArray(data) ? data.map(mapProducto) : [];
        setProductos(mapeados);
      } catch (err) {
        console.error("Error al cargar productos desde la API:", err);
        setProductos([]); // deja la lista vacía -> mensaje "No hay productos disponibles"
      }
    }

    fetchProductos();
  }, []);

  // Si tenías filtros/búsqueda, acá los aplicas sobre productos
  const productosVisibles = productos;

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
                  <a
                    href={`/product?id=${p.id}`}
                    className="btn btn-danger mt-3"
                  >
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
