import React, { useState } from "react";
import { validarRegistro } from "../assets/validaciones/registro";
import { registrarUsuarioComun } from "../utilidades/registro";         // <-- NUEVO
import { useNavigate, Link } from "react-router-dom";                    // <-- NUEVO
import { regionesYcomunas } from "../data/ubicaciones";                  // <-- NUEVO

export default function Registro({ bgUrl = "/assets/img/auth-bg.jpg" }) {
  const [form, setForm] = useState({ nombre: "", correo: "", password: "", confirmPassword: "" });
  const [errores, setErrores] = useState({});
  const [mensajeGeneral, setMensajeGeneral] = useState("");              // <-- NUEVO
  const navigate = useNavigate();                                        // <-- NUEVO

  const manejarCambio = (e) => {
    const { id, value } = e.target;
    setForm((prev) => ({ ...prev, [id]: value }));
    if (mensajeGeneral) setMensajeGeneral("");                           // <-- limpia msg general al tipear
  };

  const manejarEnfocar = () => {
    setErrores(validarRegistro(form));
  };

  const manejarEnviar = (e) => {
    e.preventDefault();
    const val = validarRegistro(form);
    setErrores(val);
    if (Object.keys(val).length === 0) {
      // Registrar (rol "comun", id auto user-XYZ) + auto-login
      const { ok, error } = registrarUsuarioComun({
        nombre: form.nombre,
        correo: form.correo,
        password: form.password,
        direccion: form.direccion,
        numeracion: form.numeracion,
        region: form.region,
        comuna: form.comuna
      }, { autoLogin: true });

      if (!ok) {
        setMensajeGeneral(error || "No se pudo completar el registro.");
        return;
      }

      // Ir a Home: Navbar ya debería saludar
      navigate("/", { replace: true });
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

                <div className="mb-3">
                  <label htmlFor="RegDireccion"
                    className={`form-label fw-semibold ${errores.direccion ? "is-invali" : ""}`}
                  >
                    Direccion
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="direccion"
                    placeholder="Tu direccion"
                    value={form.direccion}
                    onChange={manejarCambio}
                    onBlur={manejarEnfocar}
                  /> {errores.direccion &&
                    (<div className="invalid-feedback">{errores.direccion}
                    </div>)}
                </div>

                <div className="mb-3">
                  <label htmlFor="RegNumeracion"
                    className={`form-label fw-semibold ${errores.numeracion ? "is-invali" : ""}`}
                  >
                    Numero domicilio
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="numeracion"
                    placeholder="# 1234"
                    value={form.numeracion}
                    onChange={manejarCambio}
                    onBlur={manejarEnfocar}
                  /> {errores.numeracion &&
                    (<div className="invalid-feedback">{errores.numeracion}
                    </div>)}
                </div>

                <div className="mb-3">
                  <label htmlFor="region" className="form-label fw-semibold">
                    Región
                  </label>
                  <select
                    id="region"
                    className={`form-control ${errores.region ? "is-invalid" : ""}`}
                    value={form.region}
                    onChange={manejarCambio}
                    onBlur={manejarEnfocar}
                    required
                  >
                    <option value="">Selecciona una región</option>
                    {Object.keys(regionesYcomunas).map((region) => (
                      <option key={region} value={region}>
                        {region}
                      </option>
                    ))}
                  </select>
                  {errores.region && (
                    <div className="invalid-feedback">{errores.region}</div>
                  )}
                </div>

                <div className="mb-3">
                  <label htmlFor="comuna" className="form-label fw-semibold">
                    Comuna
                  </label>
                  <select
                    id="comuna"
                    className={`form-control ${errores.comuna ? "is-invalid" : ""}`}
                    value={form.comuna}
                    onChange={manejarCambio}
                    onBlur={manejarEnfocar}
                    disabled={!form.region} // Bloquea hasta elegir región
                    required
                  >
                    <option value="">
                      {form.region ? "Selecciona una comuna" : "Primero elige una región"}
                    </option>
                    {form.region &&
                      regionesYcomunas[form.region].map((comuna) => (
                        <option key={comuna} value={comuna}>
                          {comuna}
                        </option>
                      ))}
                  </select>
                  {errores.comuna && (
                    <div className="invalid-feedback">{errores.comuna}</div>
                  )}
                </div>




                <button type="submit" className="btn btn-danger w-100 mb-2">
                  Registrarme
                </button>

                {/* Mensaje general (duplicado de correo, etc.) */}
                {mensajeGeneral && (
                  <div className="text-danger small mb-3">{mensajeGeneral}</div>
                )}

                <div className="text-center">
                  <small>
                    ¿Ya tienes cuenta?{" "}
                    <Link to="/login" className="text-danger fw-semibold">
                      Inicia sesión
                    </Link>
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
