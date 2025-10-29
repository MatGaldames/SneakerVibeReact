const EMAIL_REGEX = /^[A-Za-z0-9._%+-]+@(duoc\.cl|duoc\.profesor\.cl|gmail\.com)$/;

export function validarRegistro({ nombre, correo, password, confirmPassword, confirmCalle }) {
    const errores = {};

    const nombreNorm = (nombre ?? "").trim();
    const correoNorm = (correo ?? "").trim();
    const passNorm = (password ?? "");
    const confirmNorm = (confirmPassword ?? "");
    const confiCalle = (confirmCalle ?? "");

    if (!confiCalle){
        errores.confirmCalle = "La calle es obligatoria";
    } else if (confiCalle.length < 3){
        errores.confirmCalle = "Debe tener al menos 3 caracteres.";
    }
    

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

    const len = passNorm.length;
    if (len === 0) {
        errores.password = "La contraseña es obligatoria.";
    } else if (/\\s/.test(passNorm)) {
        errores.password = "La contraseña no debe contener espacios.";
    } else if (len < 5) {
        errores.password = "Debe tener al menos 5 caracteres.";
    } else if (len > 10) {
        errores.password = "Debe tener como máximo 10 caracteres.";
    }

    const lenConf = confirmNorm.length;
    if (lenConf === 0) {
        errores.confirmPassword = "Debe confirmar la contraseña.";
    } else if (/\\s/.test(confirmNorm)) {
        errores.confirmPassword = "No debe contener espacios.";
    } else if (lenConf < 5) {
        errores.confirmPassword = "Debe tener al menos 5 caracteres.";
    } else if (lenConf > 10) {
        errores.confirmPassword = "Debe tener como máximo 10 caracteres.";
    } else if (confirmNorm !== passNorm) {
        errores.confirmPassword = "Las contraseñas no coinciden.";
    }

    return errores;
}
export default validarRegistro;
