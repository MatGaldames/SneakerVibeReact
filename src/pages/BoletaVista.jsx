// src/pages/admin/AdminBoletaView.jsx
import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getAllOrders } from "../utilidades/orderStorage";  // <- ruta corregida
import Boleta from "../componentes/Boleta";            // <- ruta corregida

export default function AdminBoletaView() {
  const { id } = useParams();
  const nav = useNavigate();
  const order = getAllOrders().find(o => o.id === id) || null;

  if (!order) {
    return (
      <main className="container py-5">
        <p>No se encontró la orden.</p>
        <button className="btn btn-secondary" onClick={() => nav(-1)}>Volver</button>
      </main>
    );
  }
  return <Boleta order={order} onClose={() => nav(-1)} />;
}
