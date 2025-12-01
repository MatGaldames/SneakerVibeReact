const API_URL = "http://52.0.14.78:8080/api/pedidos";

export async function getPedidos() {
  try {
    const res = await fetch(API_URL);
    if (!res.ok) return [];
    const data = await res.json();
    return Array.isArray(data) ? data : [];
  } catch (error) {
    console.error("Error al obtener pedidos:", error);
    return [];
  }
}

export async function createPedido(pedido) {
  try {
    const res = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(pedido),
    });
    
    if (!res.ok) {
      console.error("Error al crear pedido:", res.status, res.statusText);
      return null;
    }
    
    return await res.json();
  } catch (error) {
    console.error("Error al crear pedido:", error);
    return null;
  }
}

export async function getPedidoById(id) {
  try {
    const res = await fetch(`${API_URL}/${id}`);
    if (!res.ok) return null;
    return await res.json();
  } catch (error) {
    console.error("Error al obtener pedido:", error);
    return null;
  }
}
