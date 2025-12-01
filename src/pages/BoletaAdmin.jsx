// src/pages/admin/AdminOrders.jsx
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAllOrders } from "../utilidades/orderStorage";

export default function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulamos carga asíncrona para mantener consistencia visual
    setLoading(true);
    const data = getAllOrders();
    setOrders(data);
    setLoading(false);
  }, []);

  if (loading) {
    return <div className="container py-4">Cargando órdenes...</div>;
  }

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
          {orders.map((o) => {
            // Adaptamos campos según lo que guardamos en Envio.jsx
            // newOrder = { id, code, cliente, total, fecha, ... }
            const id = o.id || o.number;
            const fecha = o.fecha || o.createdAt;
            const clienteNombre = o.cliente?.nombre || o.customer?.nombre || "Anónimo";
            const clienteApellido = o.cliente?.apellidos || o.customer?.apellido || "";
            const total = o.total || o.totals?.total || 0;

            return (
              <tr key={id}>
                <td>{o.code || id}</td>
                <td>{fecha ? new Date(fecha).toLocaleString() : "Sin fecha"}</td>
                <td>
                  {clienteNombre} {clienteApellido}
                </td>
                <td>${Number(total).toLocaleString("es-CL")}</td>
                <td>
                  <Link to={`/admin/boletas/${id}`} className="btn btn-primary btn-sm">
                    Ver boleta
                  </Link>
                </td>
              </tr>
            );
          })}
          {orders.length === 0 && (
            <tr><td colSpan="5">Sin órdenes aún.</td></tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
