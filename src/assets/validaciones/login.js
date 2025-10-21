// src/utils/validacionesLogin.js

// Acepta sólo estos dominios exactos:
//  - @duoc.cl
//  - @duoc.profesor.cl
//  - @gmail.com
const EMAIL_REGEX = /^[A-Za-z0-9._%+-]+@(duoc\.cl|duoc\.profesor\.cl|gmail\.com)$/;

export function validarLogin({ correo, password }) {
  const errores = {};

  // Correo
  if (!correo || !correo.trim()) {
    errores.correo = "El correo es obligatorio.";
  } else if (!EMAIL_REGEX.test(correo.trim())) {
    errores.correo =
      "Sólo se permiten correos @duoc.cl, @duoc.profesor.cl o @gmail.com.";
  }

  // Password: 5 a 10
  const len = (password || "").length;
  if (!len) {
    errores.password = "La contraseña es obligatoria.";
  } else if (len < 5) {
    errores.password = "Debe tener al menos 5 caracteres.";
  } else if (len > 10) {
    errores.password = "Debe tener como máximo 10 caracteres.";
  }

  return errores;
}

// Export default opcional por si prefieres import por defecto
export default validarLogin;
