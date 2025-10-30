import React from "react";

export default function DashboardSidebar({ active = "dashboard" }) {
  const itemClass = (key) =>
    `nav-link fw-semibold ${active === key ? "active text-danger" : ""}`;

  return (
    // Oculto en móvil, visible desde md en adelante
    <aside className="sidebar-admin d-none d-md-flex flex-column p-4 shadow-sm">
      <ul className="nav flex-column gap-2 w-100">
        <li className="nav-item">
          <a href="/admin/dashboard" className={itemClass("dashboard")}>
            <i className="bi bi-speedometer2" />
            <span className="ms-2">Dashboard</span>
          </a>
        </li>
        <li className="nav-item">
          <a href="/admin/reportes" className={itemClass("reportes")}>
            <i className="bi bi-graph-up-arrow" />
            <span className="ms-2">Reportes</span>
          </a>
        </li>
        <li className="nav-item">
          <a href="/admin/productos" className={itemClass("productos")}>
            <i className="bi bi-box-seam" />
            <span className="ms-2">Productos</span>
          </a>
        </li>
      </ul>
    </aside>
  );
}