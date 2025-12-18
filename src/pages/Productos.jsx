// src/pages/Productos.jsx
import React, { useEffect, useState } from "react";
import { loadDeleted } from "../utilidades/deletedProductsSession";
import { getProductos, getProductosMerged } from "../services/productoService";
import { resolveImgSrc } from "../utilidades/resolveImgSrc";

const API_URL = "http://52.0.14.78:8080/api/productos";

// Adaptamos el producto que viene de la API al shape que usa el JSX
function mapProducto(p) {
  const variantes = Array.isArray(p.variantes) ? p.variantes : [];
  const v = variantes[0] || {};

  const precio = Number(v.precio ?? 0);
  const precioOfertaRaw =
    v.precioOferta !== null && v.precioOferta !== undefined
      ? Number(v.precioOferta)
      : null;

  return {
    id: p.id ?? v.id ?? null,
    titulo: p.nombre ?? v.titulo ?? "Producto",
    descripcion: p.descripcion ?? p.marca ?? "",
    precio,
    precioOferta: precioOfertaRaw, // <-- la usamos solo para filtrar
    imgSrc: resolveImgSrc(v.imgSrc),
    altText: v.altText ?? (p.nombre || "Producto SneakerVibe"),
  };
}

export default function Productos() {
  const [productos, setProductos] = useState([]);
  const [deletedSet, setDeletedSet] = useState(new Set());

  // Cargar lista de eliminados al montar y escuchar cambios
  useEffect(() => {
    setDeletedSet(loadDeleted());

    const handleChange = () => setDeletedSet(loadDeleted());
    window.addEventListener("sv_deleted_products_change", handleChange);
    window.addEventListener("storage", (e) => {
      if (e.key === "sv:admin:deletedProducts") handleChange();
    });

    return () => {
      window.removeEventListener("sv_deleted_products_change", handleChange);
      window.removeEventListener("storage", handleChange);
    };
  }, []);

  useEffect(() => {
    async function fetchProductos() {
      try {
        const data = await getProductosMerged(getProductos);
        const mapeados = Array.isArray(data) ? data.map(mapProducto) : [];

        // 🔥 Solo productos SIN oferta (precioOferta === null)
        const sinOfertas = mapeados.filter(
          (p) => p.precioOferta === null || Number.isNaN(p.precioOferta)
        );

        setProductos(sinOfertas);
      } catch (err) {
        console.error("Error al cargar productos desde la API:", err);
        setProductos([]); // deja la lista vacía -> mensaje "No hay productos disponibles"
      }
    }

    fetchProductos();
  }, []);

  // Filtramos los productos que estén en el set de eliminados
  const productosVisibles = productos.filter(p => !deletedSet.has(p.id));

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
                  onError={(e) => { e.currentTarget.src = "/assets/img/placeholder-product.png"; }}
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
