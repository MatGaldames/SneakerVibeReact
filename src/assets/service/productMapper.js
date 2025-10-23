// Mapea un producto del catálogo a item de carrito
export function mapProductToItem(prod = {}) {
  return {
    id: prod.id,
    titulo: prod.titulo || prod.nombre || "Producto",
    precio: Number(prod.precio) || 0,
    imgSrc: prod.imgSrc || prod.imagen_url || "/assets/img/placeholder.png",
    talla: prod.talla || null,
    cantidad: Number(prod.cantidad) || 1,
  };
}
