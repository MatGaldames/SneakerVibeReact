// src/utilidades/productFactory.js

// --- Tallas por categoría (exacto a tu requerimiento) ---
export const ZAPATILLAS_SIZES = [
  { us: "5.5", uk: "4.5", eu: "38",   cm: "23.5" },
  { us: "6",   uk: "5",   eu: "38.5", cm: "24"   },
  { us: "6.5", uk: "5.5", eu: "39",   cm: "24.5" },
  { us: "7",   uk: "6",   eu: "40",   cm: "25"   },
  { us: "7.5", uk: "6.5", eu: "40.5", cm: "25.5" },
];

export const ROPA_SIZES = ["XS", "S", "M", "L", "XL"];
export const ACCESORIOS_SIZES = ["Única"];

export const CATEGORY_SIZES = {
  zapatillas: ZAPATILLAS_SIZES,
  ropa: ROPA_SIZES,
  accesorios: ACCESORIOS_SIZES,
};

// --- Helpers de texto/rutas ---
export function slugify(str) {
  return String(str)
    .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

export function basename(path) {
  if (!path) return "";
  const clean = String(path).trim().replace(/["']/g, "");
  const parts = clean.split(/[\\/]/);
  return parts[parts.length - 1];
}

export function makeImgSrc(anyPathOrName) {
  const file = basename(anyPathOrName);
  if (!file) return "/assets/img/placeholder-product.svg";
  if (/^https?:\/\//i.test(file)) return file;         // URL completa
  if (file.startsWith("/assets/img/")) return file;     // ya normalizada
  return `/assets/img/${file}`;                         // concatena prefijo
}

// --- Construye el producto a partir del form (5 campos + imagen) ---
/**
 * form: { titulo, descripcion, precio, precioOferta, categoria, imagen }
 */
export function buildProductFromForm(form) {
  const {
    titulo = "",
    descripcion = "",
    precio = "",
    precioOferta = "",
    categoria = "zapatillas",
    imagen = "",
  } = form || {};

  const id = slugify(titulo);
  const href = `/product?id=${id}`;
  const imgSrc = makeImgSrc(imagen);

  return {
    id,
    categoria,
    href,
    imgSrc,
    altText: titulo,
    titulo,
    descripcion,
    precio: Number(precio) || 0,
    precioOferta: precioOferta ? Number(precioOferta) : null,
    // OJO: aquí se inyecta el set de tallas según la categoría
    tallas: CATEGORY_SIZES[categoria] || [],
  };
}
