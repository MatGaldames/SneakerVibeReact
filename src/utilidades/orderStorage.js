// src/utilidades/orders.js
const STORAGE_KEY = "sv:orders";


export function createOrderNumber(prefix = "SV") {
  const y = new Date().getFullYear();
  const sec = Math.floor(Math.random() * 1_000_000).toString().padStart(6, "0");
  return `${prefix}-${y}-${sec}`;
}

export function saveOrder(order) {
  try {
    const current = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
    current.push(order);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(current));
  } catch (e) {
    console.error("Error al guardar orden:", e);
  }
}

export function getAllOrders() {
  try {
    const raw = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
    const normalized = raw.map(normalizeOrder);

    // Si normalizamos algo (por ej. agregamos id estable), persistimos la migración
    if (JSON.stringify(raw) !== JSON.stringify(normalized)) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(normalized));
    }
    return normalized;
  } catch {
    return [];
  }
}

export function getOrderById(id) {
  return getAllOrders().find((o) => o.id === id) || null;
}

export function getLastOrder() {
  try {
    const current = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
    if (!Array.isArray(current) || current.length === 0) return null;

    // devolvemos la ÚLTIMA orden guardada (la compra más reciente)
    return current[current.length - 1];
  } catch {
    return null;
  }
}

function normalizeOrder(o) {
  // Caso 1: Estructura nueva (Envio.jsx)
  if (o && o.cliente && o.items && (o.total !== undefined)) {
    return { ...o, id: o.id || o.code || crypto.randomUUID() };
  }

  // Caso 2: Estructura antigua (Legacy)
  if (o && o.customer && o.items && o.totals) {
    return { id: o.id ?? o.number ?? crypto.randomUUID(), ...o };
  }

  // Fallback: Legacy string o incompleto
  const number = typeof o === "string" ? o : (o?.number ?? "SIN-NUMERO");
  return {
    id: `LEGACY-${number}`,
    number,
    createdAt: new Date().toISOString(),
    cliente: { // Normalizamos a 'cliente' para que Boleta.jsx funcione
      nombre: "(sin nombre)", apellidos: "", correo: "",
      direccion: "", comuna: "", region: ""
    },
    items: [],
    total: 0,
    _legacy: true,
  };
}
