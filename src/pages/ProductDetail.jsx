// src/pages/ProductDetail.jsx
import { useCarrito } from "../utilidades/useCarrito";
import React, { useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";

const API_BASE = "http://18.232.140.10:8080/api";

// Mapea un Producto de la API al shape que usa la UI
function mapProductoFromApi(p = {}) {
  const variantes = Array.isArray(p.variantes) ? p.variantes : [];
  const v = variantes[0] || {};

  return {
    id: p.id ?? v.id ?? "",
    titulo: p.nombre ?? "Producto",
    descripcion: p.descripcion ?? "",
    imgSrc: v.imgSrc ?? "/assets/img/placeholder.png",
    altText: v.altText ?? p.nombre ?? "Producto",
    precio: Number(v.precio ?? 0) || 0,
    precioOferta:
      v.precioOferta != null && v.precioOferta !== ""
        ? Number(v.precioOferta)
        : undefined,
    tallas:
      variantes.length > 0
        ? variantes
            .map((det) => det.talla)
            .filter(Boolean)
        : [],
  };
}

export default function ProductDetail() {
  const { add } = useCarrito();
  const [talla, setTalla] = useState(null);
  const location = useLocation();
  const productId = new URLSearchParams(location.search).get("id")?.trim();

  const [producto, setProducto] = useState(null);
  const [masVendidos, setMasVendidos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      if (!productId) {
        setError("ID de producto inválido");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);

        const [detalleRes, listaRes] = await Promise.all([
          fetch(`${API_BASE}/productos/${productId}`),
          fetch(`${API_BASE}/productos`),
        ]);

        if (!detalleRes.ok) {
          throw new Error(`Error al obtener producto: ${detalleRes.status}`);
        }
        if (!listaRes.ok) {
          throw new Error(`Error al obtener listado: ${listaRes.status}`);
        }

        const detalleData = await detalleRes.json();
        const listaData = await listaRes.json();

        // Producto principal
        const prodNormalizado = mapProductoFromApi(detalleData);
        setProducto(prodNormalizado);

        // Más vendidos (primeros 3 del listado)
        const listaNormalizada = Array.isArray(listaData)
          ? listaData.map(mapProductoFromApi)
          : [];
        setMasVendidos(listaNormalizada.slice(0, 3));
      } catch (err) {
        console.error("Error cargando detalle de producto:", err);
        setError("No se pudo cargar el producto.");
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [productId]);

  if (loading) {
    return (
      <div className="container py-5 text-center">
        <p className="text-muted">Cargando producto...</p>
      </div>
    );
  }

  if (error || !producto) {
    return (
      <div className="container py-5 text-center">
        <h2>Producto no encontrado</h2>
        <p className="text-muted">
          No pudimos encontrar el producto con id "{productId || "(vacío)"}".
        </p>
      </div>
    );
  }

  // Precio efectivo (usa oferta si es menor)
  const precioEfectivo =
    producto.precioOferta && producto.precioOferta < producto.precio
      ? producto.precioOferta
      : producto.precio;

  const tieneOferta =
    producto.precioOferta && producto.precioOferta < producto.precio;

  const ahorro = tieneOferta
    ? Math.round((1 - producto.precioOferta / producto.precio) * 100)
    : 0;

  return (
    <main className="flex-grow-1">
      <div className="container py-5">
        <div className="row g-4 align-items-start">
          {/* IMAGEN */}
          <div className="col-12 col-lg-6">
            <img
              src={producto.imgSrc}
              alt={producto.altText}
              className="img-fluid rounded shadow-sm"
            />
          </div>

          {/* INFO */}
          <div className="col-12 col-lg-6">
            <h2 className="fw-bold">{producto.titulo}</h2>
            <p>{producto.descripcion}</p>

            {/* PRECIOS */}
            {tieneOferta ? (
              <div className="mb-3">
                <p className="text-muted text-decoration-line-through mb-1">
                  ${producto.precio.toLocaleString("es-CL")}
                </p>
                <p className="text-danger fw-bold mb-0">
                  ${producto.precioOferta.toLocaleString("es-CL")}
                  <span className="ms-2 badge bg-danger">-{ahorro}%</span>
                </p>
              </div>
            ) : (
              <h4 className="text-danger mb-3">
                ${producto.precio.toLocaleString("es-CL")}
              </h4>
            )}

            {/* TALLA */}
            <div className="mb-3">
              <label htmlFor="talla" className="form-label">
                Talla
              </label>
              <select
                id="talla"
                className="form-select mb-4"
                onChange={(e) => setTalla(e.target.value)}
              >
                {producto.tallas.length > 0 ? (
                  producto.tallas.map((t, i) => (
                    <option key={i} value={t}>
                      {typeof t === "object" && t !== null && "eu" in t
                        ? `EU ${t.eu} (US ${t.us})`
                        : `Talla ${t}`}
                    </option>
                  ))
                ) : (
                  <option value="">Única</option>
                )}
              </select>

              {/* AGREGAR AL CARRITO */}
              <button
                className="btn btn-danger w-100 mb-3"
                onClick={() =>
                  add({ ...producto, precio: precioEfectivo, talla })
                }
              >
                Agregar al carrito
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* MÁS VENDIDOS */}
      <section className="my-5">
        <h4 className="text-center mb-4">Productos más vendidos</h4>
        <div className="container-fluid">
          <div className="row justify-content-between w-100 mx-0">
            {masVendidos.map((p) => (
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
                    <Link
                      to={`/product?id=${p.id}`}
                      className="btn btn-danger mt-3"
                    >
                      Ver producto
                    </Link>
                  </div>
                </div>
              </div>
            ))}
            {masVendidos.length === 0 && (
              <div className="col-12 text-center text-muted py-4">
                No hay productos para mostrar.
              </div>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
