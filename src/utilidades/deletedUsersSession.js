// Clave separada para usuarios (no mezclar con productos)
const USER_STORAGE_KEY = "sv:admin:deletedUsers";

// Id estable por usuario (usa el que tengas en tu data)
export const getStableUserId = (u, fallbackIndex) => u?.id ?? u?._id ?? u?.__id ?? fallbackIndex;

export const loadDeletedUsers = () => {
  try {
    return new Set(JSON.parse(sessionStorage.getItem(USER_STORAGE_KEY) || "[]"));
  } catch {
    return new Set();
  }
};

export const markUserDeleted = (stableId) => {
  const set = loadDeletedUsers();
  set.add(stableId);
  sessionStorage.setItem(USER_STORAGE_KEY, JSON.stringify([...set]));
};
