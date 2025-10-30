// Clave separada para usuarios
const USER_STORAGE_KEY = "sv:admin:deletedUsers";

// Id estable por usuario (tu data ya trae "id", ej: "admin-001")
export const getStableUserId = (u, fallbackIndex) =>
  u?.id ?? u?._id ?? u?.__id ?? fallbackIndex;

// Cargar el set de eliminados de esta sesión
export const loadDeletedUsers = () => {
  try {
    return new Set(JSON.parse(sessionStorage.getItem(USER_STORAGE_KEY) || "[]"));
  } catch {
    return new Set();
  }
};

// Guardar un id como eliminado (deshabilitar)
export const markUserDeleted = (stableId) => {
  const set = loadDeletedUsers();
  set.add(stableId);
  sessionStorage.setItem(USER_STORAGE_KEY, JSON.stringify([...set]));
};

// Quitar un id del set (habilitar)
export const unmarkUserDeleted = (stableId) => {
  const set = loadDeletedUsers();
  set.delete(stableId);
  sessionStorage.setItem(USER_STORAGE_KEY, JSON.stringify([...set]));
};

// Helper opcional
export const isUserDeleted = (stableId) => loadDeletedUsers().has(stableId);
