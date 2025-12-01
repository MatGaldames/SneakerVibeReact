// src/utilidades/deletedUsersSession.js

// Clave para usuarios en localStorage
const USER_STORAGE_KEY = "sv:admin:deletedUsers";

// Id estable por usuario
export const getStableUserId = (u, fallbackIndex) =>
  u?.id ?? u?._id ?? u?.__id ?? fallbackIndex;

// Cargar el set de eliminados
export const loadDeletedUsers = () => {
  try {
    return new Set(JSON.parse(localStorage.getItem(USER_STORAGE_KEY) || "[]"));
  } catch {
    return new Set();
  }
};

// Marcar usuario como eliminado
export const markUserDeleted = (stableId) => {
  const set = loadDeletedUsers();
  set.add(stableId);
  localStorage.setItem(USER_STORAGE_KEY, JSON.stringify([...set]));
  window.dispatchEvent(new Event("sv_deleted_users_change"));
};

// Restaurar usuario
export const unmarkUserDeleted = (stableId) => {
  const set = loadDeletedUsers();
  set.delete(stableId);
  localStorage.setItem(USER_STORAGE_KEY, JSON.stringify([...set]));
  window.dispatchEvent(new Event("sv_deleted_users_change"));
};

// Helper opcional
export const isUserDeleted = (stableId) => loadDeletedUsers().has(stableId);
