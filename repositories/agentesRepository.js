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

  if (dataDeIncorporacao) {
    result = result.filter(
      (agente) => agente.dataDeIncorporacao === dataDeIncorporacao
    );
  }

  if (sort) {
    result.sort((a, b) => {
      if (sort === "asc")
        return a.dataDeIncorporacao.localeCompare(b.dataDeIncorporacao);
      if (sort === "desc")
        return b.dataDeIncorporacao.localeCompare(a.dataDeIncorporacao);
      return 0;
    });
  }

  return result;
}

function findById(id) {
  return agentes.find((agente) => agente.id === id);
}

function create(agente) {
  agentes.push(agente);
  return agente;
}

function deleteAgente(id) {
  const index = agentes.findIndex((agente) => agente.id === id);
  agentes.splice(index, 1);
}

function updateAgente(id, agente) {
  const index = agentes.findIndex((agente) => agente.id === id);
  agente.id = id;
  agentes[index] = agente;
}

function patchAgentes(id, agente) {
  const index = agentes.findIndex((agente) => agente.id === id);
  agentes[index] = { ...agentes[index], ...agente };
}

module.exports = {
  findAll,
  findById,
  create,
  deleteAgente,
  updateAgente,
  patchAgentes,
};
