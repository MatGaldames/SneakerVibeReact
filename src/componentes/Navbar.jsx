import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { leeSesion, borraSesion } from "../utilidades/autenticacion";

function obtenerPrimerNombre(nombre = "") {
  const partes = String(nombre).trim().split(/\s+/);
  return partes[0] || "Usuario";
}

export default function Navbar() {
  const navigate = useNavigate();
  const [usuario, setUsuario] = useState(() => leeSesion());

  useEffect(() => {
  const onStorage = (e) => {
    if (e.key === "sv_usuario") setUsuario(leeSesion());
  };
  const onSesionCambio = () => setUsuario(leeSesion());

  window.addEventListener("storage", onStorage);
  window.addEventListener("sv_sesion_cambio", onSesionCambio);
  return () => {
    window.removeEventListener("storage", onStorage);
    window.removeEventListener("sv_sesion_cambio", onSesionCambio);
  };
}, []);

  const manejarCerrarSesion = () => {
    borraSesion();
    setUsuario(null);
    navigate("/", { replace: true });
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light px-4">
      <Link className="navbar-brand d-flex align-items-center" to="/">
        <img src="/assets/img/logo-nav.png" alt="SneakerVibe" style={{ height: 45 }} />
      </Link>

      <button
        className="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse justify-content-between" id="navbarNav">
        <ul className="navbar-nav">
          <li className="nav-item mx-2"><Link className="nav-link" to="/">Inicio</Link></li>
          <li className="nav-item mx-2"><Link className="nav-link" to="/productos">Productos</Link></li>
          <li className="nav-item mx-2"><Link className="nav-link" to="/blog">Blog</Link></li>
          <li className="nav-item mx-2"><Link className="nav-link" to="/contacto">Contacto</Link></li>
          <li className="nav-item mx-2"><Link className="nav-link" to="/carrito">Carrito</Link></li>
        </ul>

        <div className="d-flex align-items-center">
          {usuario ? (
            <>
              <span className="me-3">
                Hola, <strong>{obtenerPrimerNombre(usuario.nombre)}</strong>
              </span>
              <button type="button" className="btn btn-danger" onClick={manejarCerrarSesion}>
                Cerrar sesión
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="btn btn-danger me-2">Inicio de Sesión</Link>
              <Link to="/registro" className="btn btn-secondary">Registro</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}