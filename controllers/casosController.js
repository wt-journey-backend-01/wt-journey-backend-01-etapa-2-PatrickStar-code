const express = require("express");
const { validate: isUuid } = require("uuid");
const { v4: uuidv4 } = require("uuid");
const casosRepository = require("../repositories/casosRepository");
const agentesRepository = require("../repositories/agentesRepository");

const enumStatus = ["aberto", "solucionado"];

function validateId(id) {
  if (!id || !isUuid(id)) {
    return res.status(400).json({ message: "Parâmetros inválidos" });
  }
}

function getAll(req, res, next) {
  const { agente_id, casos } = req.query;

  try {
    const casosResult = casosRepository.getAll({ agente_id, casos });
    return res.status(200).json(casosResult);
  } catch (error) {
    next(error);
  }
}

function search(req, res, next) {
  try {
    const resultado = casosRepository.search(req.query.query);
    res.status(200).json(resultado);
  } catch (error) {
    next(error);
  }
}

function getAgente(req, res, next) {
  try {
    const id = req.params.casos_id;
    const agente = casosRepository.getAgente(id);
    if (!agente) {
      return res.status(404).json({ message: "Caso ou agente inexistente" });
    }
    return res.status(200).json(agente);
  } catch (error) {
    next(error);
  }
}

function getById(req, res, next) {
  try {
    const id = req.params.id;

    validateId(id);

    const caso = casosRepository.findById(id);

    if (!caso) {
      return res.status(404).json({ message: "Caso inexistente" });
    }
    return res.status(200).json(caso);
  } catch (error) {
    next(error);
  }
}

function create(req, res, next) {
  try {
    if (!req.body) {
      return res.status(400).json({ message: "Parâmetros inválidos" });
    }
    const { titulo, descricao, status, agente_id } = req.body;

    if (!titulo || !descricao || !status || !agente_id) {
      return res.status(400).json({ message: "Parâmetros inválidos" });
    }

    if (!enumStatus.includes(status)) {
      return res
        .status(400)
        .json({ message: "Status inválido deve ser aberto ou solucionado" });
    }

    if (!agentesRepository.findById(agente_id)) {
      return res.status(404).json({ message: "Agente inexistente" });
    }

    const casosData = {
      id: uuidv4(),
      titulo,
      descricao,
      status,
      agente_id,
    };

    const caso = casosRepository.create(casosData);

    return res.status(201).json(caso);
  } catch (error) {
    next(error);
  }
}

function update(req, res, next) {
  try {
    if (!req.body) {
      return res.status(400).json({ message: "Parâmetros inválidos" });
    }

    validateId(req.params.id);

    if (!casosRepository.findById(req.params.id)) {
      return res.status(404).json({ message: "Caso inexistente" });
    }

    const { titulo, descricao, status, agente_id } = req.body;

    if (!titulo || !descricao || !status || !agente_id) {
      return res.status(400).json({ message: "Parâmetros inválidos" });
    }

    if (!enumStatus.includes(status)) {
      return res
        .status(400)
        .json({ message: "Status inválido deve ser aberto ou solucionado" });
    }

    if (!agentesRepository.findById(agente_id)) {
      return res.status(404).json({ message: "Agente inexistente" });
    }

    const newData = {
      titulo,
      descricao,
      status,
      agente_id,
    };

    const caso = casosRepository.update(req.params.id, newData);
    return res.status(200).json(caso);
  } catch (error) {
    next(error);
  }
}

function deleteCaso(req, res, next) {
  try {
    validateId(req.params.id);
    if (!casosRepository.findById(req.params.id)) {
      return res.status(404).json({ message: "Caso inexistente" });
    }
    casosRepository.deleteCaso(req.params.id);
    return res.status(204).send();
  } catch (error) {
    next(error);
  }
}

function partialUpdate(req, res, next) {
  try {
    const { id } = req.params;

    validateId(id);

    if (!casosRepository.findById(id)) {
      return res.status(404).json({ message: "Caso inexistente" });
    }

    const updates = req.body;

    if (!updates || Object.keys(updates).length === 0) {
      return res.status(400).json({ message: "Nenhum dado para atualizar" });
    }

    if (updates.agente_id && !agentesRepository.findById(updates.agente_id)) {
      return res.status(404).json({ message: "Agente inexistente" });
    }

    if (updates.status && !enumStatus.includes(updates.status)) {
      return res
        .status(400)
        .json({ message: "Status inválido deve ser aberto ou solucionado" });
    }

    const caso = casosRepository.partialUpdate(id, updates);
    return res.status(200).json(caso);
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getAll,
  getById,
  create,
  update,
  deleteCaso,
  partialUpdate,
  getAgente,
  search,
};
