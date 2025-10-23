// Lectura/escritura segura en localStorage
export function readCart(key) {
  try {
    if (typeof localStorage === "undefined") return [];
    const raw = localStorage.getItem(key);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch (_) {
    return [];
  }
}

export function writeCart(key, items) {
  try {
    if (typeof localStorage === "undefined") return;
    localStorage.setItem(key, JSON.stringify(items ?? []));
  } catch (_) {
    // ignore quota/serialization errors
  }
}
