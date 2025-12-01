import React, { useEffect, useState } from "react";
import DashboardSidebar from "../componentes/Dashboard";
import { getProductos } from "../services/productoService";
import { getUsuarios } from "../services/usuarioService";
import { getAllOrders } from "../utilidades/orderStorage";
import { loadDeleted } from "../utilidades/deletedProductsSession";
import { loadDeletedUsers } from "../utilidades/deletedUsersSession";

export default function HomeAdmin() {
  const active = "dashboard";
  const nf = new Intl.NumberFormat("es-CL");

  const [counts, setCounts] = useState({
    usuarios: 0,
    pedidos: 0,
    productos: 0,
    reportes: 0
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [usersData, productsData] = await Promise.all([
          getUsuarios(),
          getProductos()
        ]);
        
        const ordersData = getAllOrders();

        const deletedUsers = loadDeletedUsers();
        const deletedProducts = loadDeleted();

        // Filter users
        const visibleUsers = (usersData || []).filter(u => !deletedUsers.has(u.id));
        
        // Filter products
        const visibleProducts = (productsData || []).filter(p => !deletedProducts.has(p.id));

        setCounts({
          usuarios: visibleUsers.length,
          productos: visibleProducts.length,
          pedidos: (ordersData || []).length,
          reportes: 0
        });

      } catch (error) {
        console.error("Error fetching dashboard data", error);
      }
    };

    fetchData();
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
              { icon: "bi-people",      value: nf.format(counts.usuarios),  label: "Usuarios",  href: "/admin/usuarios"  },
              { icon: "bi-receipt",     value: nf.format(counts.pedidos),   label: "Pedidos",   href: "/admin/ordenes"   },
              { icon: "bi-bag",         value: nf.format(counts.productos), label: "Productos", href: "/admin/productos" },
              { icon: "bi-info-square", value: nf.format(counts.reportes),  label: "Reportes",  href: "/admin/reportes"  },
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
