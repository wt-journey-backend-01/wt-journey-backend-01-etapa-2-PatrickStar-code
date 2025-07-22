const express = require("express");
const router = express.Router();
const casosController = require("../controllers/casosController");

router.get("/casos", casosController.getAll);

router.get("/casos/:id", casosController.getById);

router.post("/casos", casosController.create);

router.put("/casos/:id", casosController.update);

router.delete("/casos/:id", casosController.deleteCaso);

router.patch("/casos/:id", casosController.partialUpdate);

router.get("/casos/:casos_id/agente", casosController.getAgente);

router.get("/casos/search", casosController.search);

module.exports = router;
