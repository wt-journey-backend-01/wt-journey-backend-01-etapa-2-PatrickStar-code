const express = require("express");
const router = express.Router();
const agentesController = require("../controllers/agentesController");

// define a rota para /agentes usando o método GET
router.get("/agentes", agentesController.findAll);

router.get("/agentes/:id", agentesController.findById);

router.post("/agentes", agentesController.createAgente);

router.delete("/agentes/:id", agentesController.deleteAgente);

router.put("/agentes/:id", agentesController.updateAgente);

router.patch("/agentes/:id", agentesController.patchAgentes);

module.exports = router;
