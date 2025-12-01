import React, { useState, useEffect } from "react";
import DashboardSidebar from "../componentes/Dashboard";
import { getProductos } from "../services/productoService";
import { loadDeleted, markDeleted, unmarkDeleted } from "../utilidades/deletedProductsSession";

// ----- helpers -----
const formatCLP = (v) =>
  new Intl.NumberFormat("es-CL", {
    style: "currency",
    currency: "CLP",
    maximumFractionDigits: 0,
  }).format(Number(v) || 0);

const resolveImgSrc = (path) => {
  if (!path) return "/assets/img/placeholder-product.svg";
  if (path.startsWith("http")) return path;
  if (path.startsWith("/")) return path;
  return `/${path.replace(/^\.?\//, "")}`;
};

// ----- componente -----
export default function AdminProductos() {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deletedSet, setDeletedSet] = useState(loadDeleted());

  const cargarProductos = async () => {
    setLoading(true);
    const data = await getProductos();
    setProductos(data);
    setLoading(false);
  };

  useEffect(() => {
    cargarProductos();
  }, []);

  // Soft Delete (Solo visual/sesión)
  const eliminar = (id) => {
    markDeleted(id);
    setDeletedSet(new Set(loadDeleted()));
  };

  // Restaurar
  const restaurar = (id) => {
    unmarkDeleted(id);
    setDeletedSet(new Set(loadDeleted()));
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

          {loading ? (
            <div className="text-center py-5">Cargando productos...</div>
          ) : productos.length === 0 ? (
            <div className="alert alert-light border text-center">
              No hay productos registrados.
            </div>
          ) : (
            <div className="row g-3">
              {productos.map((p) => {
                // Mapeo de datos de la API
                const variante = (p.variantes && p.variantes[0]) || {};
                const imgSrc = resolveImgSrc(variante.imgSrc);
                const precio = variante.precio || 0;
                const stock = variante.stock || 0;
                const isDeleted = deletedSet.has(p.id);

                return (
                  <div key={p.id} className="col-12 col-sm-6 col-lg-4 col-xl-3">
                    <article 
                      className={`card h-100 shadow-sm border-0 neon-card ${isDeleted ? "opacity-50" : ""}`}
                    >
                      <div className="position-relative">
                        <img
                          src={imgSrc}
                          className="card-img-top"
                          alt={p.nombre}
                          style={{ height: 200, objectFit: "cover" }}
                        />
                        <div className="position-absolute top-0 end-0 p-2">
                          <span className="badge bg-dark bg-opacity-75">ID: {p.id}</span>
                        </div>
                        {isDeleted && (
                          <div className="position-absolute top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center bg-dark bg-opacity-25">
                            <span className="badge bg-danger fs-6">ELIMINADO</span>
                          </div>
                        )}
                      </div>

                      <div className="card-body d-flex flex-column">
                        <h5 className="card-title fw-bold text-truncate" title={p.nombre}>
                          {p.nombre}
                        </h5>
                        <p className="card-text small text-muted mb-2 text-truncate">
                          {p.marca} - {p.categoria?.nombreCategoria || "Sin categoría"}
                        </p>
                        
                        <div className="mt-auto d-flex align-items-center justify-content-between">
                          <span className="fw-bold text-danger fs-5">
                            {formatCLP(precio)}
                          </span>
                          <small className="text-muted">Stock: {stock}</small>
                        </div>
                      </div>

                      <div className="card-footer bg-white border-0 pt-0 pb-3 d-flex justify-content-between">
                        <button
                          className="btn btn-sm btn-outline-secondary"
                          title="Editar (Próximamente)"
                          disabled
                        >
                          <i className="bi bi-pencil me-1" /> Editar
                        </button>
                        
                        {isDeleted ? (
                          <button
                            className="btn btn-sm btn-outline-success"
                            onClick={() => restaurar(p.id)}
                            title="Restaurar producto"
                          >
                            <i className="bi bi-arrow-counterclockwise me-1" /> Restaurar
                          </button>
                        ) : (
                          <button
                            className="btn btn-sm btn-outline-danger"
                            onClick={() => eliminar(p.id)}
                            title="Eliminar producto"
                          >
                            <i className="bi bi-trash me-1" /> Eliminar
                          </button>
                        )}
                      </div>
                    </article>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
