// arriba del archivo
import React, { useState } from "react";
import DashboardSidebar from "../componentes/Dashboard";
import productosSeed from "../data/productos";
import { loadDeleted, markDeleted, getStableId } from "../utilidades/deletedProductsSession";

// ----- helpers -----
const formatCLP = (v) =>
  new Intl.NumberFormat("es-CL", {
    style: "currency",
    currency: "CLP",
    maximumFractionDigits: 0,
  }).format(Number(v) || 0);

const resolveImgSrc = (path) => {
  if (!path) return "/assets/img/placeholder-product.svg";
  if (path.startsWith("/")) return path;   // ya está en /public
  return `/${path.replace(/^\.?\//, "")}`; // vuelve absoluta
};

// ----- componente -----
export default function AdminProductos() {
  const [productos, setProductos] = useState(() => {
    const deleted = loadDeleted();
    return (productosSeed || [])
      .map((p, i) => ({ ...p, __sid: getStableId(p, i) })) // id estable
      .filter((p) => !deleted.has(p.__sid));
  });

  const eliminar = (sid) => {
    setProductos((prev) => prev.filter((p) => p.__sid !== sid));
    markDeleted(sid);
  };

  const active = "productos";

  return (
    <main className="min-vh-100 bg-light d-flex flex-column flex-md-row">
      {/* Tabs móviles debajo del navbar */}
      <nav className="admin-top-tabs d-md-none w-100">
        <div className="container-fluid py-2">
          <ul className="nav nav-pills justify-content-around">
            <li className="nav-item">
              <a href="/admin/dashboard" className="nav-link">
                <i className="bi bi-speedometer2 me-1" /> Dashboard
              </a>
            </li>
            <li className="nav-item">
              <a href="/admin/reportes" className="nav-link">
                <i className="bi bi-graph-up-arrow me-1" /> Reportes
              </a>
            </li>
            <li className="nav-item">
              <a href="/admin/productos" className={`nav-link ${active === "productos" ? "active" : ""}`}>
                <i className="bi bi-bag me-1" /> Productos
              </a>
            </li>
          </ul>
        </div>
      </nav>

      {/* Sidebar escritorio */}
      <DashboardSidebar active={active} />

      {/* Contenido */}
      <section className="flex-grow-1 p-4">
        <div className="container-fluid">
          <div className="d-flex align-items-center justify-content-between mb-4">
            <h3 className="fw-bold">Productos</h3>
            <span className="badge rounded-pill text-bg-danger">Admin</span>
          </div>

          {productos.length === 0 ? (
            <div className="alert alert-light border text-center">No hay productos.</div>
          ) : (
            <ul className="list-unstyled m-0">
              {productos.map((p) => {
                const titulo = p.titulo ?? p.nombre ?? "Sin título";
                const categoria = p.categoria ?? p.category ?? "Sin categoría";
                const precio = p.precio ?? p.price ?? 0;
                const src = resolveImgSrc(p.imgSrc ?? p.img ?? p.image ?? p.imagen ?? p.src);
                const alt = p.altText ?? titulo;

                return (
                  <li key={p.__sid} className="mb-2">
                    <article className="card neon-card border-0">
                      <div className="card-body py-3">
                        <div className="row align-items-center g-3">
                          {/* IMG */}
                          <div className="col-auto">
                            <img
                              src={src}
                              alt={alt}
                              width="56"
                              height="56"
                              className="rounded"
                              style={{ objectFit: "cover" }}
                              onError={(e) => (e.currentTarget.src = "/assets/img/placeholder-product.svg")}
                            />
                          </div>

                          {/* TÍTULO + CATEGORÍA */}
                          <div className="col">
                            <div className="fw-semibold">{titulo}</div>
                            <small className="text-muted">{categoria}</small>
                          </div>

                          {/* PRECIO alineado */}
                          <div className="col-auto d-none d-sm-block">
                            <div className="fw-bold text-end text-nowrap" style={{ width: 120 }}>
                              {formatCLP(precio)}
                            </div>
                          </div>

                          {/* ACCIÓN */}
                          <div className="col-auto">
                            <button className="btn btn-outline-danger btn-sm" onClick={() => eliminar(p.__sid)}>
                              <i className="bi bi-trash me-1" />
                              Eliminar
                            </button>
                          </div>

                          {/* PRECIO móvil */}
                          <div className="col-12 d-sm-none">
                            <div className="fw-bold text-end">{formatCLP(precio)}</div>
                          </div>
                        </div>
                      </div>
                    </article>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </section>
    </main>
  );
}
