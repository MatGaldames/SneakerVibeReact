const API_URL = "http://52.0.14.78:8080/api/usuarios";

export async function getUsuarios() {
  try {
    const res = await fetch(API_URL);
    if (!res.ok) throw new Error("Error al obtener usuarios");
    return await res.json();
  } catch (error) {
    console.error(error);
    return [];
  }
}

export async function deleteUsuario(id) {
  try {
    const res = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
    return res.ok;
  } catch (error) {
    console.error(error);
    return false;
  }
}
