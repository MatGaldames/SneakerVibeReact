// src/pages/CategoriaDetalle.jsx
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const API_URL = "http://52.0.14.78:8080/api/productos";

// Mapea el producto que viene de la API al formato usado por las cards
function mapProductoFromApi(p = {}) {
  const variantes = Array.isArray(p.variantes) ? p.variantes : [];
  const v = variantes[0] || {};

  return {
    id: p.id ?? v.id ?? null,
    titulo: p.nombre ?? v.titulo ?? "Producto",
    descripcion: p.descripcion ?? p.marca ?? "",
    precio: Number(v.precio ?? 0),
    imgSrc: v.imgSrc ?? "/assets/img/placeholder-product.svg",
    altText: v.altText ?? (p.nombre || "Producto SneakerVibe"),
    categoriaNombre:
      p.categoria?.nombreCategoria ||
      p.categoria?.nombre ||
      p.categoria ||
      "",
  };
}

export default function CategoriaDetalle() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const categoriaParam = (searchParams.get("nombre") || "").toLowerCase();

  const [productosFiltrados, setProductosFiltrados] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchProductos() {
      try {
        setLoading(true);
        setError(null);

        const res = await fetch(API_URL);
        if (!res.ok) {
          throw new Error(`Error HTTP ${res.status}`);
        }

        const data = await res.json();
        const normalizados = Array.isArray(data)
          ? data.map(mapProductoFromApi)
          : [];

        // Filtrar por categoría según el nombre que viene en la URL (?nombre=zapatillas)
        const filtrados = normalizados.filter((p) => {
          const catSlug = (p.categoriaNombre || "").toLowerCase();
          return catSlug === categoriaParam;
        });

        setProductosFiltrados(filtrados);
      } catch (err) {
        console.error("Error al cargar productos por categoría:", err);
        setError("No se pudieron cargar los productos de esta categoría.");
        setProductosFiltrados([]);
      } finally {
        setLoading(false);
      }
    }

    if (categoriaParam) {
      fetchProductos();
    } else {
      setLoading(false);
      setProductosFiltrados([]);
    }
  }, [categoriaParam]);

  if (loading) {
    return (
      <main className="flex-grow-1">
        <div className="container-fluid my-5">
          <div className="row justify-content-around w-100 mx-0">
            <div className="col-12 text-center text-muted py-5">
              Cargando productos...
            </div>
          </div>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="flex-grow-1">
        <div className="container-fluid my-5">
          <div className="row justify-content-around w-100 mx-0">
            <div className="col-12 text-center text-danger py-5">
              {error}
            </div>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="flex-grow-1">
      <div className="container-fluid my-5">
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

          {productosFiltrados.length === 0 && !error && (
            <div className="col-12 text-center text-muted py-5">
              No hay productos disponibles en esta categoría.
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
