import { loadLocalProducts } from "./localProducts";

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

export async function createProducto(formData) {
  try {
    const res = await fetch(API_URL, {
      method: "POST",
      body: formData,
    });
    if (!res.ok) {
      const text = await res.text();
      console.error("Server error:", text);
      throw new Error("Error del servidor: " + (text || res.statusText));
    }
    return await res.json();
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function getProductosMerged(getProductosApiFn = getProductos) {
  const local = loadLocalProducts();
  try {
    const api = await getProductosApiFn();
    return [...local, ...api];
  } catch (e) {
    console.error("Error fetching API, returning only local", e);
    return [...local];
  }
}
