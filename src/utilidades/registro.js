// src/utilidades/registro.js
// Registro de usuarios "comun" usando la API real (sin arrays locales).

import { guardaSesion } from "./autenticacion";

const API_URL = "http://52.0.14.78:8080/api/usuarios";

export async function registrarUsuarioComun(datos, opciones = {}) {
  const { autoLogin = true } = opciones;

  const {
    nombre,
    apellido,
    correo,
    password,
    direccion,
    numeracion,
    region,
    comuna,
  } = datos;

  const payload = {
    nombre: String(nombre || "").trim(),
    apellido: String(apellido || "").trim(),
    email: String(correo || "").trim().toLowerCase(),
    contrasena: String(password || ""),
    direccion: String(direccion || "").trim(),
    numDomicilio: String(numeracion || "").trim(),
    region: String(region || "").trim(),
    comuna: String(comuna || "").trim(),
    esAdmin: false, // registro desde la web = usuario cliente
  };

  if (!payload.email || !payload.contrasena || !payload.nombre) {
    return {
      ok: false,
      error: "Faltan datos obligatorios para el registro.",
    };
  }

  try {
    const res = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      let msg = "No se pudo completar el registro.";
      try {
        const body = await res.json();
        if (body && body.message) msg = body.message;
      } catch {
        // si no viene JSON, dejamos el genérico
      }
      return { ok: false, error: msg };
    }

    const usuarioCreado = await res.json();

    if (autoLogin) {
      guardaSesion(usuarioCreado);
    }

    const { contrasena, password: _p, ...seguro } = usuarioCreado;
    return { ok: true, usuario: seguro };
  } catch (e) {
    console.error("Error registrando usuario en API:", e);
    return {
      ok: false,
      error: "Error de conexión con el servidor.",
    };
  }
}
