const express = require("express");
const router = express.Router();
const casosController = require("../controllers/casosController");

router.get("/casos", casosController.getAll);

router.get("/casos/search", casosController.search);

router.post("/casos", casosController.create);

router.get("/casos/:id", casosController.getById);

router.put("/casos/:id", casosController.update);

router.delete("/casos/:id", casosController.deleteCaso);

router.patch("/casos/:id", casosController.patch);

router.get("/casos/:casos_id/agente", casosController.getAgente);

module.exports = router;
