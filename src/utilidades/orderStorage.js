export function saveOrder(order) {
  try {
    const current = JSON.parse(localStorage.getItem("sv:orders")) || [];
    current.push(order);
    localStorage.setItem("sv:orders", JSON.stringify(current));
  } catch (e) {
    console.error("Error al guardar orden:", e);
  }
}

// Obtener todas las órdenes (para que el admin las lea)
export function getAllOrders() {
  try {
    return JSON.parse(localStorage.getItem("sv:orders")) || [];
  } catch {
    return [];
  }
}