import React from "react";

export default function SneakerInversionCase() {
    return (
        <main className="container py-5">
            <div className="row g-4">
                {/* Imagen grande */}
                <div className="col-12 col-lg-6 order-lg-2">
                    <img
                        src="../assets/img/c10.png" // cambia por la ruta que ya tengas
                        alt="Vitrina de zapatillas de colección"
                        className="img-fluid rounded shadow-sm"
                    />
                </div>

                {/* Texto */}
                <div className="col-12 col-lg-6 order-lg-1">
                    <h1 className="h3 mb-3">Cuando las zapatillas se vuelven inversión</h1>
                    <p className="text-muted mb-4">
                        Hoy existe un mercado de reventa de sneakers donde un par de ediciones
                        limitadas puede multiplicar su precio original hasta 10 veces. Para
                        muchos, los sneakers dejaron de ser solo calzado y se transformaron en
                        un activo de colección.
                    </p>

                    <h2 className="h5 mb-2">¿Cómo funciona el mercado de reventa?</h2>
                    <p>
                        Lanzamientos con stock limitado, rifas online y colaboraciones con
                        artistas o marcas de lujo generan una demanda enorme. Quien logra
                        comprar al retail puede revender después en plataformas especializadas,
                        ferias o grupos de coleccionistas.
                    </p>

                    <p>
                        Modelos como Jordan 1, Dunks o colaboraciones con Travis Scott, Off-White
                        y otras marcas han llegado a valores que superan con facilidad el millón
                        de pesos chilenos en el mercado secundario.
                    </p>

                    <h2 className="h5 mt-4 mb-2">¿Es realmente una inversión?</h2>
                    <p>
                        Como toda inversión, tiene riesgo: los precios dependen de la demanda,
                        del estado del par y de la autenticidad. No basta con comprar cualquier
                        modelo, hay que entender la cultura, los lanzamientos y qué pares tienen
                        potencial de subir su valor con el tiempo.
                    </p>

                    <p className="mt-4 mb-0">
                        En <strong>SneakerVibe</strong> creemos que los sneakers primero se
                        disfrutan y luego se analizan como inversión. Detrás de cada par hay una
                        historia, una comunidad y una oportunidad para conectar con otros
                        coleccionistas.
                    </p>
                </div>
            </div>
        </main>
    );
}
