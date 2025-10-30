import React, { useEffect, useState } from "react";
import DashboardSidebar from "../componentes/Dashboard";
import usuariosSeed from "../data/usuarios";
import {
  loadDeletedUsers,
  markUserDeleted,
  unmarkUserDeleted,
  getStableUserId,
} from "../utilidades/deletedUsersSession";

/* Lee usuarios registrados en localStorage (clave actual y legacy) y deduplica por correo */
const leerUsuariosExtraLocal = () => {
  const parse = (txt) => {
    try {
      const arr = JSON.parse(txt || "[]");
      return Array.isArray(arr) ? arr : [];
    } catch {
      return [];
    }
  };
  const actuales = parse(localStorage.getItem("sv_usuarios_extra")); // clave usada por registrarUsuarioComun
  const legacy = parse(localStorage.getItem("usuarios"));            // por si existe histórico

  const key = (u) => String(u?.correo ?? u?.email ?? "").toLowerCase();
  const map = new Map();
  [...actuales, ...legacy].forEach((u) => {
    const k = key(u);
    if (k) map.set(k, u);
  });
  return [...map.values()];
};

/* Construye el listado: seed + extras, SIN filtrar; marcamos __deleted */
const construirListado = () => {
  const deleted = loadDeletedUsers();
  const extras = leerUsuariosExtraLocal();
  const todos = [...(usuariosSeed || []), ...extras];

  return todos.map((u, i) => {
    const sid = getStableUserId(u, i);
    return { ...u, __sid: sid, __deleted: deleted.has(sid) };
  });
};

export default function AdminUsuarios() {
  const [usuarios, setUsuarios] = useState(() => construirListado());

  // Refrescar si cambian los usuarios en localStorage (registro nuevo) o si otras pestañas cambian datos
  useEffect(() => {
    const onStorage = (e) => {
      if (e.key === "sv_usuarios_extra" || e.key === "usuarios") {
        setUsuarios(construirListado());
      }
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  // Deshabilitar (soft-delete) y Habilitar (undo)
  const eliminar = (sid) => {
    markUserDeleted(sid);         // persiste el bloqueo en sessionStorage
    setUsuarios(construirListado());
  };
  const habilitar = (sid) => {
    unmarkUserDeleted(sid);       // quita del set de eliminados
    setUsuarios(construirListado());
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

          {usuarios.length === 0 ? (
            <div className="alert alert-light border text-center">
              No hay usuarios.
            </div>
          ) : (
            <ul className="list-unstyled m-0">
              {usuarios.map((u) => {
                const nombre = u.nombre ?? u.name ?? "Sin nombre";
                const correo = u.correo ?? u.email ?? "sin-correo@ejemplo.cl";
                const rol = u.rol ?? u.role ?? "Cliente";
                const isDeleted = !!u.__deleted;

                return (
                  <li key={u.__sid} className="mb-2">
                    <article
                      className={`card neon-card border-0 ${isDeleted ? "opacity-50" : ""}`}
                      title={isDeleted ? "Usuario deshabilitado" : undefined}
                    >
                      <div className="card-body py-3">
                        <div className="row align-items-center g-3">
                          {/* Ícono usuario */}
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
                            <div className="d-flex align-items-center gap-2">
                              <div className="fw-semibold">{nombre}</div>
                              {isDeleted && (
                                <span className="badge text-bg-secondary">Deshabilitado</span>
                              )}
                            </div>
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
                            {isDeleted ? (
                              <button
                                className="btn btn-outline-success btn-sm"
                                onClick={() => habilitar(u.__sid)}
                              >
                                <i className="bi bi-arrow-counterclockwise me-1" />
                                Habilitar
                              </button>
                            ) : (
                              <button
                                className="btn btn-outline-danger btn-sm"
                                onClick={() => eliminar(u.__sid)}
                              >
                                <i className="bi bi-trash me-1" />
                                Eliminar
                              </button>
                            )}
                          </div>

                          {/* Rol en móvil */}
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
