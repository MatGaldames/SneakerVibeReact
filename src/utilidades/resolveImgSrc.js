export function resolveImgSrc(raw) {
  // 1) si no hay raw => placeholder
  if (!raw) return "/assets/img/placeholder-product.png";

  // 2) si raw es dataURL (raw.startsWith("data:image")) => retornarlo tal cual
  if (raw.startsWith("data:image")) return raw;

  // 3) si raw es URL http/https => retornarlo tal cual
  if (raw.startsWith("http://") || raw.startsWith("https://")) return raw;

  // 4) si raw contiene "fakepath" o "\" (backslash) => placeholder
  if (raw.includes("fakepath") || raw.includes("\\")) return "/assets/img/placeholder-product.png";

  // 5) si raw empieza con "/assets/" => retornarlo tal cual (es public del frontend)
  if (raw.startsWith("/assets/")) return raw;

  // 6) si raw es nombre de archivo tipo "nike.png" => "/assets/img/nike.png"
  // Asumimos que si no tiene slash y tiene extensión, es un archivo en assets/img
  if (!raw.includes("/") && /\.(png|jpg|jpeg|svg|webp|gif)$/i.test(raw)) {
    return `/assets/img/${raw}`;
  }

  // 7) caso default => placeholder
  return "/assets/img/placeholder-product.png";
}
