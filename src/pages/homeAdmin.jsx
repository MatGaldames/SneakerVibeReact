import React from "react";
import DashboardSidebar from "../componentes/Dashboard";

export default function HomeAdmin() {
  return (
    <main className="d-flex min-vh-100 bg-light">
      {/* Sidebar a la izquierda */}
      <DashboardSidebar active="dashboard" />

      {/* Contenido */}
      <section className="flex-grow-1 p-4">
        <div className="container-fluid">
          <div className="d-flex align-items-center justify-content-between mb-4">
            <h3 className="fw-bold">Dashboard</h3>
            <span className="badge rounded-pill text-bg-danger">Admin</span>
          </div>

          {/* KPI cards */}
          <div className="row g-3 mb-4">
            {[
              { icon: "bi-people", label: "Usuarios", value: "2.5K" },
              { icon: "bi-bag-check", label: "Pedidos", value: "1.8K" },
              { icon: "bi-box-seam", label: "Productos", value: "54" },
              { icon: "bi-cash-coin", label: "Ventas", value: "$3.2M" },
            ].map((k, i) => (
              <div className="col-12 col-sm-6 col-lg-3" key={i}>
                <div className="card shadow-sm neon-card h-100">
                  <div className="card-body d-flex align-items-center">
                    <i className={`bi ${k.icon} fs-2 text-danger me-3`} />
                    <div>
                      <div className="fw-bold fs-5">{k.value}</div>
                      <small className="text-muted">{k.label}</small>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* “Social tiles” (mock) */}
          <div className="row g-3 mb-4">
            {[
              { name: "Facebook", brand: "primary", metric: "35k", sub: "Friends" },
              { name: "Twitter", brand: "info", metric: "584k", sub: "Followers" },
              { name: "LinkedIn", brand: "secondary", metric: "758+", sub: "Contacts" },
              { name: "YouTube", brand: "danger", metric: "450", sub: "Subs" },
            ].map((s, i) => (
              <div className="col-12 col-sm-6 col-lg-3" key={i}>
                <div className={`card text-white bg-${s.brand} shadow-sm neon-card h-100`}>
                  <div className="card-body">
                    <div className="d-flex align-items-center">
                      <i className="bi bi-bar-chart fs-3 me-2" />
                      <h6 className="mb-0">{s.name}</h6>
                    </div>
                    <div className="mt-3 fs-4 fw-bold">{s.metric}</div>
                    <small className="opacity-75">{s.sub}</small>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Área de gráfico (placeholder por ahora) */}
          <div className="card shadow-sm neon-card">
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
