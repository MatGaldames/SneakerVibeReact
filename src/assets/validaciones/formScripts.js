export function checkName(name){
    if (name.length < 3) {
        return 'El nombre debe tener al menos 3 caracteres.';
    }
    if (name.length > 30) {
        return 'El nombre no debe superar los 30 caracteres.';
    }
    if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(name)) {
        return 'El nombre solo debe contener letras y espacios.';
    }

    return '';
}

export function checkMaxLength(text, minChar, maxChar){
    if (text.length < minChar) {
        return 'El texto debe contener al menos ' + minChar + ' caracteres.'
    }
    if (text.length > maxChar) {
        return 'El texto debe contener maximo ' + maxChar + ' caracteres.'
    }

    return '';
}
