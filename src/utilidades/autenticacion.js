import usuarios from "../data/usuarios";
import { loadDeletedUsers, getStableUserId } from "./deletedUsersSession";

const CLAVE_SESION = "sv_usuario";
const CLAVE_USUARIOS_EXTRA = "sv_usuarios_extra";

function leerUsuariosExtra() {
  // Clave actual
  const actual = localStorage.getItem(CLAVE_USUARIOS_EXTRA);
  // Clave legacy (por si se usó antes)
  const legacy = localStorage.getItem("usuarios");

  const parse = (txt) => {
    if (!txt) return [];
    try {
      const arr = JSON.parse(txt);
      return Array.isArray(arr) ? arr : [];
    } catch {
      return [];
    }
  };

  // Merge de ambos, evitando duplicados por correo
  const a = parse(actual);
  const b = parse(legacy);
  const byMail = (u) => String(u?.correo || u?.email || "").toLowerCase();
  const map = new Map();

  [...a, ...b].forEach((u) => {
    const k = byMail(u);
    if (k) map.set(k, u);
  });

  return [...map.values()];
}


function notificarCambioSesion() {
  window.dispatchEvent(new Event("sv_sesion_cambio"));
}

export function guardaSesion(usuario) {
  if (!usuario) return;
  const { password, ...seguro } = usuario;
  localStorage.setItem(CLAVE_SESION, JSON.stringify(seguro));
  notificarCambioSesion();
}

export function leeSesion() {
  const crudo = localStorage.getItem(CLAVE_SESION);
  if (!crudo) return null;
  try {
    return JSON.parse(crudo);
  } catch {
    return null;
  }
}

export function borraSesion() {
  localStorage.removeItem(CLAVE_SESION);
  notificarCambioSesion();
}

export function autenticarConArray({ correo, password }) {
  const correoNorm = String(correo || "").trim().toLowerCase();
  const pass = String(password || "");

  // incluir usuarios registrados en LocalStorage
  const usuariosExtra = leerUsuariosExtra();
  const todos = [...usuarios, ...usuariosExtra];

  const usuario = todos.find(
    (u) => String(u.correo).toLowerCase() === correoNorm && String(u.password) === pass
  );

  if (!usuario) {
    return { ok: false, error: "Credenciales inválidas." };
  }

  // usuario encontrado por credenciales
  // Bloqueo por eliminación en la sesión de admin
  const deleted = loadDeletedUsers();
  if (deleted.has(getStableUserId(usuario))) {
    return {
      ok: false,
      error:
        "Tu cuenta fue deshabilitada temporalmente.",
    };
  }

  // OK
  guardaSesion(usuario);
  return { ok: true, usuario: leeSesion() };
}
