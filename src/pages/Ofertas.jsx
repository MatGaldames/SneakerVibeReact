import { useCarrito } from "../utilidades/useCarrito";
import React, { useState } from "react";
import { useLocation } from "react-router-dom";

export default function ProductDetail() {
    const { add } = useCarrito();
    const [talla, setTalla] = useState(null);
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const productId = searchParams.get("id");

    const producto = productos.find((p) => p.id === productId);

    if (!producto) {
        return (
            <div className="container py-5 text-center">
                <h2>Producto no encontrado</h2>
                <p>El producto que buscas no existe o fue removido.</p>
            </div>
        );
    }

    return (
        <main className="container-fluid py-5">
            <div className="container py-5">
                <div className="row align-items-center">
                    <div className="col-12 col-lg-6 text-center mb-4 mb-lg-0">
                        <img
                            src={producto.imgSrc}
                            alt={producto.altText}
                            className="img-fluid rounded shadow-sm"
                        />
                    </div>

                    <div className="col-12 col-lg-6">
                        <h2 className="fw-bold">{producto.titulo}</h2>
                        <p>{producto.descripcion}</p>
                        <h4 className="text-danger mb-3">
                            ${producto.precio.toLocaleString("es-CL")}
                        </h4>

                        <label htmlFor="talla" className="fw-semibold">
                            Selecciona tu talla
                        </label>
                        <select id="talla" className="form-select mb-4" onChange={(e)=> setTalla(e.target.value)}>
                            {producto.tallas &&
                                producto.tallas.map((t, i) => (
                                    <option key={i}>
                                        {t.eu
                                            ? `EU ${t.eu} (US ${t.us})`
                                            : `Talla ${t}`}
                                    </option>
                                ))}
                        </select>

                        <button className="btn btn-danger w-100 mb-3" onClick={()=> add({ ...producto, talla })}>
                            Agregar al carrito
                        </button>

                        {producto.tallas[0]?.eu && (
                            <>
                                <h5 className="fw-semibold mt-4">Tabla de Tallas</h5>
                                <table className="table table-bordered text-center">
                                    <thead className="table-light">
                                        <tr>
                                            <th>US</th>
                                            <th>UK</th>
                                            <th>EU</th>
                                            <th>CM</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {producto.tallas.map((t, i) => (
                                            <tr key={i}>
                                                <td>{t.us}</td>
                                                <td>{t.uk}</td>
                                                <td>{t.eu}</td>
                                                <td>{t.cm}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </>
                        )}
                    </div>
                </div>
            </div>
            <section className="my-5">
                <h4 className="text-center mb-4">Productos más vendidos</h4>
                <div className="container-fluid">
                    <div className="row justify-content-between w-100 mx-0">
                        {productos.slice(0, 3).map((p) => (
                            <div
                                key={p.id}
                                className="col-12 col-sm-6 col-md-4 col-lg-4 mb-4 d-flex justify-content-center"
                            >
                                <div className="card card-product neon-product text-center">
                                    <img
                                        src={p.imgSrc}
                                        className="card-img-top rounded"
                                        alt={p.altText}
                                    />
                                    <div className="card-body d-flex flex-column justify-content-between">
                                        <div>
                                            <h5 className="card-title">{p.titulo}</h5>
                                            <p className="card-text">{p.descripcion}</p>
                                            <p className="text-danger font-weight-bold">
                                                ${p.precio.toLocaleString("es-CL")}
                                            </p>
                                        </div>
                                        <a href={`/product?id=${p.id}`} className="btn btn-dark mt-3">
                                            Ver producto
                                        </a>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

        </main>
    );
}
