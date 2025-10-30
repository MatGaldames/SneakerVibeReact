// Clave separada para usuarios (no mezclar con productos)
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

// Guardar un id como eliminado
export const markUserDeleted = (stableId) => {
  const set = loadDeletedUsers();
  set.add(stableId);
  sessionStorage.setItem(USER_STORAGE_KEY, JSON.stringify([...set]));
};
