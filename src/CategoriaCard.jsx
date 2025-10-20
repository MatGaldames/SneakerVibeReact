import React from "react";

export default function CategoriaCard({ categoria }) {
  return (
    <div className="card h-100 text-center">
      <img
        src={categoria.imgSrc}
        className="card-img-top"
        alt={categoria.titulo}
      />
      <div className="card-body">
        <h5 className="card-title">{categoria.titulo}</h5>
        <a href={categoria.href} className="stretched-link"></a>
      </div>
    </div>
  );
}
