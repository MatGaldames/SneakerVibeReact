export function getDatosClienteFromRegistro() {
    const KEYS = [
        "usuarioActual",
        "auth:user",
        "sv:usuario",
        "registro:usuario",
    ];

    let raw = null;
    for (const k of KEYS){
        try{
            const v = localStorage.getItem(k);
            if (v){ raw = JSON.parse(v); break;  }
        } catch (_) {}
        }
    if (!raw) return null;

    const nombre = raw.nombre ??  "";
    const correo = raw.correo ?? raw.email ?? "";
    const direccion = raw.direccion ?? "";
    const numeracion = raw.numeracion ?? "";
    const region = raw.region ?? "";
    const comuna = raw.comuna ?? "";

    return{
        nombre,
        correo,
        direccion,
        numeracion,
        region,
        comuna,
    }
    
}