// src/pages/admin/AdminOrders.jsx
import React from "react";
import { Link } from "react-router-dom";
import { getAllOrders } from "../utilidades/orderStorage"; // <- ruta corregida

export default function AdminOrders() {
  const orders = getAllOrders();

  return (
    <div className="container py-4">
      <h2>Órdenes</h2>
      <table className="table table-sm table-striped">
        <thead>
          <tr>
            <th>#</th>
            <th>Fecha</th>
            <th>Cliente</th>
            <th>Total</th>
            <th>Boleta</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((o) => (
            <tr key={o.id}>
              <td>{o.number}</td>
              <td>{new Date(o.createdAt).toLocaleString()}</td>
              <td>
                {o.customer?.nombre} {o.customer?.apellido}
                {o._legacy && <span className="badge bg-warning ms-2">LEGACY</span>}
              </td>
              <td>${Number(o.totals?.total ?? 0).toLocaleString("es-CL")}</td>
              <td>
                <Link to={`/admin/boletas/${o.id}`} className="btn btn-primary btn-sm">
                  Ver boleta
                </Link>
              </td>
            </tr>
          ))}
          {orders.length === 0 && (
            <tr><td colSpan="5">Sin órdenes aún.</td></tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
