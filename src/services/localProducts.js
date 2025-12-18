const KEY = "sv_local_products_v1";

export function loadLocalProducts() {
  try {
    const stored = localStorage.getItem(KEY);
    return stored ? JSON.parse(stored) : [];
  } catch (e) {
    console.error("Error loading local products", e);
    return [];
  }
}

export function saveLocalProducts(list) {
  try {
    localStorage.setItem(KEY, JSON.stringify(list));
  } catch (e) {
    console.error("Error saving local products (quota exceeded?)", e);
    alert("No se pudo guardar localmente (posiblemente localStorage lleno).");
  }
}

export function addLocalProduct(product) {
  const list = loadLocalProducts();
  // Agregamos al inicio
  const newList = [product, ...list];
  saveLocalProducts(newList);
}

export function removeLocalProduct(id) {
  const list = loadLocalProducts();
  const newList = list.filter((p) => p.id !== id && p.variantes?.[0]?.id !== id);
  saveLocalProducts(newList);
}
