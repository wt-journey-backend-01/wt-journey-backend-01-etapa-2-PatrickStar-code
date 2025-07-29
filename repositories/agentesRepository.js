const { v4: uuidv4 } = require("uuid");
/*
id: string (UUID) obrigatório.
nome: string obrigatório.
dataDeIncorporacao: string , no formato YYYY-MM-DDobrigatória.
cargo: ("inspetor", "delegado", etc.) obrigatório.
*/

const agentes = [];

function findAll({ cargo, sort } = {}) {
  let result = [...agentes];

  if (cargo) {
    result = result.filter((agente) => agente.cargo === cargo);
  }

  if (sort) {
    result = result.sort((a, b) => {
      if (sort === "dataDeIncorporacao")
        return a.dataDeIncorporacao.localeCompare(b.dataDeIncorporacao);
      if (sort === "-dataDeIncorporacao")
        return b.dataDeIncorporacao.localeCompare(a.dataDeIncorporacao);
      return 0;
    });
  }

  return result;
}

function findById(id) {
  const findedAgente = agentes.find((agente) => agente.id === id);
  return findedAgente;
}

function create(agente) {
  agentes.push(agente);
  return agente;
}

function deleteAgente(id) {
  const index = agentes.findIndex((agente) => agente.id === id);
  if (index !== -1) {
    agentes.splice(index, 1);
    return true;
  }
  return false;
}

function updateAgente(id, agente) {
  const index = agentes.findIndex((agente) => agente.id === id);
  if (index !== -1) {
    agentes[index] = { ...agentes[index], ...agente };
    return agentes[index];
  }
  return null;
}

function patch(id, agente) {
  const index = agentes.findIndex((agente) => agente.id === id);
  if (index !== -1) {
    agentes[index] = { ...agentes[index], ...agente };
    return agentes[index];
  }
  return null;
}

module.exports = {
  findAll,
  findById,
  create,
  deleteAgente,
  updateAgente,
  patch,
};
