const fs = require("fs");
const path = require("path");
const db = require("./connection");

const seedPath = path.join(__dirname, "seed.sql");
const seed = fs.readFileSync(seedPath, "utf8");

db.exec(seed, (err) => {
  if (err) {
    console.error("Error ejecutando seed:", err.message);
    process.exitCode = 1;
  } else {
    console.log("Datos de ejemplo insertados");
  }
});

