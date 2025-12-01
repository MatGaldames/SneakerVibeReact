const API_URL = "http://52.0.14.78:8080/api/productos";

export async function getProductos() {
  try {
    const res = await fetch(API_URL);
    if (!res.ok) throw new Error("Error al obtener productos");
    return await res.json();
  } catch (error) {
    console.error(error);
    return [];
  }
}

export async function deleteProducto(id) {
  try {
    const res = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
    return res.ok;
  } catch (error) {
    console.error(error);
    return false;
  }
}
