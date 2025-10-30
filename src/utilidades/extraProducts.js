// src/utilidades/extraProducts.js
const KEY = "sv:admin:extraProducts";

export function loadExtraProducts() {
  try {
    return JSON.parse(localStorage.getItem(KEY)) || [];
  } catch {
    return [];
  }
}

export function saveExtraProducts(arr) {
  localStorage.setItem(KEY, JSON.stringify(arr));
}

export function addExtraProduct(p) {
  const next = [p, ...loadExtraProducts()];
  saveExtraProducts(next);
  // Notifica a cualquier vista que escuche el evento (Productos.jsx)
  try {
    window.dispatchEvent(
      new StorageEvent("storage", { key: KEY, newValue: JSON.stringify(next) })
    );
  } catch {}
}
