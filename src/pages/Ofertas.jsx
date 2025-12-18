// src/pages/Ofertas.jsx
import React, { useEffect, useState } from "react";
import { loadDeleted } from "../utilidades/deletedProductsSession";
import { getProductos, getProductosMerged } from "../services/productoService";

const API_URL = "http://52.0.14.78:8080/api/productos";

// Mapear producto desde la API
function mapProductoFromApi(p = {}) {
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
    precioOferta: precioOfertaRaw,
    imgSrc: v.imgSrc ?? "/assets/img/placeholder-product.svg",
    altText: v.altText ?? (p.nombre || "Producto SneakerVibe"),
  };
}

export default function Ofertas() {
  const [ofertas, setOfertas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
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
    async function fetchOfertas() {
      try {
        setLoading(true);
        setError(null);

        const data = await getProductosMerged(getProductos);
        const normalizados = Array.isArray(data)
          ? data.map(mapProductoFromApi)
          : [];

        // Solo productos con precioOferta distinto de null
        const soloOfertas = normalizados.filter(
          (p) =>
            p.precioOferta !== null &&
            p.precioOferta !== undefined &&
            !Number.isNaN(p.precioOferta)
        );

        setOfertas(soloOfertas);
      } catch (err) {
        console.error("Error al cargar ofertas:", err);
        setError("No se pudieron cargar las ofertas.");
        setOfertas([]);
      } finally {
        setLoading(false);
      }
    }

    fetchOfertas();
  }, []);

  if (loading) {
    return (
      <main className="flex-grow-1">
        <div className="container-fluid my-5">
          <div className="row justify-content-around w-100 mx-0">
            <div className="col-12 text-center text-muted py-5">
              Cargando ofertas...
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

  // Filtramos los productos que estén en el set de eliminados
  const ofertasVisibles = ofertas.filter(p => !deletedSet.has(p.id));

  return (
    <main className="flex-grow-1">
      <div className="container-fluid my-5">
        <h2 className="text-center mb-4">Ofertas BLACK FRIDAY</h2>
        <div className="row justify-content-around w-100 mx-0">
          {ofertasVisibles.map((p) => {
            const ahorro =
              p.precioOferta && p.precio
                ? Math.round((1 - p.precioOferta / p.precio) * 100)
                : 0;

            return (
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

                      {/* Precio normal tachado */}
                      <p className="text-muted text-decoration-line-through mb-1">
                        ${p.precio.toLocaleString("es-CL")}
                      </p>

                      {/* Precio oferta */}
                      <p className="text-danger font-weight-bold mb-1">
                        ${p.precioOferta.toLocaleString("es-CL")}
                        {ahorro > 0 && (
                          <span className="badge bg-danger ms-2">
                            -{ahorro}%
                          </span>
                        )}
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
            );
          })}

          {ofertas.length === 0 && (
            <div className="col-12 text-center text-muted py-5">
              No hay productos en oferta en este momento.
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
