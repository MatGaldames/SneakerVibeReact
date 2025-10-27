// src/utilidades/registro.js
// Registro de usuarios "comun" con ID autoincremental user-XYZ (3 dígitos).

import usuariosSeed from "../data/usuarios";
import { guardaSesion } from "./autenticacion";

const CLAVE_USUARIOS_EXTRA = "sv_usuarios_extra";

// --- utilidades de almacenamiento ---
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

function guardarUsuariosExtra(arr) {
  localStorage.setItem(CLAVE_USUARIOS_EXTRA, JSON.stringify(arr || []));
}

// --- helpers de negocio ---
function normalizarCorreo(correo = "") {
  return String(correo).trim().toLowerCase();
}

function numeroDeUserId(id = "") {
  const m = String(id).match(/^user-(\d{3})$/i);
  return m ? parseInt(m[1], 10) : 0;
}

function generarSiguienteUserId() {
  const extra = leerUsuariosExtra();
  const todosUser = [
    ...usuariosSeed.filter(u => /^user-\d{3}$/i.test(u.id)),
    ...extra.filter(u => /^user-\d{3}$/i.test(u.id)),
  ];
  const maxNum = todosUser.reduce((acc, u) => {
    const n = numeroDeUserId(u.id);
    return n > acc ? n : acc;
  }, 0);
  const siguiente = String(maxNum + 1).padStart(3, "0"); // 001, 002, ...
  return `user-${siguiente}`;
}

function correoExiste(correo) {
  const c = normalizarCorreo(correo);
  if (usuariosSeed.some(u => normalizarCorreo(u.correo) === c)) return true;
  return leerUsuariosExtra().some(u => normalizarCorreo(u.correo) === c);
}

// --- API principal ---
export function registrarUsuarioComun({ nombre, apellido, correo, password, direccion, numeracion, region, comuna }, { autoLogin = true } = {}) {
  if (!nombre ||!apellido || !correo || !password || !direccion || !numeracion || !region || !comuna) {
    return { ok: false, error: "Faltan datos obligatorios." };
  }
  if (correoExiste(correo)) {
    return { ok: false, error: "Ya existe una cuenta registrada con ese correo." };
  }

  const nuevoUsuario = {
    id: generarSiguienteUserId(),
    nombre: String(nombre).trim(),
    apellido: String(apellido).trim(),
    correo: normalizarCorreo(correo),
    password: String(password),  // demo: en prod se debe hashear
    rol: "comun",
    direccion: String(direccion).trim(),
    numeracion: String(numeracion).trim(),
    region: String(region).trim(),
    comuna: String(comuna).trim(),
  };

  const extra = leerUsuariosExtra();
  extra.push(nuevoUsuario);
  guardarUsuariosExtra(extra);

  if (autoLogin) {
    guardaSesion(nuevoUsuario); // guarda en sesión (sin password en storage)
  }

  const { password: _omit, ...seguro } = nuevoUsuario;
  return { ok: true, usuario: seguro };
}
