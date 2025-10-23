const express = require("express");
const router = express.Router();
const ctrl = require("../controller/clientesController");

router.get("/", ctrl.listar);
router.get("/:id", ctrl.obtener);
router.post("/", ctrl.crear);

module.exports = router;
