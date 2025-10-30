import React, { useState } from "react";
import DashboardSidebar from "../componentes/Dashboard";
import usuariosSeed from "../data/usuarios"; // <-- AJUSTA si tu archivo se llama distinto
import { loadDeletedUsers, markUserDeleted, getStableUserId } from "../utilidades/deletedUsersSession";

export default function AdminUsuarios() {
  const [usuarios, setUsuarios] = useState(() => {
    const deleted = loadDeletedUsers();
    return (usuariosSeed || [])
      .map((u, i) => ({ ...u, __sid: getStableUserId(u, i) }))
      .filter((u) => !deleted.has(u.__sid));
  });

  const eliminar = (sid) => {
    setUsuarios((prev) => prev.filter((u) => u.__sid !== sid));
    markUserDeleted(sid);
  };

  const active = "usuarios"; // para resaltar en el sidebar si lo usas

  return (
    <main className="min-vh-100 bg-light d-flex flex-column flex-md-row">
      {/* Sidebar escritorio */}
      <DashboardSidebar active={active} />

      {/* Contenido */}
      <section className="flex-grow-1 p-4">
        <div className="container-fluid">
          <div className="d-flex align-items-center justify-content-between mb-4">
            <h3 className="fw-bold">Usuarios</h3>
            <span className="badge rounded-pill text-bg-danger">Admin</span>
          </div>

          {usuarios.length === 0 ? (
            <div className="alert alert-light border text-center">No hay usuarios.</div>
          ) : (
            <ul className="list-unstyled m-0">
              {usuarios.map((u) => {
                const nombre = u.nombre ?? u.name ?? "Sin nombre";
                const correo = u.correo ?? u.email ?? "sin-correo@ejemplo.cl";
                const rol = u.rol ?? u.role ?? "Cliente";

                return (
                  <li key={u.__sid} className="mb-2">
                    <article className="card neon-card border-0">
                      <div className="card-body py-3">
                        <div className="row align-items-center g-3">
                          {/* Ícono usuario (en lugar de imagen) */}
                          <div className="col-auto">
                            <div
                              className="d-flex align-items-center justify-content-center rounded"
                              style={{ width: 56, height: 56, background: "#f3f4f6" }}
                              aria-hidden="true"
                            >
                              <i className="bi bi-person-circle fs-2 text-danger" />
                            </div>
                          </div>

                          {/* Nombre + correo */}
                          <div className="col">
                            <div className="fw-semibold">{nombre}</div>
                            <small className="text-muted">{correo}</small>
                          </div>

                          {/* Rol (alineado a la derecha, ancho fijo) */}
                          <div className="col-auto d-none d-sm-block">
                            <div className="text-end text-nowrap" style={{ width: 140 }}>
                              <span className="badge text-bg-light border">{rol}</span>
                            </div>
                          </div>

                          {/* Acción */}
                          <div className="col-auto">
                            <button
                              className="btn btn-outline-danger btn-sm"
                              onClick={() => eliminar(u.__sid)}
                            >
                              <i className="bi bi-trash me-1" />
                              Eliminar
                            </button>
                          </div>

                          {/* Rol en móvil (segunda línea) */}
                          <div className="col-12 d-sm-none">
                            <div className="text-end">
                              <span className="badge text-bg-light border">{rol}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </article>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </section>
    </main>
  );
}
