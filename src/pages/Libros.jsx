import React, { useEffect, useState } from "react";

export default function Libros() {
  const [libros, setLibros] = useState([]); // Estado para guardar los libros
  const [cargando, setCargando] = useState(true); // Estado de carga
  const [error, setError] = useState(null); // Estado para errores

  useEffect(() => {
    // Llamada a la API
    fetch("http://13.222.134.181:8080/api/books")
      .then((res) => {
        if (!res.ok) throw new Error("Error al obtener los libros");
        return res.json();
      })
      .then((data) => {
        setLibros(data);
        setCargando(false);
      })
      .catch((err) => {
        console.error(err);
        setError(err.message);
        setCargando(false);
      });
  }, []);

  if (cargando) return <p className="text-center mt-5">Cargando libros...</p>;
  if (error) return <p className="text-center text-danger mt-5">❌ {error}</p>;

  return (
    <main className="flex-grow-1">
      <div className="container-fluid my-5">
        <div className="row justify-content-around w-100 mx-0">
          {libros.length === 0 ? (
            <p>No hay libros disponibles.</p>
          ) : (
            libros.map((libro) => (
              <div
                key={libro.id}
                className="card col-3 m-2 shadow-sm"
                style={{ width: "18rem" }}
              >
                <div className="card-body">
                  <h5 className="card-title">{libro.title}</h5>
                  <h6 className="card-subtitle mb-2 text-muted">
                    {libro.author}
                  </h6>
                  <p className="card-text">
                    {libro.description || "Sin descripción disponible."}
                  </p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </main>
  );
}
