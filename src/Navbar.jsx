import React from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light px-4">
      {/* Logo */}
      <Link className="navbar-brand d-flex align-items-center" to="/">
        <img src="/assets/img/logo-nav.png" alt="SneakerVibe" style={{ height: 45 }} />
      </Link>

      {/* Botón hamburguesa */}
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

      {/* Menú */}
      <div className="collapse navbar-collapse justify-content-between" id="navbarNav">
        <ul className="navbar-nav">
          <li className="nav-item mx-2"><Link className="nav-link" to="/">Inicio</Link></li>
          <li className="nav-item mx-2"><Link className="nav-link" to="/productos">Productos</Link></li>
          <li className="nav-item mx-2"><Link className="nav-link" to="/blog">Blog</Link></li>
          <li className="nav-item mx-2"><Link className="nav-link" to="/contacto">Contacto</Link></li>
          <li className="nav-item mx-2"><Link className="nav-link" to="/carrito">Carrito</Link></li>
        </ul>

        <div className="d-flex align-items-center">
          <Link to="/login" className="btn btn-danger me-2">Inicio de Sesión</Link>
          <Link to="/registro" className="btn btn-secondary">Registro</Link>

        </div>
      </div>
    </nav>
  );
}

