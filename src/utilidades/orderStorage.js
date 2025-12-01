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
  // Orden completa
  if (o && o.customer && o.items && o.totals) {
    // Garantiza id estable
    return { id: o.id ?? o.number ?? crypto.randomUUID(), ...o };
  }

  // Legacy (string o { number })
  const number = typeof o === "string" ? o : (o?.number ?? "SIN-NUMERO");
  return {
    id: `LEGACY-${number}`,              // ID estable basado en el número
    number,
    createdAt: new Date().toISOString(),
    customer: {
      nombre: "(sin nombre)", apellido: "", rut: "", email: "", telefono: "",
      direccion: { calle: "", numero: "", depto: "", comuna: "", region: "" },
    },
    items: [],
    totals: { subtotal: 0, descuento: 0, envio: 0, total: 0 },
    payment: { method: "", status: "pendiente" },
    shipping: { status: "pendiente" },
    _legacy: true,
  };
}
