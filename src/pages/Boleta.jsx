// src/pages/Boleta.jsx
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { clp } from "../assets/hooks/currency.js";
import { getLastOrder } from "../utilidades/orderStorage.js";

export default function Boleta() {
    const location = useLocation();
    const navigate = useNavigate();

    const orderFromState = location.state?.order;
    const order = orderFromState || getLastOrder();

    if (!order) {
        return (
            <main className="container my-5">
                <h3>Boleta</h3>
                <p className="text-muted">
                    No hay datos de compra para mostrar. Realiza una compra desde el carrito.
                </p>
                <button className="btn btn-danger mt-3" onClick={() => navigate("/carrito")}>
                    Ir al carrito
                </button>
            </main>
        );
    }

    const {
        id,
        code,
        cliente = {},
        items = [],
        total = 0,
        fecha,
        status,
    } = order;

    const esRechazada = status === "rechazada";   // 👈 AQUÍ DECIDIMOS

    return (
        <main className="container my-5">
            <div className="border rounded p-4 bg-light">
                {/* ⚠️ Aviso de boleta rechazada */}
                {esRechazada && (
                    <div className="alert alert-danger mb-3">
                        <strong>Boleta rechazada.</strong>{" "}
                        <span className="text-muted">
                            El pago no fue validado (simulación de prueba).
                        </span>
                    </div>
                )}

                {/* Encabezado */}
                <div className="d-flex justify-content-between mb-3">
                    <div>
                        <h3 className="mb-1">SneakerVibe</h3>
                        <small>Boleta electrónica</small>
                    </div>
                    <div className="text-end">
                        <p className="mb-1">N° {id}</p>
                        <p className="mb-0">Fecha: {fecha}</p>
                        {code && (
                            <p className="mb-0">
                                <small>Código orden: {code}</small>
                            </p>
                        )}
                    </div>
                </div>

                <hr />

                {/* Cliente */}
                <div className="mb-3">
                    <h5 className="mb-2">Datos del cliente</h5>
                    <p className="mb-0">
                        <strong>Nombre:</strong> {cliente.nombre} {cliente.apellidos}
                    </p>
                    <p className="mb-0">
                        <strong>Correo:</strong> {cliente.correo}
                    </p>
                    <p className="mb-0">
                        <strong>Dirección:</strong> {cliente.direccion}, {cliente.comuna},{" "}
                        {cliente.region}
                    </p>
                </div>

                <hr />

                {/* Detalle compra */}
                <div className="mb-3">
                    <h5 className="mb-3">Detalle de la compra</h5>
                    <div className="table-responsive">
                        <table className="table table-sm align-middle">
                            <thead>
                                <tr>
                                    <th>Producto</th>
                                    <th>Variante</th>
                                    <th className="text-center">Cant.</th>
                                    <th className="text-end">Precio</th>
                                    <th className="text-end">Subtotal</th>
                                </tr>
                            </thead>
                            <tbody>
                                {items.map((it) => {
                                    const precio = it.precio || 0;
                                    const cantidad = it.cantidad || 1;
                                    const subtotal = precio * cantidad;

                                    return (
                                        <tr key={it.id}>
                                            <td>{it.titulo || it.nombre || it.id}</td>
                                            <td>
                                                <small>
                                                    {it.color ? `${it.color} ` : ""}
                                                    {it.talla ? `· Talla: ${it.talla}` : ""}
                                                </small>
                                            </td>
                                            <td className="text-center">{cantidad}</td>
                                            <td className="text-end">{clp.format(precio)}</td>
                                            <td className="text-end">{clp.format(subtotal)}</td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>

                <hr />

                {/* Total */}
                <div className="d-flex justify-content-end">
                    <div style={{ minWidth: "250px" }}>
                        <div className="d-flex justify-content-between">
                            <span className="fw-bold">Total a pagar:</span>
                            <span className="fw-bold">{clp.format(total)}</span>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
