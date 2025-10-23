import usuarios from "../data/usuarios";

const CLAVE_SESION = "sv_usuario";

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

  const usuario = usuarios.find(
    (u) => u.correo.toLowerCase() === correoNorm && u.password === pass
  );

  if (!usuario) {
    return { ok: false, error: "Credenciales inválidas." };
  }

  guardaSesion(usuario);
  return { ok: true, usuario: leeSesion() };
}