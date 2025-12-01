// src/pages/admin/AdminBoletaView.jsx
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getAllOrders } from "../utilidades/orderStorage";
import Boleta from "../componentes/Boleta";

export default function AdminBoletaView() {
  const { id } = useParams();
  const nav = useNavigate();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const all = getAllOrders();
    // Buscamos por id o por code, según lo que venga en la URL
    const found = all.find((o) => String(o.id) === id || String(o.code) === id);
    setOrder(found || null);
    setLoading(false);
  }, [id]);

  if (loading) {
    return <div className="container py-5">Cargando boleta...</div>;
  }

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
