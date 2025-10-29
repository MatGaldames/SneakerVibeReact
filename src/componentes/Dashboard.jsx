    import React from "react";

    export default function DashboardSidebar({
    active = "dashboard", // "dashboard" | "reportes" | "productos"
    }) {
    const itemClass = (key) =>
        `nav-link fw-semibold neon-link ${active === key ? "active text-white" : "text-dark"}`;

    return (
        <aside className="sidebar-admin sidebar-left d-flex flex-column align-items-start p-4 shadow-lg">
        <h4 className="fw-bold text-danger mb-4">Admin</h4>

        <ul className="nav flex-column w-100">
            <li className="nav-item mb-2">
            <a href="/admin/dashboard" className={itemClass("dashboard")}>
                <i className="bi bi-speedometer2 me-2" /> Dashboard
            </a>
            {/* <Link to="/admin/dashboard" className={itemClass("dashboard")}> ... </Link> */}
            </li>
            <li className="nav-item mb-2">
            <a href="/admin/reportes" className={itemClass("reportes")}>
                <i className="bi bi-graph-up-arrow me-2" /> Reportes
            </a>
            </li>
            <li className="nav-item mb-2">
            <a href="/admin/productos" className={itemClass("productos")}>
                <i className="bi bi-box-seam me-2" /> Productos
            </a>
            </li>
        </ul>
        </aside>
    );
    }
