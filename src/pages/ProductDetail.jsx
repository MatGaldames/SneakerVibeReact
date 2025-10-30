import { useCarrito } from "../utilidades/useCarrito";
import React, { useState } from "react";
import { useLocation, Link } from "react-router-dom";
import productos from "../data/productos";
import ofertas from "../data/ofertas";

// Normaliza un item venga de productos u ofertas
function normalize(p = {}, extra = {}) {
  return {
    id: p.id ?? p.slug ?? p.titulo ?? "",
    titulo: p.titulo ?? p.nombre ?? "Producto",
    descripcion: p.descripcion ?? "",
    imgSrc: p.imgSrc ?? p.imagen_url ?? "/assets/img/placeholder.png",
    altText: p.altText ?? p.titulo ?? "Producto",
    precio: Number(p.precio) || 0,
    precioOferta:
      extra.precioOferta != null
        ? Number(extra.precioOferta)
        : p.precioOferta != null
        ? Number(p.precioOferta)
        : undefined,
    tallas: Array.isArray(p.tallas) ? p.tallas : [],
  };
}

export default function ProductDetail() {
  const { add } = useCarrito();
  const [talla, setTalla] = useState(null);
  const location = useLocation();
  const productId = new URLSearchParams(location.search).get("id")?.trim();

  // 1) intenta en productos
  const base = productos.find((p) => p.id === productId);
  // 2) busca oferta por id (por si existe rebaja)
  const off = ofertas.find((o) => o.id === productId);
  // 3) si no existe en productos, intenta usar la oferta como “producto”
  const src = base ?? off;

  if (!src) {
    return (
      <div className="container py-5 text-center">
        <h2>Producto no encontrado</h2>
        <p className="text-muted">
          Revisa que el id “{productId || "(vacío)"}” exista en
          <code> data/productos.js </code> o en <code>data/ofertas.js</code>.
        </p>
      </div>
    );
  }

  // Unifica datos + inyecta precioOferta si aplica
  const producto = normalize(src, { precioOferta: off?.precioOferta });

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
    <main className="container-fluid py-5">
      <div className="container py-5">
        <div className="row align-items-center">
          {/* IMAGEN */}
          <div className="col-12 col-lg-6 text-center mb-4 mb-lg-0">
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
            <label htmlFor="talla" className="fw-semibold">
              Selecciona tu talla
            </label>
            <select
              id="talla"
              className="form-select mb-4"
              onChange={(e) => setTalla(e.target.value)}
            >
              {producto.tallas.length > 0 ? (
                producto.tallas.map((t, i) => (
                  <option key={i}>
                    {t.eu ? `EU ${t.eu} (US ${t.us})` : `Talla ${t}`}
                  </option>
                ))
              ) : (
                <option value="">Única</option>
              )}
            </select>

            {/* AGREGAR AL CARRITO */}
            <button
              className="btn btn-danger w-100 mb-3"
              onClick={() => add({ ...producto, precio: precioEfectivo, talla })}
            >
              Agregar al carrito
            </button>
          </div>
        </div>
      </div>

      {/* MÁS VENDIDOS (usa el catálogo, no la oferta individual) */}
      <section className="my-5">
        <h4 className="text-center mb-4">Productos más vendidos</h4>
        <div className="container-fluid">
          <div className="row justify-content-between w-100 mx-0">
            {productos.slice(0, 3).map((p) => (
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
                    <Link to={`/product?id=${p.id}`} className="btn btn-dark mt-3">
                      Ver producto
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
