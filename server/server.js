const express = require("express");
const cors = require("cors");
const clientesRoutes = require("./routes/clientesRoutes");

const app = express();

app.use(cors());
app.use(express.json());

// Rutas
app.use("/api/clientes", clientesRoutes);

// Salúd
app.get("/api/health", (req, res) => res.json({ ok: true }));

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`API escuchando en puerto ${PORT}`));

module.exports = app;
