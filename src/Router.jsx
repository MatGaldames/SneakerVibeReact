import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Registro from "./pages/Registro";
import ProductDetail from "./pages/ProductDetail";
import CategoriaDetalle from "./pages/CategoriaDetalle";
import Productos from "./pages/Productos";
import Contacto from "./pages/Contacto";
import Blog from "./pages/Blog";

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<Home />} />
          <Route path="productos" element={<Productos />} />
          <Route path="login" element={<Login />} />
          <Route path="registro" element={<Registro />} />
          <Route path="contacto" element={<Contacto />} />
          <Route path="product" element={<ProductDetail />} />
          <Route path="categoria" element={<CategoriaDetalle />} />
          <Route path="blog" element={<Blog />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

