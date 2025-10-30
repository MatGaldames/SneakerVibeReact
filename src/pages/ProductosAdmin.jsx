// arriba del archivo
import React, { useState, useEffect } from "react";
import DashboardSidebar from "../componentes/Dashboard";
import productosSeed from "../data/productos";
import { loadDeleted, markDeleted, unmarkDeleted, getStableId } from "../utilidades/deletedProductsSession";

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
  // Set de deshabilitados en sessionStorage
  const [deletedSet, setDeletedSet] = useState(loadDeleted());

  // (Opcional) Escucha cambios desde otras pestañas
  useEffect(() => {
    const onStorage = (e) => {
      if (e.key === "sv:admin:deletedProducts") {
        setDeletedSet(loadDeleted());
      }
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  const refreshDeleted = () => setDeletedSet(new Set(loadDeleted()));

  const eliminar = (sid) => {
    markDeleted(sid);   // marca como deshabilitado
    refreshDeleted();
  };

  const habilitar = (sid) => {
    unmarkDeleted(sid); // vuelve a habilitar
    refreshDeleted();
  };

  // Construye el listado SIN filtrar, marcando cada item con __deleted
  const listado = (productosSeed || []).map((p, i) => {
    const sid = getStableId(p, i);
    return { ...p, __sid: sid, __deleted: deletedSet.has(sid) };
  });

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
          {/* Header + CTA */}
          <div className="d-flex align-items-center justify-content-between mb-4">
            <div className="d-flex align-items-center gap-3">
              <h3 className="fw-bold m-0">Productos</h3>
              <span className="badge rounded-pill text-bg-danger">Admin</span>
            </div>

            {/* CTA: Agregar producto */}
            <a href="/admin/agregarProducto" className="btn btn-danger neon-btn">
              <i className="bi bi-plus-lg me-1" />
              Agregar producto
            </a>
          </div>

          {listado.length === 0 ? (
            <div className="alert alert-light border text-center">
              No hay productos.
              <div className="mt-3">
                <a href="/admin/agregarProducto" className="btn btn-danger btn-sm neon-btn">
                  <i className="bi bi-plus-lg me-1" /> Crear el primero
                </a>
              </div>
            </div>
          ) : (
            <ul className="list-unstyled m-0">
              {listado.map((p) => {
                const titulo = p.titulo ?? p.nombre ?? "Sin título";
                const categoria = p.categoria ?? p.category ?? "Sin categoría";
                const precio = p.precio ?? p.price ?? 0;
                const src = resolveImgSrc(p.imgSrc ?? p.img ?? p.image ?? p.imagen ?? p.src);
                const alt = p.altText ?? titulo;
                const isDeleted = !!p.__deleted;

                return (
                  <li key={p.__sid} className="mb-2">
                    <article
                      className={`card neon-card border-0 ${isDeleted ? "opacity-50" : ""}`}
                      title={isDeleted ? "Producto deshabilitado" : undefined}
                    >
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
                            <div className="d-flex align-items-center gap-2">
                              <div className="fw-semibold">{titulo}</div>
                              {isDeleted && (
                                <span className="badge text-bg-secondary">Deshabilitado</span>
                              )}
                            </div>
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
                            {isDeleted ? (
                              <button
                                className="btn btn-outline-success btn-sm"
                                onClick={() => habilitar(p.__sid)}
                              >
                                <i className="bi bi-arrow-counterclockwise me-1" />
                                Habilitar
                              </button>
                            ) : (
                              <button
                                className="btn btn-outline-danger btn-sm"
                                onClick={() => eliminar(p.__sid)}
                              >
                                <i className="bi bi-trash me-1" />
                                Eliminar
                              </button>
                            )}
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
