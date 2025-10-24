// src/pages/Carrito.jsx
import React from "react";
import { useCarrito } from "../utilidades/useCarrito";
import { clp } from "../assets/hooks/currency";

export default function Carrito() {
  const { items, resumen, inc, dec, setQty, remove, clear } = useCarrito();

  return (
    <div className="d-flex flex-column min-vh-100 bg-white">

        {/* Mantiene tu estructura */}
      {/*<main className="container py-5 flex-grow-1"></main>*/}

      {/* Sección principal del carrito */}
      <section className="container py-5 flex-grow-1">
        <div className="container">
          <div className="row">
            {/* Columna izquierda: productos */}
            <div className="col-12 col-lg-8 mb-4">
              <div className="card border-0 shadow-sm">
                <div className="card-body">
                  <h2 className="h5 mb-4">Tu Carrito</h2>

                  {items.length === 0 ? (
                    <p className="text-muted m-0">
                      No tienes productos en el carrito.
                    </p>
                  ) : (
                    <ul className="list-unstyled m-0">
                      {items.map((it) => (
                        <li
                          key={it.id}
                          className="media border rounded p-3 mb-3"
                        >
                          <img
                            src={it.imgSrc || "/assets/img/placeholder.png"}
                            alt={it.titulo || "Producto"}
                            className="mr-3"
                            style={{
                              width: 90,
                              height: 90,
                              objectFit: "cover",
                              borderRadius: 8,
                            }}
                          />
                          <div className="media-body">
                            <div className="d-flex justify-content-between align-items-start">
                              <div>
                                <h5 className="mt-0 mb-1">{it.titulo}</h5>
                                {it.talla && (
                                  <small className="text-muted">
                                    Talla: {it.talla}
                                  </small>
                                )}
                              </div>
                              <div className="text-right">
                                <div className="font-weight-bold">
                                  {clp.format(it.precio || 0)}
                                </div>
                                <small className="text-muted">
                                  Subtotal:{" "}
                                  {clp.format(
                                    (it.precio || 0) * (it.cantidad || 0)
                                  )}
                                </small>
                              </div>
                            </div>

                            {/* Controles de cantidad */}
                            <div className="d-flex align-items-center mt-3">
                              <div
                                className="input-group"
                                style={{ maxWidth: 150 }}
                              >
                                <div className="input-group-prepend">
                                  <button
                                    className="btn btn-outline-secondary"
                                    type="button"
                                    onClick={() => dec(it.id)}
                                  >
                                    -
                                  </button>
                                </div>
                                <input
                                  type="number"
                                  className="form-control text-center"
                                  min="1"
                                  value={it.cantidad || 1}
                                  onChange={(e) =>
                                    setQty(it.id, e.target.value)
                                  }
                                />
                                <div className="input-group-append">
                                  <button
                                    className="btn btn-outline-secondary"
                                    type="button"
                                    onClick={() => inc(it.id)}
                                  >
                                    +
                                  </button>
                                </div>
                              </div>

                              <button
                                className="btn btn-link text-danger ml-3"
                                onClick={() => remove(it.id)}
                              >
                                Quitar
                              </button>
                            </div>
                          </div>
                        </li>
                      ))}
                    </ul>
                  )}

                  {items.length > 0 && (
                    <div className="d-flex justify-content-between align-items-center mt-3">
                      <small className="text-muted">
                        Productos: {resumen.cantidad}
                      </small>
                      <button
                        className="btn btn-sm btn-outline-danger"
                        onClick={clear}
                      >
                        Vaciar carrito
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Columna derecha: resumen y pago */}
            <div className="col-12 col-lg-4">
              <div className="card border-0 shadow-sm mb-4">
                <div className="card-body">
                  <h2 className="h6 mb-3">Resumen del pedido</h2>

                  <div className="d-flex justify-content-between mb-2">
                    <span>Cantidad total</span>
                    <strong>{resumen.cantidad}</strong>
                  </div>

                  <div className="d-flex justify-content-between mb-2">
                    <span>Total</span>
                    <strong>{clp.format(resumen.total)}</strong>
                  </div>

                  <button
                    className="btn btn-danger btn-block mt-3"
                    disabled={items.length === 0}
                  >
                    Pagar
                  </button>
                  <small className="text-muted d-block mt-2">
                    Al continuar aceptas nuestros términos.
                  </small>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>    </div>
  );
}
