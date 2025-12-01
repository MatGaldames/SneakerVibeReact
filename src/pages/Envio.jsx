// src/pages/Envio.jsx
import React, { useEffect, useState } from "react";
import { getDatosClienteFromRegistro } from "../utilidades/checkoutPerfil.js";
import { clp } from "../assets/hooks/currency.js";
import { useCarrito } from "../utilidades/useCarrito.js";
import productos from "../data/productos.js";
import { saveOrder } from "../utilidades/orderStorage.js";
import { createPedido } from "../services/pedidoService.js";
import { useNavigate } from "react-router-dom";

function ValidacionTexto({ error }) {
    return error ? <div className="invalid-feedback d-block">{error}</div> : null;
}

function validarCheckout(f) {
    const e = {};
    if (!f.nombre?.trim()) e.nombre = "Ingresa tu nombre.";
    if (!f.apellidos?.trim()) e.apellidos = "Ingresa tus apellidos.";
    const mailOk = /^[^@\s]+@(?:duoc\.cl|profesor\.duoc\.cl|gmail\.com)$/i.test(f.correo || "");
    if (!mailOk) e.correo = "Usa un correo @duoc.cl, @profesor.duoc.cl o @gmail.com";
    if (!f.calle?.trim()) e.calle = "Ingresa tu calle y numeración.";
    if (!f.region?.trim()) e.region = "Selecciona una región.";
    if (!f.comuna?.trim()) e.comuna = "Selecciona una comuna.";
    return e;
}


