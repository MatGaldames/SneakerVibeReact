const EMAIL_REGEX = /^[A-Za-z0-9._%+-]+@(duoc\.cl|duoc\.profesor\.cl|gmail\.com)$/;

export function validarContacto({ nombre, correo, asunto, mensaje }) {
    const errores = {};

    const nombreNorm = (nombre ?? "").trim();
    const correoNorm = (correo ?? "").trim();
    const asuntoNorm = (asunto ?? "").trim();
    const mensajeNorm = (mensaje ?? "").trim();

    if (!nombreNorm) {
        errores.nombre = "El nombre es obligatorio.";
    } else if (nombreNorm.length < 3) {
        errores.nombre = "Debe tener al menos 3 caracteres.";
    } else if (nombreNorm.length > 30) {
        errores.nombre = "Debe tener como máximo 30 caracteres.";
    } else if (!/^[\p{L}\s]+$/u.test(nombreNorm)) {
        errores.nombre = "Solo puede contener letras y espacios.";
    }

    if (!correoNorm) {
        errores.correo = "El correo es obligatorio.";
    } else if (!EMAIL_REGEX.test(correoNorm)) {
        errores.correo =
            "Formato inválido o dominio no permitido (usa @duoc.cl, @duoc.profesor.cl o @gmail.com).";
    }

    const largoAsunto = asuntoNorm.length;
    if (!asuntoNorm) {
        errores.asunto = "El asunto es obligatorio.";
    } else if (largoAsunto < 5) {
        errores.asunto = "Debe tener al menos 5 caracteres.";
    } else if (largoAsunto > 40) {
        errores.asunto = "Debe tener como máximo 40 caracteres.";
    }

    if (!mensajeNorm) {
        errores.mensaje = "El mensaje es obligatorio.";
    } else if (mensajeNorm.length < 10) {
        errores.mensaje = "Debe tener al menos 10 caracteres.";
    } else if (mensajeNorm.length > 300) {
        errores.mensaje = "Debe tener como máximo 300 caracteres.";
    }

    return errores;
}

export default validarContacto;