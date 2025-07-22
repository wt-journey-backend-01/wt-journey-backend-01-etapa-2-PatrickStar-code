const express = require("express");
const { v4: uuidv4 } = require("uuid");
const agentesRepository = require("../repository/agentesRepository");

const cargosValidos = ["inspetor", "delegado", "subdelegado"];

function findAll(req, res) {
  const { cargo, sort } = req.query;

  try {
    const agentes = agentesRepository.findAll({ cargo, sort });
    res.status(200).json(agentes);
  } catch (error) {
    res.status(500).json({ message: "Erro ao buscar agentes", error });
  }
}

function findById(req, res, next) {
  try {
    const id = req.params.id;
    if (id === null) {
      res.status(400).json({ message: "Parâmetros inválidos" });
    } else {
      const agente = agentesRepository.findById(id);
      if (!agente) {
        res.status(404).json({ message: "Agente inexistente" });
      }
      res.status(200).json(agente);
    }
  } catch (err) {
    next(err);
  }
}

function deleteAgente(req, res, next) {
  try {
    const id = req.params.id;
    if (id === null) {
      res.status(400).json({ message: "Parâmetros inválidos" });
    } else {
      if (!agentesRepository.findById(id)) {
        res.status(404).json({ message: "Agente inexistente" });
      }
      agentesRepository.deleteAgente(id);
      res.status(204).json();
    }
  } catch (err) {
    next(err);
  }
}

function createAgente(req, res, next) {
  try {
    if (!req.body) {
      res.status(400).json({ message: "Parâmetros inválidos" });
    }
    const { nome, dataDeIncorporacao, cargo } = req.body;
    if (!dataDeIncorporacao === RegExp(/^\d{4}-\d{2}-\d{2}$/)) {
      res.status(400).json({
        message:
          "Campo dataDeIncorporacao deve seguir a formatação 'YYYY-MM-DD' ",
      });
    }
    if (!cargosValidos.includes(cargo)) {
      res.status(400).json({
        message:
          "O campo cargo pode ser somente 'inspetor', 'delegado' ou 'subdelegado' ",
      });
    }
    if (nome === null || dataDeIncorporacao === null || cargo === null) {
      res.status(400).json({ message: "Parâmetros inválidos" });
    } else {
      const agente = agentesRepository.create({
        id: uuidv4(),
        nome,
        dataDeIncorporacao,
        cargo,
      });

      res.status(201).json(agente);
    }
  } catch (err) {
    next(err);
  }
}

function patchAgentes(req, res, next) {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ message: "Parâmetros inválidos" });
    }

    const findingAgente = agentesRepository.findById(id);
    if (!findingAgente) {
      return res.status(404).json({ message: "Agente inexistente" });
    }

    const updates = req.body;

    if (!updates || Object.keys(updates).length === 0) {
      return res.status(400).json({ message: "Nenhum dado para atualizar" });
    }

    const cargosValidos = ["inspetor", "delegado", "subdelegado"];

    if (
      updates.dataDeIncorporacao &&
      !/^\d{4}-\d{2}-\d{2}$/.test(updates.dataDeIncorporacao)
    ) {
      return res.status(400).json({
        message:
          "Campo dataDeIncorporacao deve seguir a formatação 'YYYY-MM-DD'",
      });
    }

    if (updates.cargo && !cargosValidos.includes(updates.cargo)) {
      return res.status(400).json({
        message:
          "O campo cargo pode ser somente 'inspetor', 'delegado' ou 'subdelegado'",
      });
    }

    agentesRepository.patchAgentes(id, updates);
    return res.status(204).send();
  } catch (error) {
    next(error);
  }
}

function updateAgente(req, res, next) {
  try {
    if (!req.body) {
      res.status(400).json({ message: "Parâmetros inválidos" });
    }
    const id = req.params.id;
    const { nome, dataDeIncorporacao, cargo } = req.body;
    if (!agentesRepository.findById(id)) {
      res.status(404).json({ message: "Agente inexistente" });
    }
    if (!dataDeIncorporacao === RegExp(/^\d{4}-\d{2}-\d{2}$/)) {
      res.status(400).json({
        message:
          "Campo dataDeIncorporacao deve seguir a formatação 'YYYY-MM-DD' ",
      });
    }
    if (!cargosValidos.includes(cargo)) {
      res.status(400).json({
        message:
          "O campo cargo pode ser somente 'inspetor', 'delegado' ou 'subdelegado' ",
      });
    }
    if (nome === null || dataDeIncorporacao === null || cargo === null) {
      res.status(400).json({ message: "Parâmetros inválidos" });
    } else {
      const agente = agentesRepository.updateAgente(id, {
        nome,
        dataDeIncorporacao,
        cargo,
      });

      res.status(200).json(agente);
    }
  } catch (err) {
    next(err);
  }
}

module.exports = {
  findAll,
  findById,
  deleteAgente,
  createAgente,
  updateAgente,
  patchAgentes,
};
