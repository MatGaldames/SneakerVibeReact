const Clientes = require("../models/clientesModels");

exports.listar = (req, res) => {
  Clientes.getAll((err, rows) =>
    err ? res.status(500).json({ error: err.message }) : res.json(rows)
  );
};

exports.obtener = (req, res) => {
  Clientes.getById(Number(req.params.id), (err, row) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!row) return res.status(404).json({ error: "Cliente no encontrado" });
    res.json(row);
  });
};

exports.crear = (req, res) => {
  const { nombre, rut, correo, password } = req.body;
  if (!nombre || !correo || !password)
    return res.status(400).json({ error: "Faltan campos" });

  // demo: sin hash real. Luego usamos bcrypt.hash(password, 10)
  const password_hash = password;
  Clientes.create({ nombre, rut, correo, password_hash }, (err, cli) =>
    err
      ? res.status(500).json({ error: err.message })
      : res.status(201).json(cli)
  );
};
