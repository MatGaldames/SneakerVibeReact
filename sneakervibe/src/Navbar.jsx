// src/components/Navbar.jsx
import React from "react";

export default function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <a className="navbar-brand" href="/">
        <img
          src="/assets/img/logo-nav.png"
          alt="SneakerVibe"
          width="120"
          height="40"
        />
      </a>

      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav ml-auto">
          <li className="nav-item">
            <a className="nav-link" href="/index.html">Inicio</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="/productos.html">Productos</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="/blog.html">Blog</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="/contacto.html">Contacto</a>
          </li>
        </ul>
      </div>
    </nav>
  );
}