export default function Envio() {
    const navigate = useNavigate();

    const [compra, setCompra] = useState(null);
    // null → no muestra nada, "ok" → éxito, "error" → rechazado

    const {
        items = [],
        resumen = { cantidad: 0, total: 0 },
        inc, dec, remove, clear, setQty,
    } = useCarrito();


    const [form, setForm] = useState({
        nombre: "", apellidos: "", correo: "",
        calle: "", depto: "", region: "", comuna: "", indicaciones: "",
        simularRechazo: false,
    });
    const [err, setErr] = useState({});

    useEffect(() => {
        const datos = getDatosClienteFromRegistro();
        console.log("[checkout] datos detectados para prefill ➜", datos); // <- mira la consola

        // Plan A: helper ya mapea todo
        if (datos) {
            setForm((s) => ({ ...s, ...datos }));
            return;
        }

        // Plan B: lectura directa por si la key o nombres difieren
        try {
            const raw = JSON.parse(localStorage.getItem("usuarioActual"));
            if (raw) {
                const full = raw.nombreCompleto || raw.nombre || "";
                const [nombre, ...rest] = String(full).trim().split(/\s+/);
                const apellidos = rest.join(" ");
                const numero = raw.numeroDomicilio || raw.numeracion || "";
                const calle = `${raw.direccion || ""}${numero ? " " + numero : ""}`.trim();

                setForm((s) => ({
                    ...s,
                    nombre: nombre || s.nombre,
                    apellidos: apellidos || s.apellidos,
                    correo: raw.correoElectronico || raw.email || raw.correo || s.correo,
                    calle: calle || s.calle,
                    region: raw.region || s.region,
                    comuna: raw.comuna || s.comuna,
                }));
            }
        } catch { }
    }, []);

    const onChange = (e) => {
        const { id, value, type, checked } = e.target;
        setForm((s) => ({
            ...s,
            [id]: type === "checkbox" ? checked : value
        }));
    };



    const onSubmitCheckout = (e) => {
        e.preventDefault();
        const v = validarCheckout(form);
        setErr(v);

        if (Object.keys(v).length > 0) {
            setCompra({ status: "error" });
            return;
        }

        // ✅ Todo válido: generamos la orden
        const orderNumber = new Date()
            .toISOString()
            .slice(0, 10)
            .replace(/-/g, "") + Math.floor(100 + Math.random() * 900);
        const orderCode = "ORDER" + Math.floor(10000 + Math.random() * 90000);

        const estado = form.simularRechazo ? "rechazada" : "aprobada";

        const newOrder = {
            id: orderNumber,
            code: orderCode,
            status: estado,
            cliente: {
                nombre: form.nombre,
                apellidos: form.apellidos,
                correo: form.correo,
                region: form.region,
                comuna: form.comuna,
                direccion: `${form.calle} ${form.depto}`,
            },
            items,
            total: resumen.total,
            fecha: new Date().toLocaleString("es-CL"),
        };

        // Guarda la orden localmente
        saveOrder(newOrder);

        // Guarda la orden en la BD
        createPedido(newOrder).then((res) => {
            if (res) {
                console.log("Pedido guardado en BD:", res);
            } else {
                console.error("No se pudo guardar el pedido en la BD");
            }
        });

        if (!form.simularRechazo) {
            clear();
        }

        // (Opcional) Limpia el carrito
        clear();

        // Muestra banner (si quieres seguir usándolo)
        setCompra({ status: "ok", orderNumber, orderCode });

        // 👇👈 AQUÍ GENERAS LA BOLETA: te vas a la página Boleta
        navigate("/boleta", {
            state: {
                orderId: newOrder,
            },
        });
    };


    const getThumb = (it) => {
        if (it?.imgSrc) return { src: it.imgSrc, alt: it.altText || it.titulo || it.id, titulo: it.titulo || it.id };
        const p = productos.find(p => p.id === it.id);
        return { src: p?.imgSrc, alt: p?.altText || p?.titulo || it.id, titulo: p?.titulo || it.id };
    };

    return (
        <div className="container py-4">
            {compra?.status === "ok" && (
                <div className="alert alert-success border-0 shadow-sm d-flex align-items-center justify-content-between mb-4">
                    <div className="d-flex align-items-center gap-2">
                        <span
                            className="d-inline-flex align-items-center justify-content-center rounded-circle"
                            style={{ width: 28, height: 28, border: "1px solid #198754", color: "#198754" }}
                        >
                            ✓
                        </span>
                        <div>
                            <strong>Se ha realizado la compra.</strong>{" "}
                            <span className="text-muted">nro #{compra.orderNumber}</span>
                            <div className="small text-muted">Código orden: <strong>{compra.orderCode}</strong></div>
                        </div>
                    </div>
                    <button type="button" className="btn-close" aria-label="Close" onClick={() => setCompra(null)}></button>
                </div>
            )}

            {compra?.status === "error" && (
                <div className="alert alert-danger border-0 shadow-sm d-flex align-items-center justify-content-between mb-4">
                    <div className="d-flex align-items-center gap-2">
                        <span
                            className="d-inline-flex align-items-center justify-content-center rounded-circle"
                            style={{ width: 28, height: 28, border: "1px solid #dc3545", color: "#dc3545" }}
                        >
                            ✕
                        </span>
                        <div>
                            <strong>Compra rechazada.</strong>{" "}
                            <span className="text-muted">Por favor completa todos los campos obligatorios.</span>
                        </div>
                    </div>
                    <button type="button" className="btn-close" aria-label="Close" onClick={() => setCompra(null)}></button>
                </div>
            )}
            <div className="row g-4">
                <div className="col-12 col-lg-8">
                    <div className="card border-0 shadow-sm">
                        <div className="card-body">
                            <h2 className="h6 mb-3">Carrito ({items.length})</h2>

                            {items.length === 0 ? (
                                <p className="text-muted mb-0">Tu carrito está vacío.</p>
                            ) : (
                                <ul className="list-group list-group-flush">
                                    {items.map((it) => {
                                        const t = getThumb(it);
                                        return (
                                            <li key={it.id} className="list-group-item">
                                                <div className="row align-items-center g-3">

                                                    <div className="col-3 col-md-2">
                                                        {t.src ? (
                                                            <img
                                                                src={t.src}
                                                                alt={t.alt}
                                                                className="img-fluid rounded border"
                                                                style={{ width: "64px", height: "64px", objectFit: "cover" }}
                                                            />
                                                        ) : (
                                                            <div
                                                                className="bg-light rounded border d-flex align-items-center justify-content-center"
                                                                style={{ width: "64px", height: "64px" }}
                                                            >
                                                                <span className="text-muted small">Sin img</span>
                                                            </div>
                                                        )}
                                                    </div>

                                                    <div className="col-9 col-md-4">
                                                        <div className="fw-semibold small mb-1">{t.titulo}</div>
                                                        {it.talla && <div className="text-muted small">Talla: {it.talla}</div>}
                                                    </div>

                                                    <div className="col-6 col-md-3">
                                                        <div className="input-group input-group-sm">
                                                            <button className="btn btn-outline-secondary" type="button" onClick={() => dec(it.id)}>-</button>
                                                            <input
                                                                className="form-control text-center"
                                                                value={it.cantidad ?? 1}
                                                                onChange={(e) => setQty(it.id, e.target.value)}
                                                            />
                                                            <button className="btn btn-outline-secondary" type="button" onClick={() => inc(it.id)}>+</button>
                                                        </div>
                                                    </div>

                                                    <div className="col-6 col-md-2 text-end">
                                                        <div className="fw-semibold">
                                                            {clp.format((it.precio || 0) * (it.cantidad || 0))}
                                                        </div>
                                                        <div className="text-muted small">{clp.format(it.precio || 0)} c/u</div>
                                                    </div>

                                                    <div className="col-12 col-md-1 text-end">
                                                        <button className="btn btn-sm btn-link text-danger" onClick={() => remove(it.id)}>
                                                            Quitar
                                                        </button>
                                                    </div>
                                                </div>
                                            </li>
                                        );
                                    })}
                                </ul>
                            )}
                        </div>
                    </div>

                    <div className="card border-0 shadow-sm mt-4">
                        <div className="card-body">
                            <h3 className="h6 mb-3">Información del cliente</h3>
                            <form onSubmit={onSubmitCheckout} noValidate>
                                <div className="row">
                                    <div className="col-12 col-md-6 mb-3">
                                        <label className="form-label" htmlFor="nombre">Nombre*</label>
                                        <input id="nombre" className={`form-control ${err.nombre ? "is-invalid" : ""}`}
                                            value={form.nombre} onChange={onChange} />
                                        <ValidacionTexto error={err.nombre} />
                                    </div>
                                    <div className="col-12 col-md-6 mb-3">
                                        <label className="form-label" htmlFor="apellidos">Apellidos*</label>
                                        <input id="apellidos" className={`form-control ${err.apellidos ? "is-invalid" : ""}`}
                                            value={form.apellidos} onChange={onChange} />
                                        <ValidacionTexto error={err.apellidos} />
                                    </div>
                                    <div className="col-12 mb-3">
                                        <label className="form-label" htmlFor="correo">Correo*</label>
                                        <input type="email" id="correo"
                                            className={`form-control ${err.correo ? "is-invalid" : ""}`}
                                            value={form.correo} onChange={onChange}
                                            placeholder="tu.correo@duoc.cl" />
                                        <ValidacionTexto error={err.correo} />
                                    </div>
                                </div>

                                <h3 className="h6 mt-2 mb-3">Dirección de entrega</h3>
                                <div className="row">
                                    <div className="col-12 col-md-8 mb-3">
                                        <label className="form-label" htmlFor="calle">Calle*</label>
                                        <input id="calle" className={`form-control ${err.calle ? "is-invalid" : ""}`}
                                            value={form.calle} onChange={onChange}
                                            placeholder="Ej: Av. Siempre Viva 742" />
                                        <ValidacionTexto error={err.calle} />
                                    </div>
                                    <div className="col-12 col-md-4 mb-3">
                                        <label className="form-label" htmlFor="depto">Departamento (opcional)</label>
                                        <input id="depto" className="form-control"
                                            value={form.depto} onChange={onChange} placeholder="Ej: 603" />
                                    </div>
                                    <div className="col-12 col-md-6 mb-3">
                                        <label className="form-label" htmlFor="region">Región*</label>
                                        <select id="region" className={`form-select ${err.region ? "is-invalid" : ""}`}
                                            value={form.region} onChange={onChange}>
                                            <option value="">Selecciona…</option>
                                            <option>Región Metropolitana de Santiago</option>
                                            <option>Valparaíso</option>
                                            <option>Biobío</option>
                                        </select>
                                        <ValidacionTexto error={err.region} />
                                    </div>
                                    <div className="col-12 col-md-6 mb-3">
                                        <label className="form-label" htmlFor="comuna">Comuna*</label>
                                        <select id="comuna" className={`form-select ${err.comuna ? "is-invalid" : ""}`}
                                            value={form.comuna} onChange={onChange}>
                                            <option value="">Selecciona…</option>
                                            <option>Puente Alto</option>
                                            <option>Maipú</option>
                                            <option>Cerrillos</option>
                                        </select>
                                        <ValidacionTexto error={err.comuna} />
                                    </div>
                                    <div className="col-12 mb-3">
                                        <label className="form-label" htmlFor="indicaciones">Indicaciones (opcional)</label>
                                        <textarea id="indicaciones" className="form-control"
                                            value={form.indicaciones} onChange={onChange}
                                            placeholder="Entre calles, sin timbre, etc." />
                                    </div>
                                </div>
                                <div className="form-check mb-3">
                                    <input
                                        className="form-check-input"
                                        type="checkbox"
                                        id="simularRechazo"
                                        checked={form.simularRechazo}
                                        onChange={onChange}
                                    />
                                    <label className="form-check-label" htmlFor="simularRechazo">
                                        VALIDAR BOLETA
                                    </label>
                                </div>
                                <div className="d-flex justify-content-end">
                                    <button className="btn btn-danger"
                                    >
                                        Pagar ahora {clp.format(resumen.total)}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>


            </div>
        </div>
    );
}
