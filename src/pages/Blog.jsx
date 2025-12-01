// src/Blog.jsx
import React from "react";
import { Link } from "react-router-dom";


export default function Blog() {
  return (
    <section className="py-5 bg-light">
      <div className="container mt-4">
        <h2 className="text-center mb-5 text-danger">NOTICIAS RELEVANTES</h2>

        {/* Bloque 1 */}
        <div className="row blog-card align-items-center mb-5">
          <div className="col-md-6 d-flex flex-column justify-content-center mb-3 mb-md-0">
            <h3 className="blog-title fw-bold">
              Las zapatillas más vendidas de la historia
            </h3>
            <p>
              Las Nike Air Force 1, lanzadas en 1982, son consideradas las
              zapatillas más vendidas de todos los tiempos. Cada año se lanzan
              nuevas ediciones.
            </p>
            <Link to="/blog/noticia1" className="btn btn-danger w-100">
              VER CASO
            </Link>
          </div>
          <div className="col-md-6 text-center">
            <img
              src="/assets/img/af1.png"
              alt="Imagen caso curioso 1"
              className="img-fluid rounded shadow-sm"
            />
          </div>
        </div>

        {/* Bloque 2 */}
        <div className="row blog-card align-items-center flex-md-row-reverse">
          <div className="col-md-6 d-flex flex-column justify-content-center mb-3 mb-md-0">
            <h3 className="blog-title fw-bold">
              Cuando las zapatillas se vuelven inversión
            </h3>
            <p>
              Hoy existe un mercado de reventa de sneakers donde un par de
              zapatillas limitadas puede multiplicar su precio hasta 10 veces.
              ¡Un sneaker puede ser mejor inversión que el oro!
            </p>
            <Link to="/blog/noticia2" className="btn btn-danger w-100">
              VER CASO
            </Link>
          </div>
          <div className="col-md-6 text-center">
            <img
              src="/assets/img/c10.png"
              alt="Imagen caso curioso 2"
              className="img-fluid rounded shadow-sm"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
