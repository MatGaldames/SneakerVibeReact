// src/components/Boleta.jsx
import React, { useRef } from "react";

export default function Boleta({ order, onClose }) {
  const ref = useRef(null);

  if (!order) return null;

  // Adaptar estructura (Envio.jsx)
  const cliente = order.cliente || {};
  const items = order.items || [];
  const total = order.total || 0;
  const fecha = order.fecha || "";
  const numero = order.code || order.id || "---";

  // Dirección viene como string en cliente.direccion
  const direccionCompleta = cliente.direccion || "";
  const comuna = cliente.comuna || "";
  const region = cliente.region || "";

  const handlePrint = () => {
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
          <span>{numero}</span>
        </div>

        <div className="card-body">
          <div className="mb-3">
            <h5 className="mb-1">Datos del Cliente</h5>
            <div>{cliente.nombre} {cliente.apellidos}</div>
            {cliente.correo && <div>Email: {cliente.correo}</div>}
            <div>
              Dirección: {direccionCompleta}
              {comuna ? `, ${comuna}` : ""}
              {region ? `, ${region}` : ""}
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
                {items.map((it, idx) => {
                  const nombre = it.titulo || it.nombre || "Producto";
                  const cantidad = it.cantidad || 1;
                  const precio = it.precio || 0;
                  return (
                    <tr key={idx}>
                      <td>
                        {nombre}
                        {it.talla ? ` / Talla ${it.talla}` : ""}
                      </td>
                      <td>{cantidad}</td>
                      <td>${Number(precio).toLocaleString("es-CL")}</td>
                      <td>${Number(precio * cantidad).toLocaleString("es-CL")}</td>
                    </tr>
                  );
                })}
              </tbody>
              <tfoot>
                <tr><th colSpan="3" className="text-end">TOTAL</th><th>${Number(total).toLocaleString("es-CL")}</th></tr>
              </tfoot>
            </table>
          </div>

          <div className="d-flex justify-content-between">
            <small>Fecha: {fecha}</small>
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
