import React from "react";

export default function Footer() {
  return (
    <footer className="bg-light py-3 mt-auto">
      <div className="container-fluid px-3 px-md-4">
        <div className="d-flex flex-column flex-md-row align-items-start align-items-md-center justify-content-between">
          
          {/* Información de contacto */}
          <div className="d-flex flex-column">
            <small className="mb-1">© 2025 SneakerVibe</small>
            <small className="mb-1">
              <span role="img" aria-label="email">📧</span>{" "}
              Contacto:{" "}
              <a href="mailto:SneakerVibe@gmail.com">SneakerVibe@gmail.com</a>
            </small>
            <small className="mb-0">
              <span role="img" aria-label="instagram">📷</span>{" "}
              Instagram: @SneakerVibe
            </small>
          </div>

          {/* Formulario de suscripción */}
          <form className="form-inline mt-3 mt-md-0">
            <input
              type="email"
              className="form-control mr-2"
              placeholder="Correo"
            />
            <button type="button" className="btn btn-danger">
              Suscribirse
            </button>
          </form>

        </div>
      </div>
    </footer>
  );
}
