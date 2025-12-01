// src/paginas/AgregarProductos.jsx
import React, { useState, useMemo } from "react";
import { addExtraProduct } from "../utilidades/extraProducts";
import { buildProductFromForm, CATEGORY_SIZES, makeImgSrc } from "../utilidades/productFactory";

export default function AgregarProductos({ bgUrl = "/assets/img/auth-bg.jpg" }) {
  const [form, setForm] = useState({
    titulo: "",
    descripcion: "",
    precio: "",
    categoria: "zapatillas",
    imagen: "", // nombre o ruta del archivo
  });
  const [msg, setMsg] = useState("");
  const [previewUrl, setPreviewUrl] = useState(null);

  const onChange = (e) => {
    const { id, value } = e.target;
    setForm((prev) => ({ ...prev, [id]: value }));
  };

  const onFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) {
      setForm((prev) => ({ ...prev, imagen: "" }));
      setPreviewUrl(null);
      return;
    }
    // Guardamos el nombre del archivo para construir imgSrc = /assets/img/<archivo>
    setForm((prev) => ({ ...prev, imagen: file.name }));
    // Vista previa local (solo UI)
    setPreviewUrl(URL.createObjectURL(file));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    // Construye el producto con campos automáticos (id, href, imgSrc, altText, tallas)
    const producto = buildProductFromForm({
      titulo: form.titulo,
      descripcion: form.descripcion,
      precio: form.precio,
      categoria: form.categoria,
      imagen: form.imagen,
      // precioOferta se omite => quedará null automáticamente en buildProductFromForm
    });

    addExtraProduct(producto);

    setMsg(`Producto "${producto.titulo}" agregado ✅`);
    // Resetea, manteniendo la categoría para velocidad de carga masiva
    setForm({
      titulo: "",
      descripcion: "",
      precio: "",
      categoria: form.categoria,
      imagen: "",
    });
    setPreviewUrl(null);
  };

  // Vista previa de tallas según categoría
  const tallasPreview = useMemo(() => CATEGORY_SIZES[form.categoria] || [], [form.categoria]);
  const computedImgSrc = useMemo(() => makeImgSrc(form.imagen), [form.imagen]);

  return (
    <main
      className="flex-grow-1 bg-light min-vh-100 py-5"
      style={{
        minHeight: "100vh",
        backgroundImage: `url('${bgUrl}')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        position: "relative",
      }}
    >
      <div className="container">
        <div className="text-center mb-5">
          <h2 className="fw-bold text-dark neon-text">Agregar producto</h2>
          <p className="text-muted">
            Completa los campos para agregar un nuevo producto a SneakerVibe
          </p>
        </div>

        <div className="row justify-content-center">
          <div className="col-12 col-md-8 col-lg-6">
            <div className="card neon-card p-4 shadow-lg border-0 rounded-3">
              <form className="d-flex flex-column gap-3" onSubmit={onSubmit}>
                {/* Título (Nombre) */}
                <div>
                  <label htmlFor="titulo" className="form-label fw-semibold">
                    Nombre del producto
                  </label>
                  <input
                    type="text"
                    id="titulo"
                    className="form-control neon-input"
                    placeholder="Ej: Campus 00s Black"
                    value={form.titulo}
                    onChange={onChange}
                    required
                  />
                </div>

                {/* Precio */}
                <div>
                  <label htmlFor="precio" className="form-label fw-semibold">
                    Precio (CLP)
                  </label>
                  <input
                    type="number"
                    id="precio"
                    className="form-control neon-input"
                    placeholder="Ej: 109990"
                    min="0"
                    step="100"
                    value={form.precio}
                    onChange={onChange}
                    required
                  />
                </div>

                {/* Categoría (dropdown) */}
                <div>
                  <label htmlFor="categoria" className="form-label fw-semibold">
                    Categoría
                  </label>
                  <select
                    id="categoria"
                    className="form-select neon-input"
                    value={form.categoria}
                    onChange={onChange}
                  >
                    <option value="zapatillas">Zapatillas</option>
                    <option value="ropa">Ropa</option>
                    <option value="accesorios">Accesorios</option>
                  </select>
                  <div className="form-text mt-1">
                    {form.categoria === "zapatillas" &&
                      "Se aplicará tabla US/UK/EU/CM estándar (5.5–7.5)."}
                    {form.categoria === "ropa" && "Se aplicarán tallas: XS, S, M, L, XL."}
                    {form.categoria === "accesorios" && "Se aplicará talla: Única."}
                  </div>
                </div>

                {/* Descripción */}
                <div>
                  <label htmlFor="descripcion" className="form-label fw-semibold">
                    Descripción
                  </label>
                  <textarea
                    id="descripcion"
                    className="form-control neon-input"
                    rows="3"
                    placeholder="Describe el producto..."
                    value={form.descripcion}
                    onChange={onChange}
                    required
                  />
                </div>

                {/* Imagen */}
                <div>
                  <label htmlFor="imagen" className="form-label fw-semibold">
                    Imagen del producto
                  </label>

                  {/* Dropzone estético */}
                  <label
                    htmlFor="imagen"
                    className="w-100 d-block rounded-3 p-4 text-center bg-light border"
                    style={{ borderStyle: "dashed", cursor: "pointer" }}
                  >
                    <i className="bi bi-cloud-arrow-up fs-2 d-block mb-2" />
                    <span className="d-block fw-semibold">Arrastra una imagen aquí</span>
                    <small className="text-muted">o haz clic para seleccionar un archivo</small>
                  </label>

                  <input
                    type="file"
                    id="imagen"
                    className="form-control neon-input mt-3"
                    accept="image/*"
                    onChange={onFileChange}
                  />

                  {/* Vista previa */}
                  {previewUrl && (
                    <div className="mt-3">
                      <img
                        src={previewUrl}
                        alt="Vista previa"
                        className="img-fluid rounded border"
                        style={{ maxHeight: 220, objectFit: "contain" }}
                      />
                    </div>
                  )}
                </div>

                {/* (Opcional) Vista rápida de tallas que se aplicarán */}
                <TallasPreview tallas={tallasPreview} categoria={form.categoria} />

                {/* Botón */}
                <div className="text-center mt-2">
                  <button type="submit" className="btn btn-danger px-4 neon-btn">
                    Agregar producto
                  </button>
                </div>

                {msg && <div className="alert alert-success mt-2 mb-0">{msg}</div>}
              </form>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

/** Render de vista previa de tallas (mixto: objetos para zapatillas, strings para ropa/accesorios) */
function TallasPreview({ tallas, categoria }) {
  if (!tallas || !tallas.length) return null;

  if (categoria === "zapatillas") {
    return (
      <div className="mt-2">
        <div className="small text-muted mb-1">Tallas a aplicar (US/UK/EU/CM):</div>
        <div className="table-responsive">
          <table className="table table-sm mb-0">
            <thead>
              <tr>
                <th>US</th>
                <th>UK</th>
                <th>EU</th>
                <th>CM</th>
              </tr>
            </thead>
            <tbody>
              {tallas.map((t, i) => (
                <tr key={i}>
                  <td>{t.us}</td>
                  <td>{t.uk}</td>
                  <td>{t.eu}</td>
                  <td>{t.cm}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  // ropa / accesorios = strings
  return (
    <div className="mt-2">
      <div className="small text-muted mb-1">Tallas a aplicar:</div>
      <div className="d-flex flex-wrap gap-2">
        {tallas.map((t) => (
          <span key={t} className="badge text-bg-light border">
            {t}
          </span>
        ))}
      </div>
    </div>
  );
}
