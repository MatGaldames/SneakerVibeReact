export function getResumen(items = []) {
  const cantidad = items.reduce((acc, x) => acc + (Number(x.cantidad) || 0), 0);
  const total = items.reduce(
    (acc, x) => acc + (Number(x.cantidad) || 0) * (Number(x.precio) || 0),
    0
  );
  return { cantidad, total };
}
