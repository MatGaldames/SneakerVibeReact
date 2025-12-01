import React from "react";
import { Link } from "react-router-dom";


export default function AirForceCase() {
    return (
        <main className="container py-5">
            <div className="row g-4">
                {/* Imagen grande */}
                <div className="col-12 col-lg-6">
                    <img
                        src="../assets/img/af1.png" // cambia por la ruta que estés usando
                        alt="Nike Air Force 1 blancas"
                        className="img-fluid rounded shadow-sm"
                    />
                </div>

                {/* Texto */}
                <div className="col-12 col-lg-6">
                    <h1 className="h3 mb-3">Las zapatillas más vendidas de la historia</h1>
                    <p className="text-muted mb-4">
                        Las Nike Air Force 1, lanzadas en 1982, se convirtieron en un icono del
                        básquetbol, la cultura urbana y la moda. Lo que comenzó como un modelo
                        técnico terminó siendo una de las siluetas más reconocibles del mundo.
                    </p>

                    <h2 className="h5 mb-2">¿Por qué son tan populares?</h2>
                    <p>
                        Su diseño simple, la comodidad del Air en la mediasuela y la posibilidad
                        de combinar con casi cualquier outfit hicieron que las Air Force 1
                        trascendieran las canchas. Rap, streetwear y colaboraciones con artistas
                        mantuvieron el modelo siempre vigente.
                    </p>

                    <p>
                        Cada año Nike lanza nuevas ediciones, colorways y colaboraciones
                        limitadas, pero el modelo blanco clásico sigue siendo el favorito. Es
                        una zapatilla que funciona igual para el día a día, para coleccionar o
                        incluso como lienzo para personalización.
                    </p>

                    <h2 className="h5 mt-4 mb-2">Dato curioso</h2>
                    <p>
                        Se estima que las Air Force 1 han vendido decenas de millones de pares a
                        nivel mundial. Pocas siluetas se mantienen relevantes por más de 40 años
                        sin perder su esencia.
                    </p>

                    <p className="mt-4 mb-0">
                        En <strong>SneakerVibe</strong> miramos este tipo de casos para entender
                        qué convierte a un modelo en un verdadero clásico: historia, consistencia
                        y conexión real con la cultura.
                    </p>
                </div>
            </div>
        </main>
    );
}
