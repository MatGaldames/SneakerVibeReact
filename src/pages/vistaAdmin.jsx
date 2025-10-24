import React from "react";

export default function VistaAdmin() {
  return (
    <main className="flex-grow-1 bg-light min-vh-100 py-5">
      <div className="container">
        <div className="text-center mb-5">
          <h2 className="fw-bold text-dark neon-text">Agregar producto</h2>
          <p className="text-muted">
            Completa los campos para agregar un nuevo producto a SneakerVibe
          </p>
        </div>

        <div className="row justify-content-center">
          <div className="col-12 col-md-8 col-lg-6">
            <div className="card neon-card p-4 shadow-lg border-0 rounded-3">
              <form className="d-flex flex-column gap-3">
                {/* ID */}
                <div>
                  <label htmlFor="idProducto" className="form-label fw-semibold">
                    ID del producto
                  </label>
                  <input
                    type="text"
                    id="idProducto"
                    className="form-control neon-input"
                    placeholder="Ej: campus-black"
                  />
                </div>

                {/* Nombre */}
                <div>
                  <label htmlFor="nombre" className="form-label fw-semibold">
                    Nombre del producto
                  </label>
                  <input
                    type="text"
                    id="nombre"
                    className="form-control neon-input"
                    placeholder="Ej: Campus 00s Black"
                  />
                </div>

                {/* Precio */}
                <div>
                  <label htmlFor="precio" className="form-label fw-semibold">
                    Precio (CLP)
                  </label>
                  <input
                    type="number"
                    id="precio"
                    className="form-control neon-input"
                    placeholder="Ej: 109990"
                  />
                </div>

                {/* Descripción */}
                <div>
                  <label htmlFor="descripcion" className="form-label fw-semibold">
                    Descripción
                  </label>
                  <textarea
                    id="descripcion"
                    className="form-control neon-input"
                    rows="3"
                    placeholder="Describe el producto..."
                  ></textarea>
                </div>

                {/* Imagen */}
                <div>
                  <label htmlFor="imagen" className="form-label fw-semibold">
                    URL o ruta de imagen
                  </label>
                  <input
                    type="text"
                    id="imagen"
                    className="form-control neon-input"
                    placeholder="/assets/img/nombre-imagen.png"
                  />
                </div>

                {/* Botón */}
                <div className="text-center mt-4">
                  <button type="submit" className="btn btn-danger px-4 neon-btn">
                    Agregar producto
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
