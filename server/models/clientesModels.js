const db = require("../bd/connection");

exports.getAll = (cb) => {
  db.all(
    "SELECT id_cliente, nombre, rut, correo, created_at FROM clientes",
    [],
    (err, rows) => cb(err, rows)
  );
};

exports.getById = (id, cb) => {
  db.get(
    "SELECT id_cliente, nombre, rut, correo, created_at FROM clientes WHERE id_cliente = ?",
    [id],
    (err, row) => cb(err, row)
  );
};

exports.create = ({ nombre, rut, correo, password_hash }, cb) => {
  const sql =
    "INSERT INTO clientes (nombre, rut, correo, password_hash) VALUES (?, ?, ?, ?)";
  db.run(sql, [nombre, rut, correo, password_hash], function (err) {
    if (err) return cb(err);
    cb(null, { id_cliente: this.lastID, nombre, rut, correo });
  });
};
