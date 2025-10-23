import { readCart } from "./cartStorage.js";
import { mapProductToItem } from "./productMapper.js";

export function addItem(key, producto) {
  const items = readCart(key);
  const item = mapProductToItem(producto);
  const idx = items.findIndex(
    (x) => x.id === item.id && (x.talla || null) === (item.talla || null)
  );
  if (idx >= 0) {
    const next = items.slice();
    next[idx] = { ...next[idx], cantidad: (next[idx].cantidad || 0) + (item.cantidad || 1) };
    return next;
  }
  return [...items, item];
}

export function setQty(key, id, qty) {
  const items = readCart(key);
  const nqty = Math.max(1, Number(qty) || 1);
  return items.map((x) => (x.id === id ? { ...x, cantidad: nqty } : x));
}

export function incQty(key, id) {
  const items = readCart(key);
  return items.map((x) => (x.id === id ? { ...x, cantidad: (x.cantidad || 0) + 1 } : x));
}

export function decQty(key, id) {
  const items = readCart(key);
  return items.map((x) =>
    x.id === id ? { ...x, cantidad: Math.max(1, (x.cantidad || 0) - 1) } : x
  );
}

export function removeItem(key, id) {
  const items = readCart(key);
  return items.filter((x) => x.id !== id);
}

export function clearCart() {
  return [];
}
