// src/pages/Boleta.jsx
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getLastOrder } from "../utilidades/orderStorage.js";
import { getPedidoById } from "../services/pedidoService.js";
import BoletaComponent from "../componentes/Boleta.jsx";

export default function Boleta() {
    const location = useLocation();
    const navigate = useNavigate();
    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // 1. Intentar obtener ID desde el state de navegación
        let currentOrder = location.state?.orderId;

        // 2. Si no hay state, intentar desde el último guardado local
        if (!currentOrder) {
            currentOrder = getLastOrder();
        }

        setOrder(currentOrder);
        setLoading(false);
    }, [location.state]);

    if (loading) {
        return (
            <main className="container my-5 text-center">
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Cargando boleta...</span>
                </div>
            </main>
        );
    }

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

    // Usamos el componente compartido que ya sabe leer la estructura
    return <BoletaComponent order={order} onClose={() => navigate("/")} />;
}
