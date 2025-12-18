// src/paginas/AgregarProductos.jsx
import React, { useState, useMemo } from "react";
import { addLocalProduct } from "../services/localProducts";
import { CATEGORY_SIZES } from "../utilidades/productFactory";
import DashboardSidebar from "../componentes/Dashboard";

function fileToDataUrl(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => resolve(e.target.result);
    reader.onerror = (e) => reject(e);
    reader.readAsDataURL(file);
  });
}

export default function AgregarProductos({ bgUrl = "/assets/img/auth-bg.jpg" }) {
  const [form, setForm] = useState({
    titulo: "",
    descripcion: "",
    precio: "",
    categoria: "zapatillas",
    imagen: null, // Objeto File
  });
  const [msg, setMsg] = useState("");
  const [error, setError] = useState("");
  const [previewUrl, setPreviewUrl] = useState(null);
  const [loading, setLoading] = useState(false);

  const onChange = (e) => {
    const { id, value } = e.target;
    setForm((prev) => ({ ...prev, [id]: value }));
  };

  const onFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) {
      setForm((prev) => ({ ...prev, imagen: null }));
      setPreviewUrl(null);
      return;
    }
    setForm((prev) => ({ ...prev, imagen: file }));
    setPreviewUrl(URL.createObjectURL(file));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setMsg("");
    setError("");
    setLoading(true);

    try {
      // 1. Procesar imagen (DataURL para local)
      let imgSrc = "/assets/img/placeholder-product.png";
      if (form.imagen) {
        try {
          if (form.imagen instanceof File) {
            imgSrc = await fileToDataUrl(form.imagen);
          }
        } catch (err) {
          console.error("Error leyendo archivo", err);
        }
      }

      // 2. Construir objeto local
      const idLocal = "local-" + Date.now();
      const productoLocal = {
        id: idLocal,
        nombre: form.titulo,
        descripcion: form.descripcion,
        marca: "SneakerVibe",
        categoria: { nombreCategoria: form.categoria },
        variantes: [
          {
            id: "local-var-" + Date.now(),
            color: "default",
            talla: "38", // Valor por defecto
            precio: Number(form.precio),
            stock: 10,
            imgSrc: imgSrc,
            href: "#",
            altText: form.titulo,
            precioOferta: null,
          },
        ],
        __local: true,
      };

      // 3. Guardar localmente
      addLocalProduct(productoLocal);

      setMsg(`Producto "${form.titulo}" agregado exitosamente.`);
      setForm({
        titulo: "",
        descripcion: "",
        precio: "",
        categoria: form.categoria,
        imagen: null,
      });
      setPreviewUrl(null);
    } catch (err) {
      console.error(err);
      setError("Ocurrió un error inesperado.");
    } finally {
      setLoading(false);
    }
  };

  // Vista previa de tallas según categoría
  const tallasPreview = useMemo(() => CATEGORY_SIZES[form.categoria] || [], [form.categoria]);

  return (
    <main className="min-vh-100 bg-light d-flex flex-column flex-md-row">
       <DashboardSidebar active="agregarProducto" />
       
       <section className="flex-grow-1 p-4" style={{
          backgroundImage: `url('${bgUrl}')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
       }}>
      <div className="container">
        <div className="text-center mb-5 bg-white bg-opacity-75 p-3 rounded">
          <h2 className="fw-bold text-dark neon-text">Agregar producto</h2>
          <p className="text-muted mb-0">
            Completa los campos para agregar un nuevo producto a la Base de Datos
          </p>
        </div>

        <div className="row justify-content-center">
          <div className="col-12 col-md-8 col-lg-6">
            <div className="card neon-card p-4 shadow-lg border-0 rounded-3">
              {msg && <div className="alert alert-success">{msg}</div>}
              {error && <div className="alert alert-danger">{error}</div>}
              
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
                  <button type="submit" className="btn btn-danger px-4 neon-btn" disabled={loading}>
                    {loading ? "Guardando..." : "Agregar producto"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
       </section>
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
