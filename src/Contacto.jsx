// src/Contacto.jsx
import React, { useState } from "react";
import { checkName, checkMaxLength } from "./assets/validaciones/formScripts";

export default function Contacto({ bgUrl = "/assets/img/auth-bg.jpg" }) {
  const [form, setForm] = useState({
    nombre: '',
    mensaje: '',
  });

  const [error, setError] = useState({
    nombre: '',
    mensaje: '',
  });

  const handleName = (e) => {
    const name = e.target.value;
    form.nombre = name;
    error.nombre = checkName(name);
  };

  const handleMsg = (e) => {
    const msg = e.target.value;
    form.mensaje = msg;
    error.mensaje = checkMaxLength(msg);
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

              <form>
                <div className="mb-3">
                  <label htmlFor="nombre" className="form-label fw-semibold">
                    Nombre completo
                  </label>
                  <input
                    type="text"
                    id="nombre"
                    value={nombre}
                    onChange={handleName}
                    className="form-control"
                    placeholder="Tu nombre"
                    required
                  />
                  {error.nombre && <p style={{ color: 'red' }}>{error.nombre}</p>}
                </div>

                <div className="mb-3">
                  <label htmlFor="correo" className="form-label fw-semibold">
                    Correo electrónico
                  </label>
                  <input
                    type="email"
                    id="correo"
                    className="form-control"
                    placeholder="ejemplo@correo.com"
                    required
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="asunto" className="form-label fw-semibold">
                    Asunto
                  </label>
                  <input
                    type="text"
                    id="asunto"
                    value={nombre}
                    onChange={handleName}
                    className="form-control"
                    placeholder="Motivo de tu mensaje"
                    required
                  />
                  {error.mensaje && <p style={{ color: 'red' }}>{error.mensaje}</p>}
                </div>

                <div className="mb-3">
                  <label htmlFor="mensaje" className="form-label fw-semibold">
                    Mensaje
                  </label>
                  <textarea
                    id="mensaje"
                    className="form-control"
                    rows="5"
                    placeholder="Escribe aquí tu mensaje..."
                    required
                  ></textarea>
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
