const EMAIL_REGEX = /^[A-Za-z0-9._%+-]+@(duoc\.cl|duoc\.profesor\.cl|gmail\.com)$/;

export function validarLogin({ correo, password }) {
  const errores = {};

  const correoNorm = (correo ?? "").trim();
  const passNorm = (password ?? "");

  if (!correoNorm) {
    errores.correo = "El correo es obligatorio.";
  } else if (!EMAIL_REGEX.test(correoNorm)) {
    errores.correo =
      "Formato inválido o dominio no permitido (usa @duoc.cl, @duoc.profesor.cl o @gmail.com).";
  }

  const len = passNorm.length;
  if (len === 0) {
    errores.password = "La contraseña es obligatoria.";
  } else if (/\s/.test(passNorm)) {
    errores.password = "La contraseña no debe contener espacios.";
  } else if (len < 5) {
    errores.password = "Debe tener al menos 5 caracteres.";
  } else if (len > 10) {
    errores.password = "Debe tener como máximo 10 caracteres.";
  }

  return errores;
}

export default validarLogin;