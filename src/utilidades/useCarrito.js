// src/hooks/useCarrito.js
import { useEffect, useMemo, useState } from "react";
import { detectCartKey } from "./cartKey.js";
import { readCart, writeCart } from "./cartStorage.js";
import {
  addItem,
  setQty,
  incQty,
  decQty,
  removeItem,
  clearCart,
} from "./cartOps.js";
import { getResumen } from "./cartTotals.js";

export function useCarrito(initialKey) {
  const [key] = useState(initialKey || detectCartKey());
  const [items, setItems] = useState([]);

  useEffect(() => {
    setItems(readCart(key));
  }, [key]);

  const persist = (next) => {
    setItems(next);
    writeCart(key, next);
  };

  // API del hook (solo orquesta las funciones puras)
  const api = {
    add: (producto) => persist(addItem(key, producto)),
    setQty: (id, qty) => persist(setQty(key, id, qty)),
    inc: (id) => persist(incQty(key, id)),
    dec: (id) => persist(decQty(key, id)),
    remove: (id) => persist(removeItem(key, id)),
    clear: () => persist(clearCart(key)),
  };

  const resumen = useMemo(() => getResumen(items), [items]);

  return { key, items, resumen, ...api };
}