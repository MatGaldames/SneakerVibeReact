// src/Home.jsx
import React from "react";
import categorias from "./data/categorias";
import CategoriaCard from "./CategoriaCard";

export default function Home() {
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
        <div className="card card-max neon-card text-center">
          <img
            src={c.imgSrc}
            className="card-img-top rounded"
            alt={c.altText}
          />
          <div className="card-body">
            <h5 className="card-title">{c.titulo}</h5>
          </div>
        </div>
      </div>
    ))}
  </div>
</div>


    </main>
  );
}
