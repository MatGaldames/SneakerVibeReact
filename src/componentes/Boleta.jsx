// src/components/Boleta.jsx
import React, { useRef } from "react";
import AdminOrders from "../pages/BoletaAdmin";
import AdminBoletaView from "../pages/BoletaVista";

export default function Boleta({ order, onClose }) {
  const ref = useRef(null);

  if (!order) return null;

  const c = order.customer ?? {};
  const d = c.direccion ?? {};
  const items = order.items ?? [];
  const t = order.totals ?? { subtotal: 0, descuento: 0, envio: 0, total: 0 };

  const handlePrint = () => {
    // Opción simple: usa window.print() y añade estilos @media print
    window.print();
  };

  return (
    <div className="container py-4" ref={ref}>
      <style>{`
        @media print {
          .no-print { display:none !important; }
          .boleta { max-width: 800px; margin: 0 auto; }
          body { background: #fff; }
        }
      `}</style>

      <div className="boleta card shadow-sm">
        <div className="card-header d-flex justify-content-between align-items-center">
          <strong>Boleta</strong>
          <span>{order.number}</span>
        </div>

        <div className="card-body">
          <div className="mb-3">
            <h5 className="mb-1">Datos del Cliente</h5>
            <div>{c.nombre} {c.apellido}</div>
            {c.rut && <div>RUT: {c.rut}</div>}
            {c.email && <div>Email: {c.email}</div>}
            {c.telefono && <div>Teléfono: {c.telefono}</div>}
            <div>
              Dirección: {d.calle} {d.numero}{d.depto ? `, Depto ${d.depto}` : ""}, {d.comuna}, {d.region}
            </div>
          </div>

          <div className="mb-3">
            <h5 className="mb-1">Detalle</h5>
            <table className="table table-sm">
              <thead>
                <tr>
                  <th>Producto</th>
                  <th>Cant.</th>
                  <th>Precio</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                {items.map((it, idx) => (
                  <tr key={idx}>
                    <td>
                      {it.nombre}
                      {it.talla ? ` / Talla ${it.talla}` : ""}
                      {it.color ? ` / ${it.color}` : ""}
                    </td>
                    <td>{it.qty}</td>
                    <td>${Number(it.price).toLocaleString("es-CL")}</td>
                    <td>${Number(it.price * it.qty).toLocaleString("es-CL")}</td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr><th colSpan="3" className="text-end">Subtotal</th><th>${Number(t.subtotal).toLocaleString("es-CL")}</th></tr>
                <tr><th colSpan="3" className="text-end">Descuento</th><th>-${Number(t.descuento).toLocaleString("es-CL")}</th></tr>
                <tr><th colSpan="3" className="text-end">Envío</th><th>${Number(t.envio).toLocaleString("es-CL")}</th></tr>
                <tr><th colSpan="3" className="text-end">TOTAL</th><th>${Number(t.total).toLocaleString("es-CL")}</th></tr>
              </tfoot>
            </table>
          </div>

          <div className="d-flex justify-content-between">
            <small>Fecha: {new Date(order.createdAt).toLocaleString()}</small>
            <small>Pago: {order.payment?.method || "—"} ({order.payment?.status || "—"})</small>
          </div>
        </div>

        <div className="card-footer d-flex gap-2">
          <button className="btn btn-secondary no-print" onClick={onClose}>Cerrar</button>
          <button className="btn btn-success ms-auto no-print" onClick={handlePrint}>Imprimir</button>
        </div>
      </div>
    </div>
  );
}
