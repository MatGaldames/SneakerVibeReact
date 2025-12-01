import React, { useEffect, useState } from "react";
import DashboardSidebar from "../componentes/Dashboard";
import { getUsuarios } from "../services/usuarioService";
import {
  loadDeletedUsers,
  markUserDeleted,
  unmarkUserDeleted,
} from "../utilidades/deletedUsersSession";

export default function AdminUsuarios() {
  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deletedSet, setDeletedSet] = useState(new Set());

  const cargarUsuarios = async () => {
    setLoading(true);
    const data = await getUsuarios();
    setUsuarios(data);
    setLoading(false);
  };

  useEffect(() => {
    cargarUsuarios();

    // Cargar eliminados iniciales
    setDeletedSet(loadDeletedUsers());

    // Escuchar cambios
    const handleChange = () => setDeletedSet(loadDeletedUsers());
    window.addEventListener("sv_deleted_users_change", handleChange);
    window.addEventListener("storage", (e) => {
      if (e.key === "sv:admin:deletedUsers") handleChange();
    });

    return () => {
      window.removeEventListener("sv_deleted_users_change", handleChange);
      window.removeEventListener("storage", handleChange);
    };
  }, []);

  const toggleDelete = (id) => {
    if (deletedSet.has(id)) {
      unmarkUserDeleted(id);
    } else {
      markUserDeleted(id);
    }
  };

  const active = "usuarios";

  return (
    <main className="min-vh-100 bg-light d-flex flex-column flex-md-row">
      <DashboardSidebar active={active} />

      <section className="flex-grow-1 p-4">
        <div className="container-fluid">
          <div className="d-flex align-items-center justify-content-between mb-4">
            <h3 className="fw-bold">Usuarios</h3>
            <span className="badge rounded-pill text-bg-danger">Admin</span>
          </div>

          {loading ? (
            <div className="text-center py-5">Cargando usuarios...</div>
          ) : usuarios.length === 0 ? (
            <div className="alert alert-light border text-center">
              No hay usuarios registrados.
            </div>
          ) : (
            <ul className="list-unstyled m-0">
              {usuarios.map((u) => {
                const nombre = u.nombre || "Sin nombre";
                const apellido = u.apellido || "";
                const correo = u.email || u.correo || "sin-correo@ejemplo.cl";
                const rol = u.esAdmin ? "Admin" : "Cliente";

                const isDeleted = deletedSet.has(u.id);

                return (
                  <li key={u.id} className="mb-2">
                    <article
                      className="card neon-card border-0"
                      style={{
                        opacity: isDeleted ? 0.5 : 1,
                        transition: "opacity 0.3s ease",
                      }}
                    >
                      <div className="card-body py-3">
                        <div className="row align-items-center g-3">
                          {/* Ícono usuario */}
                          <div className="col-auto">
                            <div
                              className="d-flex align-items-center justify-content-center rounded"
                              style={{
                                width: 56,
                                height: 56,
                                background: "#f3f4f6",
                              }}
                              aria-hidden="true"
                            >
                              <i className="bi bi-person-circle fs-2 text-danger" />
                            </div>
                          </div>

                          {/* Nombre + correo */}
                          <div className="col">
                            <div className="d-flex align-items-center gap-2">
                              <div className="fw-semibold">
                                {nombre} {apellido}
                              </div>
                              {isDeleted && (
                                <span className="badge bg-danger">
                                  Eliminado
                                </span>
                              )}
                            </div>
                            <small className="text-muted">{correo}</small>
                          </div>

                          {/* Rol (alineado a la derecha, ancho fijo) */}
                          <div className="col-auto d-none d-sm-block">
                            <div
                              className="text-end text-nowrap"
                              style={{ width: 140 }}
                            >
                              <span
                                className={`badge ${
                                  rol === "Admin" ? "bg-danger" : "bg-secondary"
                                }`}
                              >
                                {rol}
                              </span>
                            </div>
                          </div>

                          {/* Acción */}
                          <div className="col-auto">
                            <button
                              className={`btn btn-sm ${
                                isDeleted
                                  ? "btn-outline-success"
                                  : "btn-outline-danger"
                              }`}
                              onClick={() => toggleDelete(u.id)}
                            >
                              <i
                                className={`bi ${
                                  isDeleted
                                    ? "bi-arrow-counterclockwise"
                                    : "bi-trash"
                                } me-1`}
                              />
                              {isDeleted ? "Restaurar" : "Eliminar"}
                            </button>
                          </div>

                          {/* Rol en móvil */}
                          <div className="col-12 d-sm-none">
                            <div className="text-end">
                              <span
                                className={`badge ${
                                  rol === "Admin" ? "bg-danger" : "bg-secondary"
                                }`}
                              >
                                {rol}
                              </span>
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
