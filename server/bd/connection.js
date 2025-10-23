const path = require("path");
const sqlite3 = require("sqlite3").verbose();

// Archivo de base de datos SQLite (se creará si no existe)
const dbFile = path.join(__dirname, "data.sqlite");

const db = new sqlite3.Database(dbFile, (err) => {
  if (err) {
    console.error("Error al conectar a SQLite:", err.message);
  } else {
    console.log("SQLite conectado:", dbFile);
  }
});

module.exports = db;

