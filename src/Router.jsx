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
import Carrito from "./pages/Carrito";
import AgregarProductos from "./pages/agregarProducto";
import HomeAdmin from "./pages/homeAdmin";
import Envio from "./pages/Envio";
import Ofertas from "./pages/Ofertas"


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
          <Route path="carrito" element={<Carrito />} />
          <Route path="blog" element={<Blog />} />
          <Route path="agregarProducto" element={<AgregarProductos />} />
          <Route path="admin" element={<HomeAdmin />} />
          <Route path="envio" element={<Envio />} />
          <Route path="oferta" element={<Ofertas />}/>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}