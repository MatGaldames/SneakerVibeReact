// src/Home.jsx
import React, { useEffect, useState } from "react";

const API_CATEGORIAS = "http://18.232.140.10:8080/api/categorias";

// Adaptar la categoría que viene de la API al formato usado por la UI
function mapCategoriaFromApi(c = {}) {
  const nombre =
    c.nombreCategoria || c.nombre || c.titulo || "Categoría";

  const slug = nombre.toLowerCase();

  const assetMap = {
    ropa: {
      imgSrc: "/assets/img/ropa-index.png",
      href: "/ropa",
    },
    zapatillas: {
      imgSrc: "/assets/img/zapatillas-index.png",
      href: "/productos",
    },
    accesorios: {
      imgSrc: "/assets/img/accesorios-index.png",
      href: "/accesorios",
    },
  };

  const asset = assetMap[slug] || {
    imgSrc: "/assets/img/placeholder-category.png",
    href: `/categoria?nombre=${encodeURIComponent(slug)}`,
  };

  return {
    id: c.id,
    titulo: nombre,
    nombre: nombre,
    imgSrc: asset.imgSrc,
    altText: `Categoría ${nombre}`,
    href: asset.href,
  };
}

export default function Home() {
  const [categorias, setCategorias] = useState([]);

  useEffect(() => {
    async function fetchCategorias() {
      try {
        const res = await fetch(API_CATEGORIAS);
        if (!res.ok) {
          throw new Error("Error HTTP " + res.status);
        }
        const data = await res.json();
        const mapeadas = Array.isArray(data)
          ? data.map(mapCategoriaFromApi)
          : [];
        setCategorias(mapeadas);
      } catch (err) {
        console.error("Error al cargar categorías desde la API:", err);
        setCategorias([]);
      }
    }

    fetchCategorias();
  }, []);

  return (
    <main className="flex-grow-1">
      <div className="container my-5">
        <div className="row align-items-center">
          <div className="col-12 col-lg-6 mb-4 mb-lg-0 text-center text-lg-left">
            <h2 className="mb-3">Tienda online</h2>
            <p className="mb-4">
              En SneakerVibe nuestro objetivo es elevar tu estilo con prendas a
              la moda y de calidad. Buscamos ofertar las mejores prendas a tod@s
              nuestros clientes.
            </p>
            <a href="/productos.html" className="btn btn-danger">
              Ver los productos
            </a>
          </div>

          <div className="col-12 col-lg-6">
            <div className="ratio ratio-16x9">
              <video
                src="/assets/img/video-index.mp4"
                muted
                playsInline
                controls
                autoPlay
                className="w-100 rounded"
              ></video>
            </div>
          </div>
        </div>
      </div>

      <div className="container-fluid my-5">
        <div className="row justify-content-around w-100 mx-0">
          {categorias.map((c) => (
            <div
              key={c.id}
              className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4 d-flex justify-content-center"
            >
              {/* Toda la card es clickeable */}
              <a
                href={`/categoria?nombre=${encodeURIComponent(
                  (c.titulo || c.nombre).toLowerCase()
                )}`}
                className="text-decoration-none text-reset w-100 d-flex justify-content-center"
              >
                <div className="card card-max neon-card text-center w-100 h-100">
                  <img
                    src={c.imgSrc}
                    className="card-img-top rounded"
                    alt={c.altText}
                  />
                  <div className="card-body d-flex flex-column justify-content-center">
                    <h5 className="card-title">{c.titulo}</h5>
                  </div>
                </div>
              </a>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
