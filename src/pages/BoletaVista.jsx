// src/pages/admin/AdminBoletaView.jsx
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getPedidoById } from "../services/pedidoService";
import Boleta from "../componentes/Boleta";

export default function AdminBoletaView() {
  const { id } = useParams();
  const nav = useNavigate();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchOrder() {
      setLoading(true);
      const data = await getPedidoById(id);
      setOrder(data);
      setLoading(false);
    }
    fetchOrder();
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
