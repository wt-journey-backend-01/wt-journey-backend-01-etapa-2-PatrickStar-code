const express = require("express");
const { validate: isUuid } = require("uuid");
const { v4: uuidv4 } = require("uuid");
const casosRepository = require("../repositories/casosRepository");
const agentesRepository = require("../repositories/agentesRepository");
const z = require("zod");
const errorHandler = require("../utils/errorHandler");

const enumStatus = ["aberto", "solucionado"];

const QueryParamsSchema = z.object({
  agente_id: z.uuid().optional(),
  status: z
    .enum(["aberto", "solucionado"], {
      required_error: "Status é obrigatório.",
    })
    .optional(),
});

const searchQuerySchema = z.object({
  q: z.string(),
});

const CasoSchema = z.object({
  titulo: z
    .string({ required_error: "Titulo é obrigatório." })
    .min(1, "O campo 'titulo' é obrigatório."),
  descricao: z
    .string({ required_error: "Descrição é obrigatório." })
    .min(1, "O campo 'descricao' é obrigatório."),
  status: z.enum(enumStatus, { required_error: "Status é obrigatório." }),
  agente_id: z
    .uuid({ required_error: "Agente é obrigatório." })
    .min(1, "O campo 'agente_id' é obrigatório."),
});

const CasoPartial = CasoSchema.partial();

function getAll(req, res, next) {
  const parsed = QueryParamsSchema.safeParse(req.query);
  if (!parsed.success) {
    return res.status(400).json({ message: parsed.error.issues[0].message });
  }
  try {
    const { agente_id, status } = parsed.data;

    const casosResult = casosRepository.getAll({ agente_id, status });
    return res.status(200).send(casosResult);
  } catch (error) {
    next(error);
  }
}

function search(req, res, next) {
  try {
    const parsed = searchQuerySchema.safeParse(req.query);
    if (!parsed.success) {
      return res.status(400).json({ message: parsed.error.issues[0].message });
    }

    const { q } = parsed.data;
    const resultado = casosRepository.search(q);
    if (resultado === null) {
      return res.status(200).send([]);
    }
    res.status(200).json(resultado);
  } catch (error) {
    next(error);
  }
}

function create(req, res, next) {
  try {
    const parsed = CasoSchema.safeParse(req.body);

    if (!parsed.success) {
      return res.status(404).json({ message: parsed.error.issues[0].message });
    }

    if (agentesRepository.findById(req.body.agente_id) === undefined) {
      return res.status(404).json({ message: "Agente inexistente" });
    }

    const NewCaso = { id: uuidv4(), ...req.body };
    const caso = casosRepository.create(NewCaso);
    return res.status(201).json(caso);
  } catch (error) {
    next(error);
  }
}

function getById(req, res, next) {
  try {
    const id = req.params.id;

    if (!isUuid(id)) {
      return res
        .status(404)
        .json({ message: "ID inválido. Use um UUID válido." });
    }

    const caso = casosRepository.findById(id);

    if (!caso) {
      return res.status(404).json({ message: "Caso inexistente" });
    }
    return res.status(200).json(caso);
  } catch (error) {
    next(error);
  }
}

function update(req, res, next) {
  try {
    const { id } = req.params;

    if (!isUuid(id)) {
      return res
        .status(404)
        .json({ message: "ID inválido. Use um UUID válido." });
    }

    const parsed = CasoSchema.safeParse(req.body);

    if (!parsed.success) {
      return res.status(400).json({ message: parsed.error.issues[0].message });
    }

    if ("id" in req.body) {
      return res
        .status(400)
        .json({ message: "O campo 'id' nao pode ser alterado." });
    }
    const { id: _, ...dadosSemId } = req.body;
    const caso = casosRepository.update(id, dadosSemId);
    if (!caso) {
      return res.status(404).json({ message: "Caso inexistente" });
    }

    if (agentesRepository.findById(req.body.agente_id) === undefined) {
      return res.status(404).json({ message: "Agente inexistente" });
    }

    return res.status(200).json(caso);
  } catch (error) {
    next(error);
  }
}

function deleteCaso(req, res, next) {
  try {
    const { id } = req.params;
    if (!isUuid(id)) {
      return res
        .status(404)
        .json({ message: "ID inválido. Use um UUID válido." });
    }

    if (casosRepository.findById(id) === undefined) {
      return res.status(404).json({ message: "Caso inexistente" });
    }

    const caso = casosRepository.deleteCaso(id);
    if (!caso) {
      return res.status(404).json({ message: "Caso inexistente" });
    }
    return res.status(204).send();
  } catch (error) {
    next(error);
  }
}

function patch(req, res, next) {
  try {
    const { id } = req.params;
    if (!isUuid(id)) {
      return res
        .status(404)
        .json({ message: "ID inválido. Use um UUID válido." });
    }

    const parsed = CasoPartial.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ message: parsed.error.issues[0].message });
    }

    if (
      req.body.agente_id &&
      agentesRepository.findById(req.body.agente_id) === undefined
    ) {
      return res.status(404).json({ message: "Agente inexistente" });
    }

    if (casosRepository.findById(id) === undefined) {
      return res.status(404).json({ message: "Caso inexistente" });
    }

    if ("id" in req.body) {
      return res
        .status(400)
        .json({ message: "O campo 'id' nao pode ser alterado." });
    }

    const { id: _, ...dadosSemId } = req.body;
    const caso = casosRepository.patch(id, dadosSemId);
    if (!caso) {
      return res.status(404).json({ message: "Caso inexistente" });
    }
    return res.status(200).json(caso);
  } catch (error) {
    next(error);
  }
}

function getAgente(req, res, next) {
  try {
    const { casos_id } = req.params;

    if (!isUuid(casos_id)) {
      return res.status(404).json({ message: "Parâmetros inválidos" });
    }

    const caso = casosRepository.findById(casos_id);
    if (!caso) {
      return res.status(404).json({ message: "Caso inexistente" });
    }

    const agente = agentesRepository.findById(caso.agente_id);
    if (!agente) {
      return res.status(404).json({ message: "Agente inexistente" });
    }
    return res.status(200).json(agente);
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getAll,
  search,
  create,
  getById,
  update,
  deleteCaso,
  patch,
  getAgente,
};
