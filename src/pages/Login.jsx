import React, { useState } from "react";
import { validarLogin } from "../assets/validaciones/login";
import { autenticarConArray } from "../utilidades/autenticacion";
import { Link, useNavigate } from "react-router-dom";




export default function Login({ bgUrl = "/assets/img/auth-bg.jpg" }) {
  const [form, setForm] = useState({ correo: "", password: "" });
  const [errores, setErrores] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { id, value } = e.target;
    setForm((s) => ({ ...s, [id]: value }));

    if (errores.general) {
      setErrores((prev) => {
        const { general, ...resto } = prev;
        return resto;
      });
    }
  };

  const handleBlur = () => {
    setErrores(validarLogin(form));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // 1) Validación del formulario
    const errs = validarLogin(form);
    setErrores(errs);
    if (Object.keys(errs).length > 0) return;

    // 2) Autenticación centralizada (ya filtra eliminados por sesión)
    const res = autenticarConArray({ correo: form.correo, password: form.password });

    if (!res.ok) {
      setErrores({ general: res.error || "Correo y/o contraseña inválidos." });
      return;
    }

    // 3) Éxito → redirige (ajusta la ruta si quieres otra)
    const rol = res.usuario?.rol ?? res.usuario?.role ?? "cliente";
    navigate(rol === "admin" ? "/admin/dashboard" : "/");
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
              <h3 className="text-center mb-4 text-danger">Inicio de Sesión</h3>

              <form onSubmit={handleSubmit} noValidate>
                <div className="mb-3">
                  <label htmlFor="correo" className="form-label fw-semibold">
                    Correo electrónico
                  </label>
                  <input
                    type="email"
                    className={`form-control ${errores.correo ? "is-invalid" : ""}`}
                    id="correo"
                    placeholder="tu.correo@duoc.cl"
                    value={form.correo}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {errores.correo && (
                    <div className="invalid-feedback">{errores.correo}</div>
                  )}
                </div>

                <div className="mb-3">
                  <label htmlFor="password" className="form-label fw-semibold">
                    Contraseña
                  </label>
                  <input
                    type="password"
                    className={`form-control ${errores.password ? "is-invalid" : ""}`}
                    id="password"
                    placeholder="5 a 10 caracteres"
                    value={form.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {errores.password && (
                    <div className="invalid-feedback">{errores.password}</div>
                  )}
                </div>

                <div className="d-flex justify-content-between align-items-center mb-3">
                  <div className="form-check">
                    <input className="form-check-input" type="checkbox" id="remember" />
                    <label className="form-check-label" htmlFor="remember">
                      Recuérdame
                    </label>
                  </div>
                  <a href="#" className="small text-decoration-none">
                    ¿Olvidaste tu contraseña?
                  </a>
                </div>

                <button type="submit" className="btn btn-danger w-100 mb-3">
                  Iniciar sesión
                </button>
                {errores.general && (
                  <div className="text-danger small mb-3">{errores.general}</div>
                )}

                <div className="text-center">
                  <small>
                    ¿No tienes cuenta?{" "}
                    <a href="/registro" className="text-danger fw-semibold">
                      Regístrate aquí
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
