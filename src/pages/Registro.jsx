import React, { useState } from "react";
import { validarRegistro } from "../assets/validaciones/registro";

export default function Registro({ bgUrl = "/assets/img/auth-bg.jpg" }) {
  const [form, setForm] = useState({ nombre: "", correo: "", password: "", confirmPassword: "" });
  const [errores, setErrores] = useState({});

  const manejarCambio = (e) => {
    const { id, value } = e.target;
    setForm((prev) => ({ ...prev, [id]: value }));
  };
  const manejarEnfocar = () => {
    setErrores(validarRegistro(form));
  };
  const manejarEnviar = (e) => {
    e.preventDefault();
    const val = validarRegistro(form);
    setErrores(val);
    if (Object.keys(val).length === 0) {
    }
  };

  return (
    <main
      className="auth-hero d-flex align-items-center justify-content-center"
      style={{
        minHeight: "100vh",
        backgroundImage: `url('${bgUrl}')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        position: "relative",
      }}
    >
      <div className="container position-relative">
        <div className="row justify-content-center">
          <div className="col-12 col-sm-10 col-md-8 col-lg-5">
            <div className="card shadow-lg p-4 border-0 rounded-4">
              <h3 className="text-center mb-4 text-danger">Crear Cuenta</h3>

              <form onSubmit={manejarEnviar} noValidate>
                <div className="mb-3">
                  <label htmlFor="RegNombre" className="form-label fw-semibold">
                    Nombre completo
                  </label>
                  <input
                    type="text"
                    className={`form-control ${errores.nombre ? "is-invalid" : ""}`}
                    id="nombre"
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
                  <label htmlFor="RegCorreo" className="form-label fw-semibold">
                    Correo electrónico
                  </label>
                  <input
                    type="email"
                    className={`form-control ${errores.correo ? "is-invalid" : ""}`}
                    id="correo"
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
                  <label htmlFor="RegPassword" className="form-label fw-semibold">
                    Contraseña
                  </label>
                  <input
                    type="password"
                    className={`form-control ${errores.password ? "is-invalid" : ""}`}
                    id="password"
                    placeholder="********"
                    value={form.password}
                    onChange={manejarCambio}
                    onBlur={manejarEnfocar}
                    required
                  />
                  {errores.password && (
                    <div className="invalid-feedback">{errores.password}</div>
                  )}
                </div>

                <div className="mb-3">
                  <label
                    htmlFor="RegConfirmPassword"
                    className={`form-label fw-semibold ${errores.confirmPassword ? "is-invalid" : ""}`}
                  >
                    Confirmar contraseña
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    id="confirmPassword"
                    placeholder="********"
                    required
                    value={form.confirmPassword}
                    onChange={manejarCambio}
                    onBlur={manejarEnfocar}
                  />
                  {errores.confirmPassword && (
                    <div className="invalid-feedback">{errores.confirmPassword}</div>
                  )}
                </div>

                <button type="submit" className="btn btn-danger w-100 mb-3">
                  Registrarme
                </button>

                <div className="text-center">
                  <small>
                    ¿Ya tienes cuenta?{" "}
                    <a href="/login" className="text-danger fw-semibold">
                      Inicia sesión
                    </a>
                  </small>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
