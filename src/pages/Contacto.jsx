import React, { useState } from "react";
import { validarContacto } from "../assets/validaciones/contactanos";

export default function Contacto({ bgUrl = "/assets/img/auth-bg.jpg" }) {
  const [form, setForm] = useState({ nombre: "", correo: "", asunto: "", mensaje: "" });
  const [errores, setErrores] = useState({});

  const manejarCambio = (e) => {
    const { id, value } = e.target;
    setForm((prev) => ({ ...prev, [id]: value }));
  };
  const manejarEnfocar = () => {
    setErrores(validarContacto(form));
  };
  const manejarEnviar = (e) => {
    e.preventDefault();
    const val = validarContacto(form);
    setErrores(val);
    if (Object.keys(val).length === 0) {
    }
  };

  return (
    <main
      className="d-flex flex-column justify-content-center align-items-center min-vh-100"
      style={{
        backgroundImage: `url('${bgUrl}')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="container my-5">
        <div className="row justify-content-center">
          <div className="col-12 col-md-8 col-lg-6">
            <div className="card shadow-lg p-4 border-0 rounded-4">
              <h3 className="text-center mb-4 text-danger">Contáctanos</h3>

              <form onSubmit={manejarEnviar} noValidate>
                <div className="mb-3">
                  <label htmlFor="nombre" className="form-label fw-semibold">
                    Nombre completo
                  </label>
                  <input
                    type="text"
                    id="nombre"
                    className={`form-control ${errores.nombre ? "is-invalid" : ""}`}
                    placeholder="Tu nombre"
                    value={form.nombre}
                    onChange={manejarCambio}
                    onBlur={manejarEnfocar}
                    required
                  />
                  {errores.nombre && (
                    <div className="invalid-feedback">{errores.nombre}</div>
                  )}
                </div>

                <div className="mb-3">
                  <label htmlFor="correo" className="form-label fw-semibold">
                    Correo electrónico
                  </label>
                  <input
                    type="email"
                    id="correo"
                    className={`form-control ${errores.correo ? "is-invalid" : ""}`}
                    placeholder="ejemplo@correo.com"
                    value={form.correo}
                    onChange={manejarCambio}
                    onBlur={manejarEnfocar}
                    required
                  />
                  {errores.correo && (
                    <div className="invalid-feedback">{errores.correo}</div>
                  )}
                </div>

                <div className="mb-3">
                  <label htmlFor="asunto" className="form-label fw-semibold">
                    Asunto
                  </label>
                  <input
                    type="text"
                    id="asunto"
                    className={`form-control ${errores.asunto ? "is-invalid" : ""}`}
                    placeholder="Motivo de tu mensaje"
                    value={form.asunto}
                    onChange={manejarCambio}
                    onBlur={manejarEnfocar}
                    required
                  />
                  {errores.asunto && (
                    <div className="invalid-feedback">{errores.asunto}</div>
                  )}
                </div>

                <div className="mb-3">
                  <label htmlFor="mensaje" className="form-label fw-semibold">
                    Mensaje
                  </label>
                  <textarea
                    id="mensaje"
                    className={`form-control ${errores.mensaje ? "is-invalid" : ""}`}
                    value={form.mensaje}
                    onChange={manejarCambio}
                    onBlur={manejarEnfocar}
                    rows="5"
                    placeholder="Escribe aquí tu mensaje..."
                    required
                  ></textarea>
                  {errores.mensaje && (
                    <div className="invalid-feedback">{errores.mensaje}</div>
                  )}
                </div>

                <button type="submit" className="btn btn-danger w-100">
                  Enviar mensaje
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
