// src/utilidades/autenticacion.js
// Autenticación contra la API real de usuarios (sin arrays ni "semillas" locales).

const API_URL = "http://18.232.140.10:8080/api/usuarios";

const CLAVE_SESION = "sv_usuario";

// -------------------------
// Sesión en localStorage
// -------------------------
export function leeSesion() {
  try {
    const raw = localStorage.getItem(CLAVE_SESION);
    if (!raw) return null;
    const obj = JSON.parse(raw);
    return obj && typeof obj === "object" ? obj : null;
  } catch {
    return null;
  }
}

export function guardaSesion(usuario) {
  if (!usuario) {
    borraSesion();
    return;
  }

  const seguro = { ...usuario };
  // Nunca guardamos la contraseña en storage
  if ("contrasena" in seguro) delete seguro.contrasena;
  if ("password" in seguro) delete seguro.password;

  localStorage.setItem(CLAVE_SESION, JSON.stringify(seguro));

  // Notificar a otros componentes (Navbar) vía evento de storage
  try {
    window.dispatchEvent(
      new StorageEvent("storage", {
        key: CLAVE_SESION,
        newValue: JSON.stringify(seguro),
      })
    );
  } catch {
    // Algunos navegadores no permiten construir StorageEvent a mano, no pasa nada.
  }
}

export function borraSesion() {
  localStorage.removeItem(CLAVE_SESION);
  try {
    window.dispatchEvent(
      new StorageEvent("storage", { key: CLAVE_SESION, newValue: null })
    );
  } catch { }
}

// -------------------------
// Login contra la API
// -------------------------
export async function autenticarConApi({ correo, password }) {
  const email = String(correo || "").trim().toLowerCase();
  const pass = String(password || "");

  if (!email || !pass) {
    return { ok: false, error: "Debes ingresar correo y contraseña." };
  }

  try {
    const res = await fetch(API_URL);
    if (!res.ok) {
      return {
        ok: false,
        error: "Error al conectar con el servidor. Intenta más tarde.",
      };
    }

    const data = await res.json();
    const lista = Array.isArray(data) ? data : [];

    const usuario = lista.find((u) => {
      const uMail = String(u.email || "").trim().toLowerCase();
      const uPass = String(u.contrasena || u.password || "");
      return uMail === email && uPass === pass;
    });

    if (!usuario) {
      return { ok: false, error: "Correo y/o contraseña inválidos." };
    }

    guardaSesion(usuario);
    return { ok: true, usuario: leeSesion() };
  } catch (e) {
    console.error("Error autenticando contra API:", e);
    return {
      ok: false,
      error: "No se pudo conectar con el servidor.",
    };
  }
}
