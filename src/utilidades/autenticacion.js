import usuarios from "../data/usuarios";

const CLAVE_SESION = "sv_usuario";

const CLAVE_USUARIOS_EXTRA = "sv_usuarios_extra";

function leerUsuariosExtra() {
  const crudo = localStorage.getItem(CLAVE_USUARIOS_EXTRA);
  if (!crudo) return [];
  try {
    const arr = JSON.parse(crudo);
    return Array.isArray(arr) ? arr : [];
  } catch {
    return [];
  }
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

  guardaSesion(usuario);
  return { ok: true, usuario: leeSesion() };
}
