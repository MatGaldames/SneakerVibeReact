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
import AdminProductos from "./pages/ProductosAdmin";
import AdminUsuarios from "./pages/AdminUsuarios";
import BoletasPage from "./pages/BoletaAdmin";
import AdminBoletaView from "./pages/BoletaVista";
import Boleta from "./pages/Boleta";
import Noticia1 from "./pages/Noticia1";
import Noticia2 from "./pages/Noticia2";


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
          <Route path="/admin/agregarProducto" element={<AgregarProductos />} />
          <Route path="admin/dashboard" element={<HomeAdmin />} />
          <Route path="admin/productos" element={<AdminProductos />} />
          <Route path="admin/usuarios" element={<AdminUsuarios />} />
          <Route path="envio" element={<Envio />} />
          <Route path="ofertas" element={<Ofertas />} />
          <Route path="admin/ordenes" element={<BoletasPage />} />
          <Route path="/admin/boletas/:id" element={<AdminBoletaView />} />
          <Route path="boleta" element={<Boleta />} />
          <Route path="blog/noticia1" element={<Noticia1 />} />
          <Route path="blog/noticia2" element={<Noticia2 />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}