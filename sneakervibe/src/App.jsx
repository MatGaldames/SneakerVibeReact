import React from "react";
import Home from "./Home";
import Navbar from "./Navbar";
import Footer from "./Footer";

function App() {
  return (
    <div className="min-vh-100 d-flex flex-column">
      <Navbar />
      <Home />
      <Footer />
    </div>
  );
}

export default App;
