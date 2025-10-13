// src/Home.jsx
import React from "react";

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
            <div className="embed-responsive embed-responsive-16by9">
              <video
                className="embed-responsive-item"
                src="/assets/img/video-index.mp4"
                muted
                playsInline
                controls
                autoPlay
              ></video>
            </div>
          </div>
        </div>
      </div>

      {/* Aquí luego renderizamos los cards y secciones extras */}
    </main>
  );
}
