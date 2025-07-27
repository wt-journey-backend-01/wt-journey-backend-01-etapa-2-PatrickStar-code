const { z } = require("zod");
const express = require("express");
const { v4: uuidv4 } = require("uuid");
const agentesRepository = require("../repositories/agentesRepository");
const { validate: isUuid } = require("uuid");
const errorHandler = require("../utils/errorHandler");

const AgenteSchema = z.object({
  nome: z.string({ required_error: "O campo 'nome' é obrigatório." }),

  dataDeIncorporacao: z
    .string({ required_error: "O campo 'dataDeIncorporacao' é obrigatório." })
    .regex(/^\d{4}-\d{2}-\d{2}$/, {
      message: "O campo 'dataDeIncorporacao' deve ser no formato 'YYYY-MM-DD'.",
    }),

  cargo: z.enum(["inspetor", "delegado", "agente"], {
    required_error: "O campo 'cargo' é obrigatório.",
    invalid_type_error:
      "O campo 'cargo' deve ser 'inspetor', 'delegado' ou 'agente'.",
  }),
});

const AgentePartial = AgenteSchema.partial();

const querySchema = z.object({
  cargo: z
    .enum(["inspetor", "delegado", "agente"], {
      invalid_type_error:
        "O campo 'cargo' deve ser 'inspetor', 'delegado' ou 'agente'.",
    })
    .optional(),
  sort: z
    .enum(["dataDeIncorporacao", "-dataDeIncorporacao"], {
      invalid_type_error:
        "O campo 'sort' deve ser 'dataDeIncorporacao' ou '-dataDeIncorporacao'.",
    })
    .optional(),
});

function findAll(req, res, next) {
  try {
    const parsed = querySchema.safeParse(req.query);
    if (!parsed.success) {
      return res.status(400).json({ message: parsed.error.errors[0].message });
    }

    const { cargo, sort } = parsed.data;

    const agentes = agentesRepository.findAll({
      cargo,
      sort,
    });
    return res.status(200).json(agentes);
  } catch (error) {
    next(error);
  }
}

function findById(req, res, next) {
  try {
    const id = req.params.id;
    if (!isUuid(id)) {
      return res
        .status(400)
        .json({ message: "ID inválido. Use um UUID válido." });
    }
    const agente = agentesRepository.findById(id);
    if (!agente) {
      return res.status(404).json({ message: "Agente inexistente" });
    }
    return res.status(200).json(agente);
  } catch (error) {
    next(error);
  }
}

function create(req, res, next) {
  try {
    const parsed = AgenteSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ message: parsed.error.errors[0].message });
    }

    const NewAgente = { id: uuidv4(), ...req.body };

    const agente = agentesRepository.create(NewAgente);
    return res.status(201).json(agente);
  } catch (error) {
    next(error);
  }
}

function deleteAgente(req, res, next) {
  try {
    const { id } = req.params;
    if (!isUuid(id)) {
      return res
        .status(400)
        .json({ message: "ID inválido. Use um UUID válido." });
    }
    const agente = agentesRepository.findById(id);
    if (!agente) {
      return res.status(404).json({ message: "Agente inexistente" });
    }
    agentesRepository.deleteAgente(id);
    return res.status(204).send();
  } catch (error) {
    next(error);
  }
}

function updateAgente(req, res, next) {
  try {
    const { id } = req.params;
    if (!isUuid(id)) {
      return res
        .status(400)
        .json({ message: "ID inválido. Use um UUID válido." });
    }
    const agente = agentesRepository.findById(id);
    if (!agente) {
      return res.status(404).json({ message: "Agente inexistente" });
    }
    const parsed = AgenteSchema.safeParse(req.body);
    if (!parsed.success) {
      console.log("deu ruim");
      return res.status(400).json({ message: parsed.error.errors[0].message });
    }
    const agenteUpdated = agentesRepository.updateAgente(id, req.body);
    if (agenteUpdated === null) {
      return res
        .status(404)
        .json({ message: "Agente não atualizado/não encontrado" });
    }

    return res.status(200).json(agenteUpdated);
  } catch (error) {
    next(error);
  }
}

function patch(req, res, next) {
  try {
    const { id } = req.params;
    if (!isUuid(id)) {
      return res
        .status(400)
        .json({ message: "ID inválido. Use um UUID válido." });
    }
    const agente = agentesRepository.findById(id);
    if (!agente) {
      return res.status(404).json({ message: "Agente inexistente" });
    }
    const parsed = AgentePartial.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ message: parsed.error.errors[0].message });
    }
    const agenteUpdated = agentesRepository.patch(id, req.body);
    if (agenteUpdated === null) {
      return res
        .status(404)
        .json({ message: "Agente não atualizado/não encontrado" });
    }

    return res.status(200).json(agenteUpdated);
  } catch (error) {
    next(error);
  }
}

module.exports = {
  findAll,
  findById,
  create,
  deleteAgente,
  updateAgente,
  patch,
};
