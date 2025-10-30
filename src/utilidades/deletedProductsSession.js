// Clave única para toda la app
const STORAGE_KEY = "sv:admin:deletedProducts";

// Un “id” estable por producto (prefiere el id de tu data)
export const getStableId = (p, fallbackIndex) => p?.id ?? p?._id ?? p?.__id ?? fallbackIndex;

// Cargar el set de eliminados de esta sesión
export const loadDeleted = () => {
  try {
    return new Set(JSON.parse(sessionStorage.getItem(STORAGE_KEY) || "[]"));
  } catch {
    return new Set();
  }
};

// Guardar un id como eliminado
export const markDeleted = (stableId) => {
  const set = loadDeleted();
  set.add(stableId);
  sessionStorage.setItem(STORAGE_KEY, JSON.stringify([...set]));
};
