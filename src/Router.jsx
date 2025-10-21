import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import Home from "./Home";
import Login from "./Login";
import Registro from "./Registro";
import ProductDetail from "./ProductDetail";
import CategoriaDetalle from "./CategoriaDetalle";

// (estas páginas las iremos creando después)
import Productos from "./Productos";
import Contacto from "./Contacto";
import Blog from "./Blog";

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Layout general con Navbar + Footer */}
        <Route path="/" element={<App />}>
          {/* Rutas internas renderizadas dentro del <App /> */}
          <Route index element={<Home />} />
          <Route path="productos" element={<Productos />} />
          <Route path="/login" element={<Login />} />
          <Route path="/registro" element={<Registro />} />
          <Route path="contacto" element={<Contacto />} />
          <Route path="/product" element={<ProductDetail />} />
          <Route path="/categoria" element={<CategoriaDetalle />} />
          <Route path="blog" element={<Blog />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
