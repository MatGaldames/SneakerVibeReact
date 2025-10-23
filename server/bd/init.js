const fs = require("fs");
const path = require("path");
const db = require("./connection");

// Nota: en el repositorio el archivo se llama 'shema.sql'
const schemaPath = path.join(__dirname, "shema.sql");
const schema = fs.readFileSync(schemaPath, "utf8");

db.exec(schema, (err) => {
  if (err) console.error("❌ Error ejecutando schema:", err.message);
  else console.log("✅ Tablas creadas/listas");
});
