import React from "react";
import DashboardSidebar from "../componentes/Dashboard";
import productosData from "../data/productos";
import usuariosData from "../data/usuarios";
import { loadDeleted, getStableId } from "../utilidades/deletedProductsSession";
import { loadDeletedUsers, getStableUserId } from "../utilidades/deletedUsersSession";

// Lee usuarios creados en localStorage (clave actual y legacy) y deduplica por correo
const leerUsuariosExtraLocal = () => {
  const parse = (txt) => {
    try {
      const arr = JSON.parse(txt || "[]");
      return Array.isArray(arr) ? arr : [];
    } catch {
      return [];
    }
  };
  const actuales = parse(localStorage.getItem("sv_usuarios_extra"));
  const legacy   = parse(localStorage.getItem("usuarios"));

  const key = (u) => String(u?.correo ?? u?.email ?? "").toLowerCase();
  const map = new Map();
  [...actuales, ...legacy].forEach((u) => {
    const k = key(u);
    if (k) map.set(k, u);
  });
  return [...map.values()];
};

export default function HomeAdmin() {
  const active = "dashboard";
  const nf = new Intl.NumberFormat("es-CL");

  // Productos visibles (descontando eliminados en la sesión)
  const productCount = React.useMemo(() => {
    const deleted = loadDeleted();
    return (productosData || []).filter((p, i) => !deleted.has(getStableId(p, i))).length;
  }, []);

  // Usuarios visibles (seed + registrados en localStorage, descontando eliminados en la sesión)
  const userCount = React.useMemo(() => {
    const deleted = loadDeletedUsers();
    const extras  = leerUsuariosExtraLocal();
    const all     = [...(usuariosData || []), ...extras];
    return all.filter((u, i) => !deleted.has(getStableUserId(u, i))).length;
  }, []);

  return (
    <main className="min-vh-100 bg-light d-flex flex-column flex-md-row">
      {/* Tabs superiores solo en móvil (debajo del navbar) */}
      <nav className="admin-top-tabs d-md-none w-100">
        <div className="container-fluid py-2">
          <ul className="nav nav-pills justify-content-around">
            <li className="nav-item">
              <a href="/admin/dashboard" className={`nav-link ${active === "dashboard" ? "active" : ""}`}>
                <i className="bi bi-speedometer2 me-1" /> Dashboard
              </a>
            </li>
            <li className="nav-item">
              <a href="/admin/reportes" className={`nav-link ${active === "reportes" ? "active" : ""}`}>
                <i className="bi bi-graph-up-arrow me-1" /> Reportes
              </a>
            </li>
            <li className="nav-item">
              <a href="/admin/productos" className={`nav-link ${active === "productos" ? "active" : ""}`}>
                <i className="bi bi-box-seam me-1" /> Productos
              </a>
            </li>
          </ul>
        </div>
      </nav>

      {/* Sidebar a la izquierda (oculto en móvil) */}
      <DashboardSidebar active={active} />

      {/* Contenido */}
      <section className="flex-grow-1 p-4">
        <div className="container-fluid">
          <div className="d-flex align-items-center justify-content-between mb-4">
            <h3 className="fw-bold">Dashboard</h3>
            <span className="badge rounded-pill text-bg-danger">Admin</span>
          </div>

          {/* KPIs superiores */}
          <div className="row g-3 mb-4">
            {[
              { icon: "bi-people",      value: nf.format(userCount),  label: "Usuarios",  href: "/admin/usuarios"  },
              { icon: "bi-receipt",     value: "2",               label: "Pedidos",   href: "/admin/ordenes"   },
              { icon: "bi-bag",         value: nf.format(productCount), label: "Productos", href: "/admin/productos" },
              { icon: "bi-info-square", value: "0",                 label: "Reportes",  href: "/admin/reportes"  },
            ].map((k, i) => (
              <div className="col-12 col-sm-6 col-lg-3" key={i}>
                <div className="card h-100 border-0 text-center neon-card">
                  <div className="card-body d-flex flex-column align-items-center justify-content-center gap-2 py-4">
                    <i className={`bi ${k.icon} fs-1 text-danger`} />
                    <div className="fw-bold fs-4">{k.value}</div>
                    <small className="text-muted">{k.label}</small>
                    <a href={k.href} className="stretched-link" aria-label={k.label}></a>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* gráfico placeholder */}
          <div className="card">
            <div className="card-header bg-white">
              <strong>Actividad semanal</strong>
            </div>
            <div className="card-body">
              <div className="border rounded p-5 text-center text-muted">
                (aquí irá tu gráfico — por ahora placeholder)
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
