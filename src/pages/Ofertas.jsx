import React, { useEffect, useState } from "react";

const API_URL = "http://18.232.140.10:8080/api";

export default function Ofertas() {
  const [ofertas, setOfertas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const resp = await fetch(`${API_URL}/productos`);
        if (!resp.ok) throw new Error("Error al cargar productos");
        const data = await resp.json();

        // 1 card por producto
        const productosConOferta = data
          .map((producto) => {
            // variantes que tienen precioOferta
            const variantesConOferta = producto.variantes.filter(
              (v) => v.precioOferta !== null && v.precioOferta !== undefined
            );

            // si no tiene variantes en oferta, descartamos el producto
            if (variantesConOferta.length === 0) return null;

            // tomamos la primera variante en oferta como referencia
            const v = variantesConOferta[0];

            return {
              id: producto.id,              // id del producto
              titulo: producto.nombre,
              descripcion: producto.descripcion,
              imgSrc: v.imgSrc,
              href: v.href,
              altText: v.altText,
              precio: v.precio,
              precioOferta: v.precioOferta,
              marca: producto.marca,
              categoria: producto.categoria?.nombreCategoria,
            };
          })
          .filter(Boolean); // elimina los null

        setOfertas(productosConOferta);
      } catch (err) {
        console.error(err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProductos();
  }, []);


  if (loading) {
    return <main className="flex-grow-1 p-5">Cargando ofertas...</main>;
  }

  if (error) {
    return (
      <main className="flex-grow-1 p-5">
        <p className="text-danger">Error: {error}</p>
      </main>
    );
  }

  // 👉 AQUÍ va el return con el map adentro
  return (
    <main className="flex-grow-1">
      <div className="container-fluid my-5">
        <div className="row justify-content-around w-100 mx-0">
          {ofertas.map((o) => {
            const tieneOferta =
              Number(o.precioOferta) > 0 && Number(o.precioOferta) < Number(o.precio);
            const ahorro = tieneOferta
              ? Math.round((1 - o.precioOferta / o.precio) * 100)
              : 0;

            return (
              <div
                key={o.id}
                className="col-12 col-sm-6 col-md-4 col-lg-4 mb-4 d-flex justify-content-center"
              >
                <div className="card card-product neon-product text-center position-relative">
                  {tieneOferta && (
                    <span className="position-absolute top-0 start-0 m-2 badge bg-danger">
                      -{ahorro}%
                    </span>
                  )}

                  <img
                    src={o.imgSrc}
                    className="card-img-top rounded"
                    alt={o.altText}
                  />
                  <div className="card-body d-flex flex-column justify-content-between">
                    <div>
                      <h5 className="card-title">{o.titulo}</h5>
                      <p className="card-text">{o.descripcion}</p>

                      {tieneOferta ? (
                        <>
                          <p className="text-muted text-decoration-line-through mb-1">
                            ${Number(o.precio).toLocaleString("es-CL")}
                          </p>
                          <p className="text-danger fw-bold">
                            ${Number(o.precioOferta).toLocaleString("es-CL")}
                          </p>
                        </>
                      ) : (
                        <p className="text-danger fw-bold">
                          ${Number(o.precio).toLocaleString("es-CL")}
                        </p>
                      )}
                    </div>
                    <a
                      href={o.href}
                      className="btn btn-dark mt-3"
                    >
                      Ver producto
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </main>
  );
}
